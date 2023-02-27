import { config } from 'dotenv'

config()

export const mongoUser = process.env.DBUSER
export const mongoPass = process.env.DBPASS
export const tokenSecret = process.env.TOKENSECRET
