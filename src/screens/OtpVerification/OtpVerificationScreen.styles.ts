
import { StyleSheet, Dimensions, Platform } from 'react-native';

import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';

const { width } = Dimensions.get('window');

const SIDE_PADDING = 23;
const CARD_PADDING = 20;
const OTP_GAP = 10;

const OTP_WIDTH =
  (width -
    SIDE_PADDING * 2 -
    CARD_PADDING * 2 -
    OTP_GAP * 3) / 4;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SIDE_PADDING,
    paddingBottom: 25,
  },

  mainContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Background
  backgroundCircleLarge: {
    position: 'absolute',
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: '#E0F5E9',
    top: -180,
    right: -180,
  },

  backgroundCircleSmall: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#E9F4FF',
    bottom: -160,
    left: -155,
  },

  backgroundDotOne: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#A9E8C2',
    top: '24%',
    left: 30,
    opacity: 0.8,
  },

  backgroundDotTwo: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: '#B8DFFF',
    right: 35,
    bottom: '28%',
    opacity: 0.8,
  },

  // Header
  header: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'android' ? 25 : 15,
    paddingTop: 5,
  },

  backButton: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#18392B',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  brandName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#18392B',
    letterSpacing: 0.2,
    fontFamily: FONTS.bold,
  },

  headerSpace: {
    width: 45,
  },

  // Illustration
  illustrationSection: {
    width: 170,
    height: 155,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    marginBottom: 12,
  },

  glowCircle: {
    position: 'absolute',
    width: 145,
    height: 145,
    borderRadius: 75,
    backgroundColor: '#DDF2E5',
  },

  shieldCircle: {
    width: 112,
    height: 112,
    borderRadius: 38,
    backgroundColor: '#159765',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    shadowColor: '#159765',
    shadowOpacity: 0.3,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },

  innerShield: {
    width: 88,
    height: 88,
    borderRadius: 30,
    backgroundColor: '#20A775',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },

  sparkleOne: {
    position: 'absolute',
    top: 5,
    right: 20,
    width: 35,
    height: 35,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  sparkleTwo: {
    position: 'absolute',
    bottom: 8,
    left: 12,
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  // Heading
  heading: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 22,
  },

  title: {
    fontSize: 27,
    fontWeight: '900',
    color: '#173A2B',
    letterSpacing: -0.7,
    textAlign: 'center',
    fontFamily: FONTS.extraBold,
  },

  titleGreen: {
    fontSize: 25,
    fontWeight: '900',
    color: '#239D64',
    textAlign: 'center',
    marginTop: 3,
    fontFamily: FONTS.extraBold,
  },

  subtitle: {
    fontSize: 13,
    color: '#84928A',
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 10,
    fontFamily: FONTS.medium,
  },

  // Mobile Card
  mobileCard: {
    width: '100%',
    minHeight: 76,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#EAF1EC',
    elevation: 3,
    shadowColor: '#18392B',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  mobileIcon: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#E9F7EF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mobileDetails: {
    flex: 1,
    marginLeft: 12,
  },

  mobileLabel: {
    fontSize: 11,
    color: '#8B9990',
    marginBottom: 5,
    fontFamily: FONTS.medium,
  },

  mobileNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: '#18392B',
    fontFamily: FONTS.bold,
  },

  verifiedBadge: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: '#E9F7EF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // OTP Card
  otpCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: CARD_PADDING,
    borderWidth: 1,
    borderColor: '#EAF1EC',
    elevation: 5,
    shadowColor: '#18392B',
    shadowOpacity: 0.07,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },

  otpHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  otpTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#18392B',
    fontFamily: FONTS.bold,
  },

  otpStep: {
    fontSize: 10,
    fontWeight: '700',
    color: '#159765',
    backgroundColor: '#E9F7EF',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 8,
    fontFamily: FONTS.bold,
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: OTP_GAP,
  },

  otpInput: {
    width: OTP_WIDTH,
    height: 62,
    borderRadius: 16,
    backgroundColor: '#F7FAF8',
    borderWidth: 1.5,
    borderColor: '#E2ECE5',
    color: '#173A2B',
    fontSize: 25,
    fontWeight: '900',
    padding: 0,
    includeFontPadding: false,
    textAlign: 'center',
    fontFamily: FONTS.extraBold,
  },

  otpInputFilled: {
    backgroundColor: '#E9F7EF',
    borderColor: '#159765',
    color: '#159765',
  },

  otpInputBlocked: {
    opacity: 0.55,
  },

  // Resend
  timerSection: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  timerLabel: {
    fontSize: 11,
    color: '#89968E',
    fontFamily: FONTS.medium,
  },

  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
  },

  resendText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#159765',
    fontFamily: FONTS.bold,
  },

  // Verify Button
  verifyButton: {
    width: '100%',
    height: 58,
    borderRadius: 17,
    backgroundColor: '#159765',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
    elevation: 5,
    shadowColor: '#159765',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  verifyDisabled: {
    opacity: 0.45,
  },

  verifyText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
    fontFamily: FONTS.bold,
  },

  blockedMessage: {
    color: '#D9534F',
    fontSize: 11,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: FONTS.medium,
  },

  // Security
  securityCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9F7EF',
    borderRadius: 17,
    padding: 14,
    marginTop: 22,
  },

  securityIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  securityDetails: {
    flex: 1,
    marginLeft: 11,
  },

  securityTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#24543B',
    marginBottom: 4,
    fontFamily: FONTS.bold,
  },

  securityDescription: {
    fontSize: 10,
    color: '#82958A',
    fontFamily: FONTS.medium,
  },

  // Footer
  footerText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#A5B4AA',
    letterSpacing: 2,
    marginTop: 25,
    marginBottom: 10,
    fontFamily: FONTS.semiBold,
  },
});
