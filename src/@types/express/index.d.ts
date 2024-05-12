declare namespace Express {
  export interface Request {
    user: {
      id: string
      role: 'public' | 'subscriber' | 'admin'
    }
  }
}
