
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(12, 35, 24, 0.48)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  dialog: {
    width: Math.min(width - 50, 370),
    backgroundColor: '#FFFFFF',
    borderRadius: 27,
    paddingHorizontal: 23,
    paddingTop: 28,
    paddingBottom: 23,
    alignItems: 'center',
    elevation: 20,
  },

  iconContainer: {
    width: 75,
    height: 75,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  title: {
    fontSize: 21,
    fontWeight: '900',
    color: '#18392B',
    textAlign: 'center',
    marginBottom: 9,
  },

  message: {
    fontSize: 13,
    lineHeight: 21,
    color: '#84938A',
    textAlign: 'center',
    marginBottom: 25,
  },

  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },

  cancelButton: {
    flex: 1,
    height: 49,
    borderRadius: 14,
    backgroundColor: '#F1F5F2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#52645A',
  },

  confirmButton: {
    flex: 1,
    height: 49,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullButton: {
    flex: 1,
  },

  confirmText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFFFFF',
  },
});
