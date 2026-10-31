
import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 35,
    paddingBottom: 30,
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

  // Brand
  topBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  brandIcon: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: '#239D64',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  brandText: {
    fontSize: 30,
    fontWeight: '900',
    color: '#153B2C',
    fontFamily: FONTS.extraBold,
    letterSpacing: -1.2,
  },

  brandGreen: {
    color: '#239D64',
  },

  brandTagline: {
    fontSize: 10,
    letterSpacing: 2,
    color: '#708092',
    marginTop: 8,
    fontFamily: FONTS.semiBold,
  },

  // Wallet Logo
  logoWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
    marginBottom: 22,
  },

  logoOuterCircle: {
    width: 205,
    height: 205,
    borderRadius: 105,
    backgroundColor: '#DDF3E6',
    borderWidth: 2,
    borderColor: '#A5DBB8',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#239D64',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.17,
    shadowRadius: 16,
    elevation: 9,
  },

  logoMiddleCircle: {
    width: 188,
    height: 188,
    borderRadius: 96,
    backgroundColor: '#EFFAF3',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoInnerCircle: {
    width: 170,
    height: 170,
    borderRadius: 87,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#CBEAD5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  walletBadge: {
    position: 'absolute',
    bottom: 20,
    right: 18,
    width: 43,
    height: 43,
    borderRadius: 23,
    backgroundColor: '#25A866',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },

  // Heading
  heading: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 25,
  },

  title: {
    fontSize: 29,
    lineHeight: 38,
    fontWeight: '900',
    color: '#153B2C',
    textAlign: 'center',
    fontFamily: FONTS.extraBold,
  },

  titleGreen: {
    fontSize: 26,
    lineHeight: 35,
    fontWeight: '900',
    color: '#239D64',
    textAlign: 'center',
    fontFamily: FONTS.extraBold,
  },

  subtitle: {
    marginTop: 9,
    fontSize: 13,
    lineHeight: 20,
    color: '#647383',
    textAlign: 'center',
    fontFamily: FONTS.medium,
  },

  // Form
  form: {
    width: '100%',
  },

  label: {
    fontSize: 14,
    fontWeight: '800',
    color: '#153B2C',
    marginBottom: 11,
    fontFamily: FONTS.bold,
  },

  phoneInput: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.3,
    borderColor: '#D6E9DC',
    borderRadius: 16,

    shadowColor: '#239D64',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 7,
    elevation: 2,
  },

  phoneInputFocused: {
    borderColor: '#239D64',
    borderWidth: 1.8,
    backgroundColor: '#FFFFFF',
  },

  phoneIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#EAF7EF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  countryCode: {
    fontSize: 15,
    fontWeight: '800',
    color: '#153B2C',
    marginLeft: 10,
    fontFamily: FONTS.bold,
  },

  separator: {
    width: 1,
    height: 27,
    backgroundColor: '#D8E7DD',
    marginHorizontal: 11,
  },

  input: {
    flex: 1,
    minWidth: 0,
    height: '100%',
    fontSize: 14,
    fontWeight: '600',
    color: '#153B2C',
    textAlign: 'left',
    paddingVertical: 0,
    includeFontPadding: false,
    fontFamily: FONTS.medium,
  },

  helperText: {
    fontSize: 11,
    color: '#8A9990',
    marginTop: 9,
    fontFamily: FONTS.medium,
  },

  // Button
  button: {
    width: '100%',
    height: 58,
    marginTop: 22,
    paddingHorizontal: 17,
    borderRadius: 16,
    backgroundColor: '#239D64',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    shadowColor: '#239D64',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 9,
    elevation: 5,
  },

  buttonDisabled: {
    opacity: 0.65,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: FONTS.bold,
  },

  buttonArrow: {
    width: 39,
    height: 39,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Security
  secureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
  },

  secureText: {
    fontSize: 11,
    color: '#829189',
    fontFamily: FONTS.medium,
  },

  // Footer
  footer: {
    alignItems: 'center',
    marginTop: 28,
  },

  footerLine: {
    width: 45,
    height: 4,
    borderRadius: 5,
    backgroundColor: '#BCE5CC',
    marginBottom: 13,
  },

  footerText: {
    fontSize: 10,
    color: '#8292A3',
    letterSpacing: 1.5,
    fontWeight: '600',
    fontFamily: FONTS.semiBold,
  },

  // SweetAlert
  alertOverlay: {
    backgroundColor: 'rgba(15, 40, 28, 0.55)',
  },

  alertTitle: {
    color: '#153B2C',
    fontSize: 21,
    fontWeight: '900',
    fontFamily: FONTS.extraBold,
    textAlign: 'center',
  },

  alertMessage: {
    color: '#647383',
    fontSize: 14,
    lineHeight: 21,
    fontFamily: FONTS.medium,
    textAlign: 'center',
  },

  alertConfirmButton: {
    minWidth: 110,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 11,
  },

  alertConfirmText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    fontFamily: FONTS.bold,
  },
});
