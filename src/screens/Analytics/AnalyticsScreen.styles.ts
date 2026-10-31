import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F8F5',
  },

  // Fixed Header
  header: {
    height: 90,
    marginTop: 30,
    marginHorizontal: 20,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  mainScroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 45,
  },

  backButton: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    zIndex: 2,
  },

  headerText: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
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
    fontSize: 12,
    color: '#84958A',
    marginTop: 3,
    textAlign: 'center',
  },

  refreshButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#E5F5EC',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },

  // Balance Summary
  summaryCard: {
    backgroundColor: '#126D4A',
    borderRadius: 23,
    padding: 21,
    marginBottom: 29,
    elevation: 5,
  },

  summaryTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  summaryLabel: {
    color: '#C5E9D7',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },

  balance: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 8,
  },

  balanceCaption: {
    color: '#C5E9D7',
    fontSize: 11,
    marginTop: 4,
  },

  walletIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: '#FFFFFF25',
    alignItems: 'center',
    justifyContent: 'center',
  },

  summaryDivider: {
    height: 1,
    backgroundColor: '#FFFFFF35',
    marginVertical: 20,
  },

  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  summaryItem: {
    flex: 1,
  },

  incomeIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#FFFFFF20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  expenseIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#FFFFFF20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  summarySmall: {
    color: '#C5E9D7',
    fontSize: 11,
    marginBottom: 5,
  },

  summaryValue: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  verticalLine: {
    width: 1,
    height: 60,
    backgroundColor: '#FFFFFF35',
    marginHorizontal: 15,
  },

  // Section Heading
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 3,
  },

  sectionIcon: {
    width: 41,
    height: 41,
    borderRadius: 13,
    backgroundColor: '#E2F4E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#18392B',
  },

  sectionSubtitle: {
    color: '#8A9A90',
    fontSize: 11,
    marginTop: 3,
  },

  // Graph Card
  graphCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 17,
    marginBottom: 27,
    borderWidth: 1,
    borderColor: '#E7EFE9',
    elevation: 3,
  },

  graphHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  graphTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#18392B',
  },

  graphSubtitle: {
    fontSize: 11,
    color: '#8A9A90',
    marginTop: 4,
  },

  graphBadge: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 9,
    backgroundColor: '#E8F6ED',
  },

  graphBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#159765',
    letterSpacing: 0.7,
  },

  graphDivider: {
    height: 1,
    backgroundColor: '#EDF2EE',
    marginVertical: 17,
  },

  graphTotal: {
    alignItems: 'center',
    marginBottom: 10,
  },

  graphTotalLabel: {
    fontSize: 11,
    color: '#829188',
  },

  graphTotalAmount: {
    fontSize: 24,
    fontWeight: '800',
    color: '#18392B',
    marginTop: 4,
  },

  graphHint: {
    fontSize: 10,
    color: '#98A69D',
    textAlign: 'center',
    marginTop: 13,
  },

  // Donut Chart
  donutContainer: {
    width: 220,
    height: 220,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },

  donutCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  donutCenterLabel: {
    fontSize: 10,
    color: '#8A9A90',
    fontWeight: '700',
    letterSpacing: 1,
  },

  donutCenterAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: '#18392B',
    marginTop: 6,
  },

  donutCenterCaption: {
    fontSize: 10,
    color: '#89978F',
    marginTop: 4,
  },

  // Category Breakdown
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 21,
    padding: 18,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E8EFEA',
    elevation: 2,
  },

  totalHeader: {
    marginBottom: 18,
  },

  totalLabel: {
    color: '#89978F',
    fontSize: 11,
  },

  totalAmount: {
    color: '#18392B',
    fontSize: 23,
    fontWeight: '800',
    marginTop: 5,
  },

  categoryBlock: {
    marginBottom: 19,
  },

  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  legendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  legendRight: {
    alignItems: 'flex-end',
  },

  colorDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    marginRight: 9,
  },

  categoryName: {
    color: '#31483B',
    fontSize: 13,
    fontWeight: '700',
  },

  categoryAmount: {
    color: '#18392B',
    fontSize: 13,
    fontWeight: '800',
  },

  progressTrack: {
    height: 9,
    backgroundColor: '#EDF3EF',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 10,
  },

  percentage: {
    fontSize: 10,
    color: '#94A198',
    marginTop: 5,
  },

  // Empty State
  empty: {
    minHeight: 170,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  emptyIcon: {
    width: 65,
    height: 65,
    borderRadius: 22,
    backgroundColor: '#E7F5EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },

  emptyTitle: {
    color: '#18392B',
    fontSize: 15,
    fontWeight: '800',
    marginTop: 10,
    textAlign: 'center',
  },

  emptyText: {
    color: '#89978F',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 7,
  },

  // Spending Insight
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#E8F5EC',
    borderRadius: 18,
    padding: 17,
    marginBottom: 22,
  },

  insightIcon: {
    width: 37,
    height: 37,
    borderRadius: 12,
    backgroundColor: '#D1EEDC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  insightContent: {
    flex: 1,
  },

  noteTitle: {
    color: '#176744',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
  },

  noteText: {
    color: '#557365',
    fontSize: 11,
    lineHeight: 18,
  },

  // Footer
  footerText: {
    color: '#A0ACA4',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
  },
});