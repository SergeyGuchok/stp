const ResponseResult = (result, res) => {
  if (result.errors) {
    res.status(result.status).json(result.errors)
    return
  }

  res.status(result.status).json(result.message)
}

module.exports = ResponseResult
