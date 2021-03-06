import decodeToken from '@src/lib/decode-token'

import checkUser from '@src/lib/security/checkUser'

const requireDashBoardAccess: EController = async (req, res, next) => {
  
  const token = req.cookies.uc

  try {

    const userDetails = await decodeToken(token);

    const user = await checkUser(userDetails)

    if (!user || !user._id) throw new Error('please first sign in')

    req.user = user

    next()

  } catch (error) {
    res.redirect('../../../../login')
  }

}

export default requireDashBoardAccess;