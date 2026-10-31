
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({

  // Main screen
  container: {
    flex: 1,
    backgroundColor: '#F5F8F6',
  },

headerWrapper: {
  width: '100%',
  paddingHorizontal: 0,
  paddingTop: 8,
  paddingBottom: 0,
  margin: 0,
  backgroundColor: '#F5F8F6',
     paddingVertical: Platform.OS === 'android' ? 10 : 8,
  zIndex: 2,
},
  animatedContent: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
  },

  loadingContainer: {
    paddingVertical: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    color: '#89968E',
    marginTop: 12,
    fontSize: 12,
  },

  // Balance Card
  balanceCard: {
    width: '100%',
    minHeight: 195,
    borderRadius: 26,
    backgroundColor: '#087C50',
    padding: 23,
    marginBottom: 22,
    overflow: 'hidden',
    elevation: 7,
    shadowColor: '#087C50',
    shadowOpacity: 0.20,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
  },

  balanceTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  balanceLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#E6FFF1',
  },

  balanceSubLabel: {
    fontSize: 11,
    color: '#C6EBDD',
    marginTop: 5,
  },

  eyeButton: {
    width: 39,
    height: 39,
    borderRadius: 13,
    backgroundColor: 'rgba(0,0,0,0.17)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  balanceAmount: {
    fontSize: width < 360 ? 29 : 36,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 19,
    letterSpacing: -1,
  },

  balanceBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 17,
  },

  balanceBottomText: {
    fontSize: 11,
    color: '#D8F9E7',
    fontWeight: '600',
  },

  balanceDecoration: {
    position: 'absolute',
    right: 15,
    bottom: 12,
    transform: [{ rotate: '-15deg' }],
  },

  // Income and Expense Summary
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 29,
  },

  summaryCard: {
    flex: 1,
    minWidth: 0,
    minHeight: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 21,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E9F0EB',
    elevation: 3,
    shadowColor: '#18392B',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  summaryCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  incomeIconBox: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#E5F7ED',
    justifyContent: 'center',
    alignItems: 'center',
  },

  expenseIconBox: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#FFF0F1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  summaryBadgeIncome: {
    fontSize: 8,
    fontWeight: '900',
    color: '#159765',
    backgroundColor: '#E5F7ED',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 7,
  },

  summaryBadgeExpense: {
    fontSize: 8,
    fontWeight: '900',
    color: '#EF6672',
    backgroundColor: '#FFF0F1',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 7,
  },

  summaryLabel: {
    fontSize: 11,
    color: '#89968E',
    marginBottom: 7,
    fontWeight: '600',
  },

  summaryAmount: {
    fontSize: 19,
    fontWeight: '900',
    color: '#18392B',
  },

  summaryBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 12,
  },

  summaryBottomIncome: {
    fontSize: 9,
    color: '#159765',
    fontWeight: '700',
  },

  summaryBottomExpense: {
    fontSize: 9,
    color: '#EF6672',
    fontWeight: '700',
  },

  // Section Headings
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#18392B',
  },

  sectionSubtitle: {
    fontSize: 10,
    color: '#89968E',
    marginTop: 4,
  },

  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 3,
    marginBottom: 30,
  },

  actionItem: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 15,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#EAF1EC',
    elevation: 2,
    shadowColor: '#18392B',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  incomeAction: {
    width: 49,
    height: 49,
    borderRadius: 16,
    backgroundColor: '#16B979',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#16B979',
    shadowOpacity: 0.2,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 3 },
  },

  expenseAction: {
    width: 49,
    height: 49,
    borderRadius: 16,
    backgroundColor: '#F2767D',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },

  analyticsAction: {
    width: 49,
    height: 49,
    borderRadius: 16,
    backgroundColor: '#4389E8',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },

  actionText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#18392B',
    marginTop: 10,
    textAlign: 'center',
  },

  actionDescription: {
    fontSize: 9,
    color: '#89968E',
    marginTop: 4,
    textAlign: 'center',
  },

  // See All
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  seeAllText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#159765',
  },

  // Recent Transactions Card
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 29,
    borderWidth: 1,
    borderColor: '#EAF1EC',
    elevation: 3,
    shadowColor: '#18392B',
    shadowOpacity: 0.04,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 3 },
  },

  transactionItem: {
    minHeight: 78,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F1',
    gap: 11,
    paddingVertical: 10,
  },

  lastTransaction: {
    borderBottomWidth: 0,
  },

  transactionIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  transactionDetails: {
    flex: 1,
    justifyContent: 'center',
    minWidth: 0,
  },

  transactionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#18392B',
    marginBottom: 5,
  },

  transactionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  transactionDate: {
    fontSize: 10,
    color: '#89968E',
  },

  transactionDescription: {
    fontSize: 10,
    color: '#A0AAA4',
    marginTop: 4,
  },

  transactionAmount: {
    fontSize: 12,
    fontWeight: '900',
    flexShrink: 0,
  },

  incomeAmount: {
    color: '#159765',
  },

  expenseAmount: {
    color: '#F16D76',
  },

  // Empty State
  emptyContainer: {
    minHeight: 220,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },

  emptyIcon: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: '#E5F7ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#18392B',
    marginBottom: 7,
  },

  emptyText: {
    fontSize: 11,
    color: '#89968E',
    textAlign: 'center',
    lineHeight: 18,
  },

  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: '#159765',
    paddingHorizontal: 17,
    paddingVertical: 11,
    borderRadius: 12,
    marginTop: 15,
  },

  emptyButtonText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // Monthly Budget
  budgetCaption: {
    fontSize: 10,
    color: '#89968E',
    fontWeight: '700',
  },

  budgetCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 19,
    borderWidth: 1,
    borderColor: '#EAF1EC',
    elevation: 3,
    shadowColor: '#18392B',
    shadowOpacity: 0.04,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 3 },
  },

  budgetTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 17,
  },

  budgetLabel: {
    fontSize: 11,
    color: '#89968E',
    marginBottom: 5,
  },

  budgetAmount: {
    fontSize: 21,
    fontWeight: '900',
    color: '#18392B',
  },

  budgetPercentage: {
    width: 53,
    height: 53,
    borderRadius: 17,
    backgroundColor: '#E5F7ED',
    justifyContent: 'center',
    alignItems: 'center',
  },

  budgetPercentageText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#159765',
  },

  progressTrack: {
    height: 10,
    borderRadius: 10,
    backgroundColor: '#EAF1EC',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#18B77A',
  },

  progressWarning: {
    backgroundColor: '#F16D76',
  },

  budgetBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 12,
  },

  budgetHint: {
    fontSize: 10,
    color: '#89968E',
  },

  bottomSpace: {
    height: 20,
  },

});
