export function notFound(req, _res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`)
  error.status = 404
  next(error)
}

export function errorHandler(error, _req, res, _next) {
  if (error?.code === 11000) {
    const fields = Object.keys(error.keyPattern || {}).join(', ')
    return res.status(409).json({ success: false, message: `Duplicate value for: ${fields}` })
  }
  if (error?.name === 'ValidationError') {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: Object.values(error.errors).map((item) => item.message)
    })
  }
  console.error(error)
  res.status(error.status || 500).json({
    success: false,
    message: error.status ? error.message : 'Internal server error'
  })
}
