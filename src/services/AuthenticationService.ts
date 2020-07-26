import {getRepository} from 'typeorm'
import {compare} from 'bcryptjs'
import {sign} from 'jsonwebtoken'

import authConfig from '../config/auth'
import AppError from '../errors/AppError'
import User from '../models/User'

interface Request{
  email: string,
  password: string
}

interface Response{
  user: User,
  token: string
}

class AuthenticationService{

  public async execute({email, password}: Request): Promise<Response> {
    const usersRespository = getRepository(User)

    const user = await usersRespository.findOne({where:{email}})
    if(!user){
      throw new AppError('This email/password is invalid', 401)
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
      throw new AppError('This email/password is invalid', 401)
    }

    const {secret, expiresIn} = authConfig.jwt

    const token  = sign({}, secret,{
      subject: user.id,
      expiresIn
    })

    return {
      user,
      token
    }

  }
}

export default AuthenticationService
