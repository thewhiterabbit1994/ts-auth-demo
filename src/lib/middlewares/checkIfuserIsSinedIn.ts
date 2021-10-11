import decodeToken from '@src/lib/decode-token'

import checkUser from '@src/lib/security/checkUser'

const requireDashBoardAccess: EController = async (req, res, next) => {
  
  const token = req.cookies.uc

  if (!token) next()

  try {

    const userDetails = await decodeToken(token);

    const user = await checkUser(userDetails)

    // if (!user || !user._id) throw new Error('go next')

    if (user && user._id) return res.redirect('../../../dashboard')

    next()

  } catch (error) {
    next()
  }

}

export default requireDashBoardAccess;