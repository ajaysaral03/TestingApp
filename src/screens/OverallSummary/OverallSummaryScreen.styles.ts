import {StyleSheet, Dimensions} from 'react-native';

const compact = Dimensions.get('window').width < 370;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F8F5',
  },

  // HEADER: left back button, centered title, equal right spacer
  header: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 10,
    marginTop:45,
    paddingBottom: 10,
  },
  headerSideButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#18392B',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  headerSidePlaceholder: {
    width: 42,
    height: 42,
  },
  headerTextWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  headerTitle: {
    color: '#18392B',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  headerSubtitle: {
    color: '#89968E',
    fontSize: 11,
    marginTop: 3,
    textAlign: 'center',
  },

  // CONTENT
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#89968E',
    fontSize: 12,
    marginTop: 12,
  },

  // SECTION HEADINGS
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },
  sectionHeadingText: {
    flex: 1,
    paddingRight: 10,
  },
  sectionTitle: {
    color: '#18392B',
    fontSize: 16,
    fontWeight: '900',
  },
  sectionSubtitle: {
    color: '#89968E',
    fontSize: 10,
    marginTop: 4,
  },
  headingIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#E5F7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ALL-TIME TOTAL CARDS
  totalCardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 25,
  },
  incomeCard: {
    flex: 1,
    minWidth: 0,
    borderRadius: 17,
    padding: compact ? 11 : 14,
    backgroundColor: '#E8F7EE',
    elevation: 2,
  },
  expenseCard: {
    flex: 1,
    minWidth: 0,
    borderRadius: 17,
    padding: compact ? 11 : 14,
    backgroundColor: '#FFF0F1',
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  incomeIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expenseIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  incomeTag: {
    color: '#159765',
    fontSize: 8,
    fontWeight: '900',
  },
  expenseTag: {
    color: '#E85C68',
    fontSize: 8,
    fontWeight: '900',
  },
  cardLabel: {
    color: '#66766D',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 13,
  },
  incomeAmount: {
    color: '#159765',
    fontSize: compact ? 14 : 17,
    fontWeight: '900',
    marginTop: 6,
  },
  expenseAmount: {
    color: '#E85C68',
    fontSize: compact ? 14 : 17,
    fontWeight: '900',
    marginTop: 6,
  },

  // MONTH-WISE SECTION
  monthSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  monthHeadingText: {
    flex: 1,
    paddingRight: 6,
  },
  monthCount: {
    color: '#159765',
    backgroundColor: '#E8F7EE',
    fontSize: 9,
    fontWeight: '800',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 9,
    overflow: 'hidden',
  },
  monthListCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    paddingHorizontal: 14,
    elevation: 2,
    shadowColor: '#18392B',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  emptyText: {
    color: '#89968E',
    fontSize: 11,
    paddingVertical: 22,
    textAlign: 'center',
    lineHeight: 18,
  },
  monthRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2EF',
  },
  monthTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  monthNameWrap: {
    flex: 1,
    minWidth: 0,
  },
  monthName: {
    color: '#18392B',
    fontSize: 13,
    fontWeight: '900',
  },
  transactionCount: {
    color: '#89968E',
    fontSize: 9,
    marginTop: 4,
  },
  savingWrap: {
    alignItems: 'flex-end',
  },
  savingLabel: {
    color: '#89968E',
    fontSize: 9,
  },
  savingValue: {
    color: '#159765',
    fontSize: 12,
    fontWeight: '900',
    marginTop: 3,
  },
  negativeSaving: {
    color: '#E85C68',
  },
  monthAmountsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  monthAmountBox: {
    flex: 1,
    minWidth: 0,
    backgroundColor: '#F7FAF8',
    borderRadius: 11,
    padding: 10,
  },
  amountLabel: {
    color: '#89968E',
    fontSize: 9,
    fontWeight: '600',
  },
  monthIncome: {
    color: '#159765',
    fontSize: 12,
    fontWeight: '900',
    marginTop: 4,
  },
  monthExpense: {
    color: '#E85C68',
    fontSize: 12,
    fontWeight: '900',
    marginTop: 4,
  },

  // PAGINATION
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 14,
    paddingBottom: 8,
    gap: 8,
  },
  pageButton: {
    minWidth: 82,
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#E8F7EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageButtonDisabled: {
    backgroundColor: '#F1F4F2',
  },
  pageButtonText: {
    color: '#159765',
    fontSize: 11,
    fontWeight: '800',
  },
  pageButtonTextDisabled: {
    color: '#AAB4AE',
  },
  pageInfo: {
    flex: 1,
    textAlign: 'center',
    color: '#52645A',
    fontSize: 11,
    fontWeight: '800',
  },
  paginationCaption: {
    color: '#89968E',
    textAlign: 'center',
    fontSize: 9,
    paddingBottom: 13,
  },
});
