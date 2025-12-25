export const generateOtp = (): string => {
    return String(Math.floor(10000 + Math.random() * 900000).toString())
}