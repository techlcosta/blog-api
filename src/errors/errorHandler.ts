export class ErrorHandler extends Error {
  public readonly message: string
  public readonly code: string
  public readonly statusCode: number

  constructor(
    message: string,
    statusCode = 400,
    code: 'expired' | 'unauthorized' | 'failed' = 'failed'
  ) {
    super()
    this.message = message
    this.code = code
    this.statusCode = statusCode
  }
}
