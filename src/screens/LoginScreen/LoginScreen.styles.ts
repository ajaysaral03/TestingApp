
import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8FCFF',
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 15,
    paddingBottom: 22,
  },

  page: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  // Background

  backgroundCircleOne: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#E7F6FF',
    top: -110,
    right: -150,
  },

  backgroundCircleTwo: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#EAF8F0',
    bottom: 40,
    left: -150,
  },

  // Brand

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  brandIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#E5F5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  brandText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#123D67',
    fontFamily: FONTS.extraBold,
    letterSpacing: -1.3,
  },

  brandGreen: {
    color: '#24A65A',
  },

  brandTagline: {
    textAlign: 'center',
    fontSize: 9,
    letterSpacing: 2,
    color: '#708092',
    marginTop: 5,
    fontFamily: FONTS.semiBold,
  },

  // Hero Logo

  hero: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 5,
  },

  heroOuterCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#DDF2FF',
    borderWidth: 2,
    borderColor: '#A8DFF5',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#238FC2',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 13,
    elevation: 8,
  },

  heroMiddleCircle: {
    width: 184,
    height: 184,
    borderRadius: 92,
    backgroundColor: '#EDF9FF',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroInnerCircle: {
    width: 168,
    height: 168,
    borderRadius: 84,
    backgroundColor: '#F8FCFF',
    borderWidth: 2,
    borderColor: '#CBEAF8',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  deliveryImage: {
    width: '100%',
    height: '100%',
  },

  floatingIcon: {
    position: 'absolute',
    zIndex: 2,
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  // Heading

  heading: {
    alignItems: 'center',
    marginTop: 5,
  },

  eyebrow: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#239B68',
    marginBottom: 5,
    fontFamily: FONTS.bold,
  },

  title: {
    fontSize: 29,
    lineHeight: 35,
    textAlign: 'center',
    color: '#123D67',
    fontWeight: '900',
    letterSpacing: -0.7,
    fontFamily: FONTS.extraBold,
  },

  titleGreen: {
    fontSize: 29,
    lineHeight: 35,
    textAlign: 'center',
    color: '#28A64F',
    fontWeight: '900',
    letterSpacing: -0.7,
    fontFamily: FONTS.extraBold,
  },

  subtitle: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
    color: '#647383',
    fontFamily: FONTS.regular,
  },

  // Form

  form: {
    marginTop: 22,
  },

  label: {
    fontSize: 13,
    color: '#173B5D',
    marginBottom: 9,
    fontWeight: '700',
    fontFamily: FONTS.bold,
  },

  phoneInput: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.3,
    borderColor: '#BCE6F5',
    borderRadius: 17,
    elevation: 2,
    shadowColor: '#80BBD9',
    shadowOpacity: 0.08,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  phoneIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#EAF7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  countryCode: {
    marginLeft: 9,
    fontSize: 14,
    fontWeight: '800',
    color: '#173B5D',
    fontFamily: FONTS.bold,
  },

  separator: {
    width: 1,
    height: 25,
    marginHorizontal: 10,
    backgroundColor: '#CBEAF8',
  },

  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 10,
    fontSize: 14,
    color: '#173B5D',
    fontFamily: FONTS.regular,
  },

  helperText: {
    fontSize: 10,
    marginTop: 8,
    color: '#718092',
    fontFamily: FONTS.regular,
  },

  // Button

  button: {
    minHeight: 56,
    marginTop: 18,
    paddingLeft: 20,
    paddingRight: 9,
    borderRadius: 17,
    backgroundColor: '#239B68',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
    shadowColor: '#239B68',
    shadowOpacity: 0.22,
    shadowRadius: 9,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
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

  secureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 15,
  },

  secureText: {
    fontSize: 10,
    color: '#718092',
    fontFamily: FONTS.regular,
  },

  // Footer

  footer: {
    marginTop: 20,
    paddingTop: 12,
    alignItems: 'center',
  },

  footerFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  footerFeatureText: {
    fontSize: 10,
    color: '#617589',
    fontFamily: FONTS.medium,
  },

  footerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#AAB5C0',
    marginHorizontal: 4,
  },

  footerText: {
    marginTop: 13,
    fontSize: 9,
    letterSpacing: 2,
    color: '#8A9AAA',
    fontWeight: '700',
    fontFamily: FONTS.semiBold,
  },

  // SweetAlert

  modalRoot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 35, 48, 0.55)',
  },

  dismissArea: {
    ...StyleSheet.absoluteFillObject,
  },

  alertCard: {
    width: '100%',
    maxWidth: 370,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 22,
    paddingTop: 34,
    paddingBottom: 24,
    alignItems: 'center',
    elevation: 20,
  },

  closeButton: {
    position: 'absolute',
    right: 14,
    top: 14,
    width: 33,
    height: 33,
    borderRadius: 11,
    backgroundColor: '#F0F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },

  alertIcon: {
    width: 72,
    height: 72,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17,
  },

  alertIconSuccess: {
    backgroundColor: '#26A269',
  },

  alertIconError: {
    backgroundColor: '#E65353',
  },

  alertTitle: {
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    color: '#173B5D',
    fontFamily: FONTS.bold,
  },

  alertMessage: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 21,
    textAlign: 'center',
    color: '#718092',
    fontFamily: FONTS.regular,
  },

  alertButton: {
    minHeight: 51,
    alignSelf: 'stretch',
    marginTop: 22,
    borderRadius: 15,
    backgroundColor: '#239B68',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  alertButtonError: {
    backgroundColor: '#E65353',
  },

  alertButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '800',
    fontFamily: FONTS.bold,
  },

});
