export const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

export function httpError(message, status = 400) {
  const error = new Error(message)
  error.status = status
  return error
}
