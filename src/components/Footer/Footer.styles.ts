
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    minHeight: 78,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    paddingTop: 9,
    paddingBottom: 8,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 15,
    shadowColor: '#18392B',
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: -4 },
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  label: {
    fontSize: 9,
    fontWeight: '600',
    color: '#89968E',
  },

  activeLabel: {
    color: '#159765',
    fontWeight: '900',
  },

  addButton: {
    width: 55,
    height: 55,
    borderRadius: 20,
    backgroundColor: '#159765',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -26,
    borderWidth: 5,
    borderColor: '#F4FAF6',
    elevation: 7,
    shadowColor: '#159765',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
});
