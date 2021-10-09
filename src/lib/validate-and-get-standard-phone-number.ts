
const validPhoneFormatRegex = /^(\+98|0|0098)?9\d{9}$/;

const validateAndGetStandardPhoneNumber: (value: string) => string = value => {

  try {

    if (typeof value !== 'string') throw new Error("Provided value is not a valid Phone Number")

    // security reasons
    if (value.length > 13) throw new Error("Provided value is not a valid Phone Number")
  
    const isValid = validPhoneFormatRegex.test(value);
    
    if (isValid) return `+98${value.slice(value.length - 10, value.length)}`;
    
    throw new Error("Provided value is not a valid Phone Number");
  } catch (error) {
    throw error
  }
}

export default validateAndGetStandardPhoneNumber;