
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const compact = width < 360;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F8F5',
  },

  header: {
    height: 82,
    marginTop: 35,
    marginHorizontal: 18,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  mainScroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 38,
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
    left: 48,
    right: 48,
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
    fontSize: 11,
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

  // Month Selector
  monthSelector: {
    minHeight: 72,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E6EFE9',
    elevation: 2,
  },

  monthArrow: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#E8F6ED',
    alignItems: 'center',
    justifyContent: 'center',
  },

  monthTextWrap: {
    flex: 1,
    alignItems: 'center',
  },

  monthCaption: {
    color: '#8A9A90',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },

  monthTitle: {
    color: '#18392B',
    fontSize: 17,
    fontWeight: '900',
    marginTop: 4,
  },

  // Monthly Summary
  summaryCard: {
    backgroundColor: '#126D4A',
    borderRadius: 23,
    padding: 20,
    marginBottom: 25,
    elevation: 5,
  },

  summaryTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  balanceTextWrap: {
    flex: 1,
    paddingRight: 8,
  },

  summaryLabel: {
    color: '#C5E9D7',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },

  balance: {
    color: '#FFFFFF',
    fontSize: compact ? 25 : 30,
    fontWeight: '900',
    marginTop: 8,
  },

  balanceCaption: {
    color: '#C5E9D7',
    fontSize: 11,
    marginTop: 4,
  },

  walletIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: '#FFFFFF25',
    alignItems: 'center',
    justifyContent: 'center',
  },

  summaryDivider: {
    height: 1,
    backgroundColor: '#FFFFFF35',
    marginVertical: 18,
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
    fontSize: 10,
    marginBottom: 5,
  },

  summaryValue: {
    color: '#FFFFFF',
    fontSize: compact ? 14 : 17,
    fontWeight: '800',
  },

  verticalLine: {
    width: 1,
    height: 58,
    backgroundColor: '#FFFFFF35',
    marginHorizontal: 13,
  },

  // Section Heading
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 3,
  },

  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#E2F4E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#18392B',
  },

  sectionSubtitle: {
    color: '#8A9A90',
    fontSize: 10,
    marginTop: 3,
  },

  // Graph Card
  graphCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E7EFE9',
    elevation: 3,
  },

  graphHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  graphHeaderText: {
    flex: 1,
    paddingRight: 8,
  },

  graphTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#18392B',
  },

  graphSubtitle: {
    fontSize: 10,
    color: '#8A9A90',
    marginTop: 4,
  },

  graphBadge: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 9,
    backgroundColor: '#E8F6ED',
  },

  graphBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#159765',
    letterSpacing: 0.6,
  },

  graphDivider: {
    height: 1,
    backgroundColor: '#EDF2EE',
    marginVertical: 15,
  },

  graphTotal: {
    alignItems: 'center',
    marginBottom: 7,
  },

  graphTotalLabel: {
    fontSize: 10,
    color: '#829188',
  },

  graphTotalAmount: {
    fontSize: 23,
    fontWeight: '900',
    color: '#18392B',
    marginTop: 4,
  },

  graphHint: {
    fontSize: 10,
    color: '#98A69D',
    textAlign: 'center',
    marginTop: 9,
  },

  // Donut Chart
  donutContainer: {
    width: 220,
    height: 220,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
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
    fontSize: 9,
    color: '#8A9A90',
    fontWeight: '800',
    letterSpacing: 0.7,
  },

  donutCenterAmount: {
    fontSize: compact ? 17 : 20,
    fontWeight: '900',
    color: '#18392B',
    marginTop: 5,
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
    padding: 17,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#E8EFEA',
    elevation: 2,
  },

  totalHeader: {
    marginBottom: 17,
  },

  totalLabel: {
    color: '#89978F',
    fontSize: 10,
  },

  totalAmount: {
    color: '#18392B',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 5,
  },

  categoryBlock: {
    marginBottom: 18,
  },

  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 9,
  },

  legendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 8,
  },

  legendRight: {
    alignItems: 'flex-end',
  },

  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 9,
  },

  categoryName: {
    color: '#31483B',
    fontSize: 12,
    fontWeight: '700',
  },

  categoryAmount: {
    color: '#18392B',
    fontSize: 12,
    fontWeight: '900',
  },

  progressTrack: {
    height: 8,
    backgroundColor: '#EDF3EF',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 10,
  },

  percentage: {
    fontSize: 9,
    color: '#94A198',
    marginTop: 4,
  },

  // Empty State
  empty: {
    minHeight: 165,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },

  emptyIcon: {
    width: 62,
    height: 62,
    borderRadius: 21,
    backgroundColor: '#E7F5EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  emptyTitle: {
    color: '#18392B',
    fontSize: 14,
    fontWeight: '900',
    marginTop: 8,
    textAlign: 'center',
  },

  emptyText: {
    color: '#89978F',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 17,
    marginTop: 6,
  },

  // Spending Insight
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#E8F5EC',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
  },

  insightIcon: {
    width: 37,
    height: 37,
    borderRadius: 12,
    backgroundColor: '#D1EEDC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  insightContent: {
    flex: 1,
  },

  noteTitle: {
    color: '#176744',
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 5,
  },

  noteText: {
    color: '#557365',
    fontSize: 10,
    lineHeight: 17,
  },

  footerText: {
    color: '#A0ACA4',
    fontSize: 9,
    textAlign: 'center',
    marginTop: 3,
  },
});
