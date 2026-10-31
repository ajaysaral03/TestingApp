
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

interface VerifyOtpResponse {
  success: boolean;
  message: string;
}

const otpStore = new Map<string, OtpRecord>();

const cleanMobile = (mobile: string): string => {
  return mobile.replace(/\D/g, '');
};

const validateMobile = (mobile: string): boolean => {
  return /^[6-9]\d{9}$/.test(mobile);
};

const generateOTP = (previousOTP?: string): string => {
  let otp = '';

  do {
    otp = Math.floor(1000 + Math.random() * 9000).toString();
  } while (otp === previousOTP);

  return otp;
};

// SEND OTP
export const sendLoginOtp = async (
  mobile: string,
): Promise<SendOtpResponse> => {
  const number = cleanMobile(mobile);

  if (!validateMobile(number)) {
    throw new Error('Enter a valid 10-digit Indian mobile number.');
  }

  const previousOTP = otpStore.get(number)?.otp;
  const otp = generateOTP(previousOTP);

  otpStore.set(number, {
    otp,
    expiresAt: Date.now() + 2 * 60 * 1000,
    attempts: 0,
  });

  await new Promise<void>(resolve => setTimeout(resolve, 300));

  return {
    success: true,
    message: 'Demo OTP generated successfully.',
    otp,
  };
};

// VERIFY OTP
export const verifyLoginOtp = async (
  mobile: string,
  enteredOtp: string,
): Promise<VerifyOtpResponse> => {
  const number = cleanMobile(mobile);
  const otp = enteredOtp.trim();

  if (!validateMobile(number)) {
    throw new Error('Invalid mobile number.');
  }

  const record = otpStore.get(number);

  if (!record) {
    throw new Error('OTP not found. Please generate a new OTP.');
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(number);
    throw new Error('OTP expired. Please resend OTP.');
  }

  if (record.attempts >= 5) {
    otpStore.delete(number);
    throw new Error('Maximum attempts reached. Please resend OTP.');
  }

  if (!/^\d{4}$/.test(otp)) {
    throw new Error('Please enter a valid 4-digit OTP.');
  }

  if (record.otp !== otp) {
    record.attempts += 1;

    if (record.attempts >= 5) {
      otpStore.delete(number);
      throw new Error('Maximum attempts reached. Please resend OTP.');
    }

    throw new Error(
      `Incorrect OTP. ${5 - record.attempts} attempts remaining.`,
    );
  }

  // Correct OTP
  otpStore.delete(number);

  return {
    success: true,
    message: 'OTP verified successfully.',
  };
};

// RESEND OTP
export const resendLoginOtp = async (
  mobile: string,
): Promise<SendOtpResponse> => {
  return sendLoginOtp(mobile);
};
