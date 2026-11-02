
import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F8F5',
  },

  // HEADER
  header: {
    minHeight: 80,
    marginTop: 37,
    marginHorizontal: 18,
    marginBottom: 8,
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

  // SEARCH BAR
  searchSection: {
    marginHorizontal: 18,
    marginBottom: 12,
    marginTop: 0,
  },

  searchContainer: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5EEE8',
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    minWidth: 0,
    height: 48,
    marginLeft: 10,
    fontSize: 14,
    color: '#18392B',
    paddingVertical: 0,
    includeFontPadding: false,
  },

  searchClearButton: {
    width: 30,
    height: 32,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F5F1',
    marginRight: 5,
  },

  searchFilterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#159765',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    position: 'relative',
  },

  filterBadge: {
    position: 'absolute',
    right: -5,
    top: -5,
    minWidth: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: '#E85C68',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },

  filterBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  // ACTIVE FILTERS
  activeFilters: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginHorizontal: 18,
    marginBottom: 12,
  },

  activeFilterChip: {
    backgroundColor: '#E1F5E9',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 9,
  },

  activeFilterText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#159765',
  },

  clearFiltersText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#E85C68',
    padding: 5,
  },

  // LIST
  listContent: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 35,
  },

  emptyListContent: {
    flexGrow: 1,
  },

  // SUMMARY
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },

  summaryCard: {
    flex: 1,
    minWidth: 0,
    minHeight: 115,
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


  dateOptions: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 9,
},

dateOption: {
  paddingHorizontal: 13,
  paddingVertical: 11,
  borderRadius: 11,
  borderWidth: 1,
  borderColor: '#E3ECE6',
  backgroundColor: '#FAFCFA',
  alignItems: 'center',
  justifyContent: 'center',
},

dateOptionActive: {
  backgroundColor: '#159765',
  borderColor: '#159765',
},

dateOptionText: {
  fontSize: 11,
  fontWeight: '700',
  color: '#52645A',
},

dateOptionTextActive: {
  color: '#FFFFFF',
},

inputLabel: {
  fontSize: 12,
  fontWeight: '800',
  color: '#52645A',
  marginTop: 15,
  marginBottom: 8,
},

input: {
  height: 46,
  borderWidth: 1,
  borderColor: '#DDE9E1',
  backgroundColor: '#FAFCFA',
  borderRadius: 12,
  paddingHorizontal: 13,
  fontSize: 14,
  color: '#18392B',
},

hint: {
  fontSize: 11,
  color: '#89968E',
  marginTop: 9,
  marginBottom: 5,
},

  summaryAmount: {
    fontSize: width < 370 ? 16 : 19,
    fontWeight: '900',
    color: '#18392B',
    marginTop: 5,
  },

  // TRANSACTION COUNT
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

  // FILTERED HEADER
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

  // TRANSACTION CARD
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
    fontSize: width < 360 ? 12 : 13,
    fontWeight: '800',
    color: '#18392B',
    flexShrink: 1,
  },

  transactionMeta: {
    fontSize: 10,
    color: '#89968E',
    marginTop: 4,
    flexShrink: 1,
  },

  dateText: {
    fontSize: 10,
    color: '#A1ADA5',
    marginTop: 5,
  },

  amountSection: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    minWidth: 78,
    maxWidth: 112,
    flexShrink: 0,
  },

  amount: {
    fontSize: width < 360 ? 10 : 12,
    fontWeight: '900',
    flexShrink: 1,
    textAlign: 'right',
  },

  income: {
    color: '#159765',
  },

  expense: {
    color: '#E85C68',
  },

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

  // LOADING
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

  // EMPTY
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

  emptyResetButton: {
    backgroundColor: '#159765',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 18,
  },

  emptyResetText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // COMMON MODAL CLOSE
  modalClose: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#F0F5F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // FILTER MODAL
  filterModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.48)',
    justifyContent: 'flex-end',
  },

  filterModal: {
    width: '100%',
    maxHeight: '85%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingBottom: 30,
  },

  filterModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2EF',
    marginBottom: 12,
  },

  filterModalTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#18392B',
  },

  filterModalSubtitle: {
    fontSize: 11,
    color: '#89968E',
    marginTop: 5,
  },

  filterModalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#18392B',
    marginTop: 17,
    marginBottom: 12,
  },

  filterTypeRow: {
    flexDirection: 'row',
    gap: 9,
  },

  filterTypeButton: {
    flex: 1,
    height: 43,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E3ECE6',
    backgroundColor: '#FAFCFA',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
  },

  filterTypeActive: {
    backgroundColor: '#159765',
    borderColor: '#159765',
  },

  filterTypeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#52645A',
  },

  filterTypeTextActive: {
    color: '#FFFFFF',
  },

  filterCategoryList: {
    gap: 8,
    paddingBottom: 8,
  },

  filterCategoryItem: {
    minHeight: 55,
    paddingHorizontal: 12,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E9EFEB',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  filterCategoryActive: {
    backgroundColor: '#EAF7EF',
    borderColor: '#B8E5CA',
  },

  filterCategoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  filterCategoryIcon: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#F1F5F2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  filterCategoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#52645A',
    marginLeft: 11,
  },

  filterCategoryTextActive: {
    color: '#159765',
    fontWeight: '900',
  },

  filterCategoryRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  filterCategoryCount: {
    fontSize: 12,
    fontWeight: '800',
    color: '#89968E',
  },

  filterCheck: {
    width: 22,
    height: 22,
    borderRadius: 7,
    backgroundColor: '#159765',
    alignItems: 'center',
    justifyContent: 'center',
  },

  filterModalActions: {
    flexDirection: 'row',
    gap: 11,
    marginTop: 18,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEF2EF',
  },

  filterResetButton: {
    flex: 1,
    height: 48,
    borderRadius: 13,
    backgroundColor: '#EEF3EF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  filterResetText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#52645A',
  },

  filterApplyButton: {
    flex: 1.6,
    height: 48,
    borderRadius: 13,
    backgroundColor: '#159765',
    alignItems: 'center',
    justifyContent: 'center',
  },

  filterApplyText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // EDIT MODAL
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
