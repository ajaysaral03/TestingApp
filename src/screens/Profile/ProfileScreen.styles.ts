
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F8F5',
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#F3F8F5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    color: '#159765',
    marginTop: 12,
    fontSize: 13,
    fontWeight: '600',
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 35,
  },

  // HEADER
  header: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    backgroundColor: '#F3F8F5',
  },

  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#18392B',
  },

  headerSubtitle: {
    fontSize: 11,
    color: '#89968E',
    marginTop: 3,
  },

  // PROFILE CARD
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 23,
    paddingVertical: 24,
    paddingHorizontal: 18,
    alignItems: 'center',
    marginTop: 12,
    elevation: 3,
  },

  imageContainer: {
    position: 'relative',
    marginBottom: 13,
  },

  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },

  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E5F5EC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#159765',
  },

  cameraIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#159765',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileName: {
    fontSize: 21,
    fontWeight: '800',
    color: '#18392B',
  },

  profileMobile: {
    fontSize: 13,
    color: '#89968E',
    marginTop: 5,
  },

  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E8F7EF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 12,
  },

  memberText: {
    color: '#159765',
    fontSize: 11,
    fontWeight: '700',
  },

  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#E8F7EF',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    marginTop: 14,
  },

  editProfileText: {
    color: '#159765',
    fontSize: 12,
    fontWeight: '700',
  },

  // SUMMARY CARDS
  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 15,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 15,
    minHeight: 120,
    elevation: 2,
  },

  summaryIconIncome: {
    width: 37,
    height: 37,
    borderRadius: 12,
    backgroundColor: '#E5F6EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  summaryIconExpense: {
    width: 37,
    height: 37,
    borderRadius: 12,
    backgroundColor: '#FCEBEC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  summaryIconBlue: {
    width: 37,
    height: 37,
    borderRadius: 12,
    backgroundColor: '#EAF2FC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  summaryIconPurple: {
    width: 37,
    height: 37,
    borderRadius: 12,
    backgroundColor: '#F1ECFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  summaryLabel: {
    fontSize: 12,
    color: '#89968E',
    fontWeight: '500',
  },

  incomeAmount: {
    fontSize: 17,
    fontWeight: '800',
    color: '#159765',
    marginTop: 6,
  },

  expenseAmount: {
    fontSize: 17,
    fontWeight: '800',
    color: '#E85C68',
    marginTop: 6,
  },

  balanceAmount: {
    fontSize: 17,
    fontWeight: '800',
    color: '#4386CF',
    marginTop: 6,
  },

  transactionAmount: {
    fontSize: 17,
    fontWeight: '800',
    color: '#8A68CC',
    marginTop: 6,
  },

  // ACCOUNT DETAILS
  detailsSection: {
    marginTop: 25,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#18392B',
    marginBottom: 13,
  },

  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 5,
    elevation: 2,
  },

  detailRow: {
    minHeight: 53,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  detailLabel: {
    fontSize: 12,
    color: '#89968E',
    fontWeight: '500',
  },

  detailValue: {
    fontSize: 13,
    color: '#263B31',
    fontWeight: '700',
  },

  detailDivider: {
    height: 1,
    backgroundColor: '#EEF2EF',
  },

  // SETTINGS
  settingsSection: {
    marginTop: 25,
  },

  sectionHeader: {
    marginBottom: 13,
  },

  sectionSubtitle: {
    fontSize: 12,
    color: '#89968E',
    marginTop: 4,
  },

  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 14,
    elevation: 2,
  },

  settingItem: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },

  settingBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2EF',
  },

  settingIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#E8F7EF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  settingTextContainer: {
    flex: 1,
  },

  settingTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#263B31',
  },

  settingSubtitle: {
    fontSize: 11,
    color: '#929D96',
    marginTop: 5,
  },

  // LOGOUT
  logoutButton: {
    height: 55,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 23,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#F5DADA',
  },

  logoutText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#E85C68',
  },

  versionText: {
    textAlign: 'center',
    fontSize: 11,
    color: '#A0AAA5',
    marginTop: 17,
  },

  // MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },

  modalContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#18392B',
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#34483D',
    marginBottom: 8,
  },

  modalInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E1EAE4',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#18392B',
    marginBottom: 20,
  },

  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },

  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F0F4F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    color: '#52645A',
    fontSize: 13,
    fontWeight: '700',
  },

  saveButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#159765',
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
