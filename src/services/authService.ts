
interface OtpRecord {
  otp: string;
  expiresAt: number;
  attempts: number;
}

interface SendOtpResponse {
  success: boolean;
  message: string;
  otp: string;
}

const otpStore = new Map<string, OtpRecord>();

// Generate a new 4-digit OTP
const generateOTP = (previousOTP?: string): string => {
  let otp = '';

  do {
    otp = Math.floor(1000 + Math.random() * 9000).toString();
  } while (otp === previousOTP);

  return otp;
};

// Validate Indian mobile number
const validateMobile = (mobile: string): boolean => {
  return /^[6-9]\d{9}$/.test(mobile);
};

// Send OTP
export const sendLoginOtp = async (
  mobile: string,
): Promise<SendOtpResponse> => {
  if (!validateMobile(mobile)) {
    throw new Error(
      'Mobile number must be 10 digits and start with 6, 7, 8 or 9.',
    );
  }

  const previousOTP = otpStore.get(mobile)?.otp;
  const otp = generateOTP(previousOTP);

  otpStore.set(mobile, {
    otp,
    expiresAt: Date.now() + 2 * 60 * 1000,
    attempts: 0,
  });

  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    success: true,
    message: `Your Demo OTP is ${otp}`,
    otp,
  };
};

// Verify OTP
export const verifyLoginOtp = async (
  mobile: string,
  enteredOtp: string,
): Promise<{ success: boolean; message: string }> => {
  const record = otpStore.get(mobile);

  if (!record) {
    throw new Error('Please generate OTP first.');
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(mobile);
    throw new Error('OTP expired. Please resend OTP.');
  }

  if (record.attempts >= 5) {
    otpStore.delete(mobile);
    throw new Error('Maximum attempts reached. Generate new OTP.');
  }

  record.attempts++;

  if (record.otp !== enteredOtp) {
    throw new Error('Incorrect OTP. Please try again.');
  }

  otpStore.delete(mobile);

  return {
    success: true,
    message: 'OTP verified successfully.',
  };
};

// Resend OTP
export const resendLoginOtp = async (mobile: string) => {
  return sendLoginOtp(mobile);
};
