
import dotenv from 'dotenv'

import jwt, { Algorithm, JwtPayload } from 'jsonwebtoken'

dotenv.config()

const decodeToken: (token: string) => JwtPayload = (token: string) => {
  try {
    const arr = token.split(' ');


    if (arr[0] && arr[1]) {
      const payload = jwt.verify(
        arr[1],
        process.env.JWT_SECRET!,
        // { algorithms: [process.env.JWT_ALGORITHM as Algorithm] }
      );
      if (typeof payload === 'string') throw new Error('wtf')
      
      return payload
    }
    
    throw new Error('BAD REQUEST: INVALID TOKEN')
  } catch (error) {
    throw error
  }
}

export default decodeToken;