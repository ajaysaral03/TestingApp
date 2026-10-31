
import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F8F5',
  },

  // Header
  header: {
    height: 76,
    marginTop:35,
    marginHorizontal: 18,
    marginBottom: 12,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    zIndex: 2,
  },
  headerCenter: {
    position: 'absolute',
    left: 50,
    right: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#18392B',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 10,
    color: '#89968E',
    marginTop: 4,
    textAlign: 'center',
  },
  refreshButton: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: '#E3F4E9',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },

  // List
  listContent: {
    paddingHorizontal: 18,
    paddingTop: 5,
    paddingBottom: 35,
  },
  emptyListContent: {
    flexGrow: 1,
  },

  // Summary cards
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    minHeight: 125,
    borderRadius: 20,
    padding: 15,
    justifyContent: 'space-between',
    elevation: 2,
  },
  incomeCard: {
    backgroundColor: '#E5F7ED',
  },
  expenseCard: {
    backgroundColor: '#FCEBED',
  },
  summaryIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#66766D',
    marginTop: 8,
  },
  summaryAmount: {
    fontSize: width < 370 ? 16 : 19,
    fontWeight: '900',
    color: '#18392B',
    marginTop: 5,
  },

  // Transaction count
  countCard: {
    minHeight: 78,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
    elevation: 2,
  },
  countIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#E5F7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countDetails: {
    flex: 1,
    marginLeft: 12,
  },
  countTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#18392B',
  },
  countSubtitle: {
    fontSize: 10,
    color: '#89968E',
    marginTop: 4,
  },
  countNumber: {
    fontSize: 23,
    fontWeight: '900',
    color: '#159765',
  },

  // Filter
  filterSection: {
    marginBottom: 20,
  },
  filterHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 11,
  },
  filterHeadingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#18392B',
  },
  dropdownButton: {
    minHeight: 70,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EEE8',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  dropdownIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#E5F7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  dropdownLabel: {
    fontSize: 10,
    color: '#89968E',
    fontWeight: '600',
  },
  dropdownValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#18392B',
    marginTop: 4,
  },

  // Filtered heading
  filteredHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },
  filteredHeaderDetails: {
    flex: 1,
  },
  filteredTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#18392B',
  },
  filteredSubtitle: {
    fontSize: 11,
    color: '#89968E',
    marginTop: 4,
  },
  filteredCount: {
    minWidth: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#E3F4E9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginLeft: 10,
  },
  filteredCountText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#159765',
  },

  // Transaction card
  transactionCard: {
    minHeight: 94,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 13,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  transactionIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  incomeIconBg: {
    backgroundColor: '#E5F7ED',
  },
  expenseIconBg: {
    backgroundColor: '#FCEBED',
  },
  details: {
    flex: 1,
    marginLeft: 11,
    marginRight: 5,
  },
  transactionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#18392B',
  },
  transactionMeta: {
    fontSize: 10,
    color: '#89968E',
    marginTop: 4,
  },
  dateText: {
    fontSize: 10,
    color: '#A1ADA5',
    marginTop: 5,
  },
  amountSection: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    minWidth: 100,
  },
  amount: {
    fontSize: 12,
    fontWeight: '900',
  },
  income: {
    color: '#159765',
  },
  expense: {
    color: '#E85C68',
  },

  // Edit and Delete buttons
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 9,
    marginTop: 10,
  },
  editButton: {
    width: 34,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#E5F7ED',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D4EFDF',
  },
  deleteButton: {
    width: 34,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#FFF0F1',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FADADD',
  },

  // Loading
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 13,
    color: '#89968E',
    marginTop: 12,
  },

  // Empty state
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingTop: 35,
  },
  emptyIcon: {
    width: 75,
    height: 75,
    borderRadius: 25,
    backgroundColor: '#E5F7ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#18392B',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 12,
    lineHeight: 19,
    color: '#89968E',
    textAlign: 'center',
    marginTop: 8,
  },

  // Category dropdown modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.42)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 22,
  },
  dropdownModal: {
    width: '100%',
    maxHeight: '75%',
    backgroundColor: '#FFFFFF',
    borderRadius: 23,
    padding: 18,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2EF',
    marginBottom: 10,
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
  modalClose: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#F0F5F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownOptions: {
    maxHeight: 380,
  },
  dropdownOption: {
    minHeight: 57,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    borderRadius: 14,
    marginBottom: 6,
  },
  selectedDropdownOption: {
    backgroundColor: '#EAF7EF',
  },
  optionIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F1F5F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOptionIcon: {
    backgroundColor: '#D7F0E1',
  },
  optionText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#52645A',
    marginLeft: 12,
  },
  selectedOptionText: {
    color: '#159765',
    fontWeight: '900',
  },
  optionCount: {
    fontSize: 12,
    fontWeight: '800',
    color: '#89968E',
    marginRight: 5,
  },

  // Edit transaction modal
  editOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.48)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  editModal: {
    width: '100%',
    maxHeight: '92%',
    backgroundColor: '#FFFFFF',
    borderRadius: 23,
    padding: 19,
    elevation: 10,
  },
  editModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 17,
  },
  editModalTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#18392B',
  },
  editModalSubtitle: {
    fontSize: 11,
    color: '#89968E',
    marginTop: 4,
  },
  editLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#52645A',
    marginBottom: 7,
    marginTop: 10,
  },
  editInput: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: '#E3ECE6',
    backgroundColor: '#FAFCFA',
    borderRadius: 12,
    paddingHorizontal: 13,
    fontSize: 13,
    color: '#18392B',
  },
  descriptionInput: {
    minHeight: 65,
    textAlignVertical: 'top',
    paddingTop: 12,
  },

  // Income / Expense selection
  typeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  typeButton: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#E3ECE6',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: '#FFFFFF',
  },
  incomeTypeSelected: {
    backgroundColor: '#159765',
    borderColor: '#159765',
  },
  expenseTypeSelected: {
    backgroundColor: '#E53945',
    borderColor: '#E53945',
  },
  typeButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#52645A',
  },
  typeButtonTextSelected: {
    color: '#FFFFFF',
  },

  // Edit modal actions
  editActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  editCancelButton: {
    flex: 1,
    height: 47,
    borderRadius: 12,
    backgroundColor: '#EEF3EF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editCancelText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#52645A',
  },
  editSaveButton: {
    flex: 1.5,
    height: 47,
    borderRadius: 12,
    backgroundColor: '#159765',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editSaveText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
