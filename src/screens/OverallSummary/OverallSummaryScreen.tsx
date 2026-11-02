import React, {useCallback, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {
  ArrowLeft,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react-native';

import {getCurrentUser} from '../../storage/authStorage';
import {getTransactions} from '../../storage/transactionStorage';
import type {Transaction} from '../../types/transaction';
import {styles} from './OverallSummaryScreen.styles';

const PAGE_SIZE = 10;

// Convert transaction dates to YYYY-MM for month-wise grouping.
const getTransactionMonth = (dateValue: unknown): string => {
  const value = String(dateValue ?? '').trim();
  if (!value) {
    return '';
  }

  // ISO: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss
  const isoMatch = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (isoMatch) {
    const month = Number(isoMatch[2]);
    if (month >= 1 && month <= 12) {
      return `${isoMatch[1]}-${String(month).padStart(2, '0')}`;
    }
  }

  // Indian: DD/MM/YYYY or DD-MM-YYYY
  const indianMatch = value.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})/);
  if (indianMatch) {
    const month = Number(indianMatch[2]);
    if (month >= 1 && month <= 12) {
      return `${indianMatch[3]}-${String(month).padStart(2, '0')}`;
    }
  }

  // Fallback for date strings understood by JavaScript.
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(
      2,
      '0',
    )}`;
  }

  return '';
};

const formatMoney = (amount: number): string =>
  `₹${(Number.isFinite(amount) ? amount : 0).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
  })}`;

const getAmount = (value: unknown): number => {
  const amount = Number(
    String(value ?? 0).replace(/,/g, '').replace(/₹/g, '').trim(),
  );
  return Number.isFinite(amount) ? amount : 0;
};

export default function OverallSummaryScreen({navigation}: any) {
  const [items, setItems] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const currentUser = await getCurrentUser();
      if (!currentUser) {
        setItems([]);
        setCurrentPage(1);
        navigation.reset({index: 0, routes: [{name: 'Login'}]});
        return;
      }

      // Transaction storage is keyed by the user's normalized mobile number.
      const userMobile = String(currentUser).replace(/\D/g, '').slice(-10);
      if (!/^[6-9]\d{9}$/.test(userMobile)) {
        throw new Error('Valid mobile number not found. Please login again.');
      }

      const data = await getTransactions(userMobile);
      setItems(Array.isArray(data) ? data : []);
      setCurrentPage(1);
    } catch (error: any) {
      console.log('Overall summary loading error:', error);
      setItems([]);
      setCurrentPage(1);
      Alert.alert(
        'Unable to load summary',
        error?.message || 'Please try again.',
      );
    } finally {
      setLoading(false);
    }
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  const summary = useMemo(() => {
    const totals = items.reduce(
      (acc, item) => {
        const amount = getAmount(item.amount);
        const type = String(item.type ?? '').trim().toLowerCase();

        if (type === 'income') {
          acc.income += amount;
        }
        if (type === 'expense') {
          acc.expense += amount;
        }
        return acc;
      },
      {income: 0, expense: 0},
    );

    const monthMap: Record<
      string,
      {income: number; expense: number; count: number}
    > = {};

    items.forEach(item => {
      const key = getTransactionMonth((item as any).date);
      if (!key) {
        return;
      }

      if (!monthMap[key]) {
        monthMap[key] = {income: 0, expense: 0, count: 0};
      }

      const amount = getAmount(item.amount);
      const type = String(item.type ?? '').trim().toLowerCase();

      if (type === 'income') {
        monthMap[key].income += amount;
      }
      if (type === 'expense') {
        monthMap[key].expense += amount;
      }
      monthMap[key].count += 1;
    });

    const months = Object.entries(monthMap)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([key, values]) => {
        const [year, month] = key.split('-').map(Number);

        return {
          key,
          label: new Date(year, month - 1, 1).toLocaleDateString('en-IN', {
            month: 'long',
            year: 'numeric',
          }),
          ...values,
          saving: values.income - values.expense,
        };
      });

    return {...totals, months};
  }, [items]);

  const totalPages = Math.max(1, Math.ceil(summary.months.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  const visibleMonths = useMemo(() => {
    const startIndex = (safePage - 1) * PAGE_SIZE;
    return summary.months.slice(startIndex, startIndex + PAGE_SIZE);
  }, [summary.months, safePage]);

  const goToPreviousPage = () => {
    setCurrentPage(page => Math.max(1, page - 1));
  };

  const goToNextPage = () => {
    setCurrentPage(page => Math.min(totalPages, page + 1));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F8F5" />

      {/* CENTERED HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerSideButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.75}>
          <ArrowLeft size={21} color="#18392B" />
        </TouchableOpacity>

        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle}>Overall Summary</Text>
          <Text style={styles.headerSubtitle}>
            Your complete money overview
          </Text>
        </View>

        {/* Equal-width right spacer keeps title exactly centered. */}
        <View style={styles.headerSidePlaceholder} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#159765" />
          <Text style={styles.loadingText}>Loading summary...</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.sectionHeading}>
            <View style={styles.sectionHeadingText}>
              <Text style={styles.sectionTitle}>All-time totals</Text>
              <Text style={styles.sectionSubtitle}>
                Income and expenses from every month
              </Text>
            </View>
            <View style={styles.headingIcon}>
              <Wallet size={21} color="#159765" />
            </View>
          </View>

          <View style={styles.totalCardsRow}>
            <View style={styles.incomeCard}>
              <View style={styles.cardTop}>
                <View style={styles.incomeIcon}>
                  <TrendingUp size={20} color="#159765" />
                </View>
                <Text style={styles.incomeTag}>TOTAL INCOME</Text>
              </View>
              <Text style={styles.cardLabel}>All-time Income</Text>
              <Text
                style={styles.incomeAmount}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}>
                {formatMoney(summary.income)}
              </Text>
            </View>

            <View style={styles.expenseCard}>
              <View style={styles.cardTop}>
                <View style={styles.expenseIcon}>
                  <TrendingDown size={20} color="#E85C68" />
                </View>
                <Text style={styles.expenseTag}>TOTAL EXPENSE</Text>
              </View>
              <Text style={styles.cardLabel}>All-time Expense</Text>
              <Text
                style={styles.expenseAmount}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}>
                {formatMoney(summary.expense)}
              </Text>
            </View>
          </View>

          <View style={styles.monthSectionHeader}>
            <View style={styles.monthHeadingText}>
              <Text style={styles.sectionTitle}>Month-wise totals</Text>
              <Text style={styles.sectionSubtitle}>
                Income, expense and savings for each month
              </Text>
            </View>
            <Text style={styles.monthCount}>
              {summary.months.length} months
            </Text>
          </View>

          <View style={styles.monthListCard}>
            {summary.months.length === 0 ? (
              <Text style={styles.emptyText}>
                {items.length === 0
                  ? 'No transactions found. Add income or expense first.'
                  : 'Transactions found, but their date format could not be read.'}
              </Text>
            ) : (
              <>
                {visibleMonths.map(month => (
                  <View key={month.key} style={styles.monthRow}>
                    <View style={styles.monthTopRow}>
                      <View style={styles.monthNameWrap}>
                        <Text style={styles.monthName}>{month.label}</Text>
                        <Text style={styles.transactionCount}>
                          {month.count} transactions
                        </Text>
                      </View>

                      <View style={styles.savingWrap}>
                        <Text style={styles.savingLabel}>Saving</Text>
                        <Text
                          style={[
                            styles.savingValue,
                            month.saving < 0 && styles.negativeSaving,
                          ]}>
                          {formatMoney(month.saving)}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.monthAmountsRow}>
                      <View style={styles.monthAmountBox}>
                        <Text style={styles.amountLabel}>Income</Text>
                        <Text
                          style={styles.monthIncome}
                          numberOfLines={1}
                          adjustsFontSizeToFit>
                          {formatMoney(month.income)}
                        </Text>
                      </View>

                      <View style={styles.monthAmountBox}>
                        <Text style={styles.amountLabel}>Expense</Text>
                        <Text
                          style={styles.monthExpense}
                          numberOfLines={1}
                          adjustsFontSizeToFit>
                          {formatMoney(month.expense)}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}

                {/* PAGINATION: 10 MONTHS PER PAGE */}
                {summary.months.length > PAGE_SIZE && (
                  <View style={styles.pagination}>
                    <TouchableOpacity
                      style={[
                        styles.pageButton,
                        safePage === 1 && styles.pageButtonDisabled,
                      ]}
                      onPress={goToPreviousPage}
                      disabled={safePage === 1}
                      activeOpacity={0.75}>
                      <Text
                        style={[
                          styles.pageButtonText,
                          safePage === 1 && styles.pageButtonTextDisabled,
                        ]}>
                        Previous
                      </Text>
                    </TouchableOpacity>

                    <Text style={styles.pageInfo}>
                      Page {safePage} of {totalPages}
                    </Text>

                    <TouchableOpacity
                      style={[
                        styles.pageButton,
                        safePage === totalPages && styles.pageButtonDisabled,
                      ]}
                      onPress={goToNextPage}
                      disabled={safePage === totalPages}
                      activeOpacity={0.75}>
                      <Text
                        style={[
                          styles.pageButtonText,
                          safePage === totalPages &&
                            styles.pageButtonTextDisabled,
                        ]}>
                        Next
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                <Text style={styles.paginationCaption}>
                  Showing {(safePage - 1) * PAGE_SIZE + 1}–
                  {Math.min(safePage * PAGE_SIZE, summary.months.length)} of{' '}
                  {summary.months.length} months
                </Text>
              </>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
