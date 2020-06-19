export default function(req, res) {
  const { id } = req.params

  // 잘못된 요청 핸들링
  if (!id || !res.locals.user) {
    return res.status(400).end()
  }
}
