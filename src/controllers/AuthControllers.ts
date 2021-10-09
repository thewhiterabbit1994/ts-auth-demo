import { EController } from '@src/lib/types'

import User from '@models/user'

import validateAndGetStandardPhoneNumber from '@src/lib/validate-and-get-standard-phone-number'

const POST_signUp: EController = async (req, res, next) => {

  let validPhone: string;

  try {

    validPhone = validateAndGetStandardPhoneNumber(req.body.phoneNumber)

  } catch (error) {
    return res.status(522).send('bad inputs')
  }

  try {

    if (!req.body.userName) return res.status(522).send('bad inputs')

    const doesPhoneNumberAlreadyExist = await User._checkIfPhoneNumberExists(validPhone);

    if (doesPhoneNumberAlreadyExist) return res.status(522).send('phone number already exists in the database')

    await User.create({
      name: req.body.userName,
      phoneNumber: validPhone
    })

    res.redirect('../../../login')

  } catch (error) {
    next(error)
  }

}

const POST_loginAttempt: EController = async (req, res, next) => {


  let validPhone: string;

  try {

    validPhone = validateAndGetStandardPhoneNumber(req.body.phoneNumber)

  } catch (error) {
    return res.status(522).json({error: 'bad inputs'})
  }

  try {
    const thisUser = await User.findOne({ phoneNumber: validPhone })

    if (!thisUser) return res.status(522).send('no sucher user exists')

    const code = thisUser._generatePassCode()
    const date = new Date().toISOString()

    const loginObject = {
      code,
      date,
    }

    await User.findByIdAndUpdate(thisUser._id, { loginObject })

    res.status(200).send('ok')

  } catch (error) {
    
  }

}

const POST_LogIn: EController = async (req, res, next) => {

  console.log('post login')
  console.log(req.body)

  let validPhone: string;

  try {

    validPhone = validateAndGetStandardPhoneNumber(req.body.phoneNumber)

    console.log('valid phone', validPhone)

  } catch (error) {
    return res.status(522).send('bad inputs')
  }

  try {
    const thisUser = await User.findOne({ phoneNumber: validPhone })

    console.log('thisUser ', thisUser)

    if (!thisUser) return res.status(522).send('wrong phone number');
  
    thisUser._validatCode(req.body.code);
    
    const token = thisUser._createToken();

    thisUser._clearLoginObject();

    res.cookie('uc', `uc ${token}`, { maxAge: 60 * 60 * 24 * 7 * 4 * 12, httpOnly: true });

    return res.status(200).send('ok')
  
  } catch (error) {
    console.log(error)
    res.status(500).send('error')    
  }

}


export default {
  POST_signUp,
  POST_loginAttempt,
  POST_LogIn,
}