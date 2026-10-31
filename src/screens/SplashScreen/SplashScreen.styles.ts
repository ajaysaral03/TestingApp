
import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
  },

  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingTop: 5,
    paddingBottom: 105,
  },

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

  logoWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    marginBottom: 18,
  },

  logoOuterCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
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
    width: 232,
    height: 232,
    borderRadius: 116,
    backgroundColor: '#EFFAF3',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoInnerCircle: {
    width: 214,
    height: 214,
    borderRadius: 107,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#CBEAD5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  walletBadge: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#25A866',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },

  content: {
    width: '100%',
    alignItems: 'center',
  },

  title: {
    fontSize: 31,
    lineHeight: 39,
    fontWeight: '900',
    color: '#153B2C',
    textAlign: 'center',
    fontFamily: FONTS.extraBold,
  },

  titleGreen: {
    fontSize: 31,
    lineHeight: 39,
    fontWeight: '900',
    color: '#239D64',
    textAlign: 'center',
    fontFamily: FONTS.extraBold,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: '#647383',
    textAlign: 'center',
    fontFamily: FONTS.medium,
  },

  featureRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginTop: 23,
  },

  feature: {
    flex: 1,
    alignItems: 'center',
    gap: 7,
  },

  featureIcon: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E8F4EC',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  featureText: {
    fontSize: 11,
    lineHeight: 17,
    color: '#16436A',
    fontWeight: '700',
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },

  bottom: {
    position: 'absolute',
    left: 25,
    right: 25,
    bottom: 20,
  },

  loadingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  loadingText: {
    fontSize: 12,
    color: '#718092',
    fontFamily: FONTS.medium,
  },

  loadingPercent: {
    fontSize: 14,
    color: '#239D64',
    fontWeight: '900',
    fontFamily: FONTS.bold,
  },

  progressBackground: {
    height: 9,
    width: '100%',
    backgroundColor: '#DCEFE3',
    borderRadius: 20,
    overflow: 'hidden',
  },

  progress: {
    height: '100%',
    backgroundColor: '#36B95E',
    borderRadius: 20,
  },

  footerText: {
    textAlign: 'center',
    marginTop: 17,
    fontSize: 10,
    color: '#8292A3',
    letterSpacing: 1.5,
    fontWeight: '600',
    fontFamily: FONTS.semiBold,
  },

});
