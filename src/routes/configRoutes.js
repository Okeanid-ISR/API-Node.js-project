import toysR from './toys.js'
import usersR from './users.js'

export const routesInit = (app) => {
  app.use('/toys', toysR)
  app.use('/users', usersR)
}
