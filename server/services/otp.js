const otpGenerator = require('otp-generator')
const { OTP_LENGTH, OTP_CONFIG } = require('../constants/constants')

module.exports.generateOTP = function () {
    const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG)
    return OTP
}
