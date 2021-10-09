
const generateSingleDigitNumber: () => number = () => Math.floor(Math.random() * 10)

const generateNumericString: (length: number) => string = (length: number) => {
  return Array.from({ length }).reduce((acc: string, _, i) => {

    const digit = generateSingleDigitNumber()

    const shouldChange = i === 0 && digit === 0

    return acc += (shouldChange ? 1 : digit)
  }, '')

}

export default generateNumericString