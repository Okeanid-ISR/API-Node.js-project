import toysR from './toys.js'
import usersR from './users.js'
import docsRouter from "./docsRouter.js";

export const routesInit = (app) => {
  app.use('/toys', toysR)
  app.use('/users', usersR)
  if (process.env.NODE_ENV === 'dev') {
    app.use('/docs', docsRouter)
  }
}