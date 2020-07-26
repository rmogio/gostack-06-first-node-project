import {Router} from 'express'

import AuthenticationService from '../services/AuthenticationService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response)=> {
  const {email, password} = request.body

  const authenticateUser = new AuthenticationService()

  const {user, token} = await authenticateUser.execute({
    email,
    password
  })

  delete user.password

  return response.json({user, token})

})

export default sessionsRouter
