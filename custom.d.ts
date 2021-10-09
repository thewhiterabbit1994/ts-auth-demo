
declare global {
  namespace Express {
    interface Request {
      ejsGlobal?: {
        domain: string  
      }
    }
  }
}