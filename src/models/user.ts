import { Schema, model, Model } from 'mongoose'
import jwt, { Algorithm } from 'jsonwebtoken'

import generateNumericString from '@src/lib/generate-numeric-string'

import dotenv from 'dotenv'

dotenv.config()

interface IUser {
  name: string,
  phoneNumber: string,
  loginObject?: {
    code: string,
    date: string
  } | null,
  isActive: boolean,
  _clearLoginObject: () => void,
  _generatePassCode: () => string,
  _validatCode: (code: string) => boolean,
  _createToken: () => string
}

export interface UserModel extends Model<IUser> {
  _checkIfPhoneNumberExists(value: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser, UserModel>({
  name: String,
  phoneNumber: String,
  loginObject: {
    code: String,
    date: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
	timestamps: true
});

UserSchema.methods = {
  _generatePassCode(): string {
    return generateNumericString(4)
  },
  _validatCode(code: string): boolean {

    try {

      if (this.loginObject?.code !== code) {
        this._clearLoginObject()
        throw new Error('incorrect code')
      }
  
      if ((new Date().getTime() - new Date(this.loginObject.date).getTime()) > 200000) {
        this._clearLoginObject()
        throw new Error("time's up")
      }

      return true

    } catch (error) {
      throw error
    }
  },
  _clearLoginObject(): void {
    this.loginObject = null
    this.save()
  },
  _createToken(): string {
    return jwt.sign(
      {
        _id: this._id,
      },
      process.env.JWT_SECRET!,
      // {
      //   algorithm: process.env.JWT_ALGORITHM as Algorithm,
      //   //         1m   1h   1d  1w
      //   expiresIn: 60 * 60 * 24 * 7,

      // }
    )
  }
}

UserSchema.statics._checkIfPhoneNumberExists = async function (value: string): Promise<boolean> {

  const thisUser = await this.findOne({ phoneNumber: value })

  if (!thisUser) return false
  
  return true
};

export default model('User', UserSchema);