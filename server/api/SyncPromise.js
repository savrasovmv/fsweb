const { Async } = global

export default promise => {
  const { result, error } = Async.runSync(done =>
    Promise.resolve(promise).then(
      success => done(null, success),
      error => {
        done(error)
      }
    )
  )
  if (error) {
    throw error
  } else {
    return result
  }
}