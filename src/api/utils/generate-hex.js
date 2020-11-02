const hexList = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F'
]

export default function genHex() {
  let result = ''

  for (let i = 0; i < 6; i++)
    result += hexList[Math.floor(Math.random() * hexList.length)]

  return '#' + result
}
