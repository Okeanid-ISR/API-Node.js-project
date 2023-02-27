import toysR from "./toys";
import usersR from "./users";

export const routesInit = (app) => {
  app.use('/toys', toysR)
  app.use('/users', usersR)
}
