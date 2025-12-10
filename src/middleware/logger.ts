import {Request, Response, NextFunction} from 'express';

// logger middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log([new Date().toISOString()], req.path, req.method)
  next()
}

export default logger