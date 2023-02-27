
import jwt from 'jsonwebtoken'
import {tokenSecret} from "../config/secret.js";

export const auth = (req, res, next) => {
  let token = req.header('x-api-key')
  if (!token) {
    return res.status(401).json({ err: 'You must send token to this endpoint ' })
  }
  try {
    let decodeToken = jwt.verify(token, tokenSecret)
    req.tokenData = decodeToken

    next()
  } catch (err) {
    res.status(401).json({ err: 'Token invalid or expired ' })
  }
}
