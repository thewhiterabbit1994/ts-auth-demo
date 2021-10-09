

import User from '@models/user'

import { JwtPayload } from 'jsonwebtoken'

const checkUser: (userDetails: JwtPayload) => any = async userDetails => {

  try {

    if (!userDetails || !userDetails._id) throw new Error('unathorized')
  
    const thisUser = await User.findById(userDetails._id)
  
    if (!thisUser || !thisUser._id || !thisUser.isActive) throw new Error('unathorized')
    
    return thisUser

  } catch (error) {
    throw new Error('unathorized')
  }

}

export default checkUser