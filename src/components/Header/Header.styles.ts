
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    backgroundColor: '#F5F8F6',
  },

  container: {
    width: '100%',
    // minHeight: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#F5F8F6',
  },

  profileSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 11,
    backgroundColor: '#DDF5E8',
  },

  avatarPlaceholder: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 11,
    backgroundColor: '#DDF5E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 21,
    fontWeight: '800',
    color: '#159765',
  },

  userDetails: {
    flex: 1,
    justifyContent: 'center',
  },

  greeting: {
    fontSize: 10,
    color: '#84938A',
    fontWeight: '500',
    marginBottom: 2,
  },

  userName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#18392B',
  },

  phoneNumber: {
    fontSize: 10,
    color: '#84938A',
    marginTop: 3,
  },

  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#18392B',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  notificationDot: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#F05C5C',
    top: 7,
    right: 7,
  },
});
