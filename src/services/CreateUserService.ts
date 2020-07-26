import {getRepository} from 'typeorm'
import {hash} from 'bcryptjs'

import User from '../models/User'

import AppError from '../errors/AppError'

interface Request{
  name: string,
  email: string,
  password: string
}

class CreateUserService{
  public async execute({ name, email, password}: Request): Promise<User> {
    const usersRepository = getRepository(User)

    const checkIfExists = await usersRepository.findOne({
      where: {email}
    })

    if(checkIfExists){
      throw new AppError('Email address already used. Try another one')
    }

    const hashPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: hashPassword
    })

    await usersRepository.save(user)

    delete user.password

    return user
  }
}

export default CreateUserService
