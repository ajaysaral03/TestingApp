
import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';

export const styles = StyleSheet.create({

  // Main Container

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
  },

  // Main Center Content

  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingTop: 5,
    paddingBottom: 105,
  },

  // Background Circles

  backgroundCircleLarge: {
    position: 'absolute',
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: '#DDF3FF',
    top: -180,
    right: -180,
  },

  backgroundCircleSmall: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#EAF8F0',
    bottom: -160,
    left: -155,
  },

  backgroundDotOne: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#BCE9FF',
    top: '24%',
    left: 30,
    opacity: 0.8,
  },

  backgroundDotTwo: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: '#B8E9C5',
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
    backgroundColor: '#E5F5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  brandText: {
    fontSize: 35,
    fontWeight: '900',
    color: '#123D67',
    fontFamily: FONTS.extraBold,
    letterSpacing: -1.5,
  },

  brandGreen: {
    color: '#24A65A',
  },

  brandTagline: {
    fontSize: 10,
    letterSpacing: 2,
    color: '#708092',
    marginTop: 3,
    fontFamily: FONTS.semiBold,
  },

  // Bike Rider Circular Logo

  logoWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 12,
  },

  logoOuterCircle: {
    width: 270,
    height: 270,
    borderRadius: 135,
    backgroundColor: '#DDF2FF',
    borderWidth: 2,
    borderColor: '#A8DFF5',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#238FC2',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.17,
    shadowRadius: 16,
    elevation: 9,
  },

  logoMiddleCircle: {
    width: 252,
    height: 252,
    borderRadius: 126,
    backgroundColor: '#EDF9FF',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoInnerCircle: {
    width: 234,
    height: 234,
    borderRadius: 117,
    backgroundColor: '#F7FCFF',
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

  // Content

  content: {
    width: '100%',
    alignItems: 'center',
  },

  title: {
    fontSize: 35,
    lineHeight: 41,
    fontWeight: '900',
    color: '#123D67',
    textAlign: 'center',
    fontFamily: FONTS.extraBold,
    letterSpacing: -0.7,
  },

  titleGreen: {
    fontSize: 35,
    lineHeight: 41,
    fontWeight: '900',
    color: '#28A64F',
    textAlign: 'center',
    fontFamily: FONTS.extraBold,
    letterSpacing: -0.7,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: '#647383',
    textAlign: 'center',
    fontFamily: FONTS.medium,
  },

  // Features

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
    width: 58,
    height: 58,
    borderRadius: 35,
    backgroundColor: '#E9F7FF',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#80BBD9',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },

  featureText: {
    fontSize: 12,
    lineHeight: 17,
    color: '#16436A',
    fontWeight: '700',
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },

  // Bottom Loading

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
    color: '#28A64F',
    fontWeight: '900',
    fontFamily: FONTS.bold,
  },

  progressBackground: {
    height: 9,
    width: '100%',
    backgroundColor: '#DCEEF7',
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
