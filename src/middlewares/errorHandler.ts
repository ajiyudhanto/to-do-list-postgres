import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'

export default function errorHandler(
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
){
    let statusCode: number = 500
    let msg: string = 'internal server error'

    if (err.name === 'QueryFailedError') {
        statusCode = 400
        msg = 'all form input must be filled with correct data type'
    } else if (err.name === 'todo not found') {
        statusCode = 404
        msg = 'task todo with this id is not found'
    }

    res.status(statusCode).json({ msg })
}