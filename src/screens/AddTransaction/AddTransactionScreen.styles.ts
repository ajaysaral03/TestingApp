import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  // Main Screen
  container: {
    flex: 1,
    backgroundColor: '#F4FAF6',
  },

  formScroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 21,
    paddingTop: 10,
    paddingBottom: 18,
  },

  // Fixed Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 21,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingBottom: 15,
    backgroundColor: '#F4FAF6',
    minHeight: 76,
    marginTop:35,
  },

  backButton: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EAF1EC',
    elevation: 2,
    shadowColor: '#18392B',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#18392B',
  },

  headerSubtitle: {
    fontSize: 11,
    color: '#89968E',
    marginTop: 4,
  },

  headerPlaceholder: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#E5F7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Income / Expense Toggle
  typeContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    padding: 5,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#EAF1EC',
    elevation: 2,
  },

  typeButton: {
    flex: 1,
    minHeight: 51,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 9,
  },

  expenseActive: {
    backgroundColor: '#F16D76',
  },

  incomeActive: {
    backgroundColor: '#159765',
  },

  typeText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#52645A',
  },

  activeTypeText: {
    color: '#FFFFFF',
  },

  // Amount Card
  amountCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 23,
    padding: 19,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#EAF1EC',
    elevation: 3,
    shadowColor: '#18392B',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
  },

  cardHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },

  headingIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: '#E5F7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },

  fieldLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: '#52645A',
    marginBottom: 10,
    letterSpacing: 0.5,
  },

  amountInputContainer: {
    minHeight: 65,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAF8',
    borderWidth: 1,
    borderColor: '#E5EEE8',
    borderRadius: 16,
    paddingHorizontal: 16,
  },

  rupeeSymbol: {
    fontSize: 29,
    fontWeight: '900',
    marginRight: 12,
  },

  amountInput: {
    flex: 1,
    fontSize: width < 360 ? 24 : 29,
    fontWeight: '900',
    color: '#18392B',
    paddingVertical: 10,
  },

  amountHint: {
    fontSize: 10,
    color: '#9AA69F',
    marginTop: 9,
  },

  // Transaction Details Card
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 23,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EAF1EC',
    elevation: 3,
    shadowColor: '#18392B',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
  },

  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    marginBottom: 20,
  },

  sectionHeadingIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#E5F7ED',
    justifyContent: 'center',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#18392B',
  },

  sectionSubtitle: {
    fontSize: 10,
    color: '#89968E',
    marginTop: 4,
  },

  // Label Icons
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 10,
  },

  smallLabelIcon: {
    width: 22,
    height: 22,
    borderRadius: 7,
    backgroundColor: '#E5F7ED',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Input Left Content
  inputLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    flex: 1,
  },

  inputIconBox: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: '#E5F7ED',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Category Dropdown
  dropdownButton: {
    minHeight: 61,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7FAF8',
    borderWidth: 1,
    borderColor: '#E5EEE8',
    borderRadius: 15,
    paddingHorizontal: 12,
    marginBottom: 19,
  },

  dropdownText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#18392B',
  },

  placeholderText: {
    color: '#A2B0A7',
    fontWeight: '500',
  },

  // Date Input
  dateInput: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7FAF8',
    borderWidth: 1,
    borderColor: '#DDEDE3',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 19,
  },

  dateIconBox: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: '#E5F7ED',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dateTextContainer: {
    flex: 1,
  },

  dateValue: {
    fontSize: 13,
    fontWeight: '900',
    color: '#18392B',
  },

  dateHint: {
    fontSize: 10,
    color: '#159765',
    marginTop: 5,
    fontWeight: '600',
  },

  dateChangeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 9,
    backgroundColor: '#E5F7ED',
  },

  dateChangeText: {
    fontSize: 10,
    color: '#159765',
    fontWeight: '800',
  },

  // Description
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F7FAF8',
    borderWidth: 1,
    borderColor: '#E5EEE8',
    borderRadius: 15,
    paddingHorizontal: 13,
    paddingTop: 14,
    minHeight: 100,
  },

  descriptionIcon: {
    marginRight: 10,
    marginTop: 2,
  },

  descriptionInput: {
    flex: 1,
    minHeight: 76,
    fontSize: 13,
    color: '#18392B',
    padding: 0,
  },

  characterCount: {
    fontSize: 10,
    color: '#9AA69F',
    textAlign: 'right',
    marginTop: 6,
  },

  bottomSpace: {
    height: 8,
  },

  // Fixed Save Footer
  fixedSaveFooter: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 21,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 22 : 12,
    borderTopWidth: 1,
    borderTopColor: '#EAF1EC',
    elevation: 12,
    shadowColor: '#18392B',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -4 },
  },

  // Save Button
  saveButton: {
    minHeight: 56,
    borderRadius: 17,
    backgroundColor: '#F16D76',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    elevation: 5,
    shadowColor: '#F16D76',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  incomeSaveButton: {
    backgroundColor: '#159765',
    shadowColor: '#159765',
  },

  disabledButton: {
    opacity: 0.6,
  },

  saveButtonText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  // Footer Note
  footerInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    marginTop: 10,
  },

  footerNote: {
    fontSize: 10,
    color: '#89968E',
    textAlign: 'center',
    lineHeight: 16,
  },

  // Category Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(12,30,20,0.50)',
    justifyContent: 'flex-end',
  },

  dropdownModal: {
    width: '100%',
    maxHeight: '75%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
    paddingHorizontal: 21,
    paddingTop: 24,
    paddingBottom: 25,
    elevation: 15,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#18392B',
  },

  modalSubtitle: {
    fontSize: 11,
    color: '#89968E',
    marginTop: 5,
  },

  modalCloseIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F1F5F2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryItem: {
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 9,
    backgroundColor: '#F7FAF8',
    borderWidth: 1,
    borderColor: '#F0F4F1',
  },

  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  categoryIconBox: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: '#EAF1EC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedCategoryIconBox: {
    backgroundColor: '#FFFFFF',
  },

  selectedCategoryItem: {
    backgroundColor: '#E5F7ED',
    borderWidth: 1,
    borderColor: '#159765',
  },

  categoryItemText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#52645A',
  },

  selectedCategoryText: {
    color: '#159765',
    fontWeight: '900',
  },

  modalCloseButton: {
    minHeight: 49,
    backgroundColor: '#F1F5F2',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  modalCloseText: {
    color: '#18392B',
    fontWeight: '800',
    fontSize: 13,
  },
});