export default function() {
  const startTime = new Date()
  const isoTime = new Date(new Date(startTime).toISOString())
  const fixedTime = new Date(
    isoTime.getTime() - startTime.getTimezoneOffset() * 60000
  )

  const format = fixedTime
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ')

  return format
}
