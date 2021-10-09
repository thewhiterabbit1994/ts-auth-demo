import { Request, Response, NextFunction } from 'express'

export type EController = (req: Request, res: Response, next: NextFunction) => any