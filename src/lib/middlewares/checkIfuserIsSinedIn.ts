import decodeToken from '@src/lib/decode-token'

import checkUser from '@src/lib/security/checkUser'

const requireDashBoardAccess: EController = async (req, res, next) => {
  
  const token = req.cookies.uc

  try {

    const userDetails = await decodeToken(token);

    console.log('userDetails', userDetails)

    const user = await checkUser(userDetails)

    if (user && user._id) throw new Error('redirect to dashboard')

    next()

  } catch (error) {
    console.log(error)
    res.redirect('../../../../dashboard')
  }

}

export default requireDashBoardAccess;