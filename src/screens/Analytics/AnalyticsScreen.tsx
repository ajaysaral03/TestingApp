
import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Circle } from 'react-native-svg';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  ChartPie,
  Wallet,
  ReceiptText,
  RefreshCw,
} from 'lucide-react-native';

import type { Transaction } from '../../types/transaction';
import type { RootStackParamList } from '../../navigation/types';
import { getTransactions } from '../../services/transactionService';
import SweetAlert from '../../components/SweetAlert/SweetAlert';
import { styles } from './AnalyticsScreen.styles';

type AlertType = 'success' | 'error' | 'warning' | 'info';

const formatAmount = (amount: number) => {
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  return `₹${safeAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
};

const getValidAmount = (amount: unknown): number => {
  const value = Number(String(amount ?? '').replace(/[₹,\s]/g, ''));
  return Number.isFinite(value) ? value : 0;
};

const getMonthKey = (value: unknown): string | null => {
  if (!value) return null;

  const raw = String(value).trim();

  // ISO date: YYYY-MM-DD
  const iso = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);

  if (iso) {
    return `${iso[1]}-${String(iso[2]).padStart(2, '0')}`;
  }

  // Indian date: DD/MM/YYYY or DD-MM-YYYY
  const indian = raw.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})/);

  if (indian) {
    const month = Number(indian[2]);

    if (month >= 1 && month <= 12) {
      return `${indian[3]}-${String(month).padStart(2, '0')}`;
    }
  }

  const parsed = new Date(raw);

  if (!Number.isNaN(parsed.getTime())) {
    return `${parsed.getFullYear()}-${String(
      parsed.getMonth() + 1,
    ).padStart(2, '0')}`;
  }

  return null;
};

const categoryColors = [
  '#159765',
  '#4389E8',
  '#F16D76',
  '#9271E9',
  '#E6A23C',
  '#36A9B5',
  '#D66BA0',
  '#778899',
  '#D18B45',
  '#5A9DAD',
  '#A46DB8',
  '#8A9A65',
];

const AnalyticsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedMonth, setSelectedMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  const [alertData, setAlertData] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'info' as AlertType,
  });

  const showSweetAlert = useCallback(
    (title: string, message: string, type: AlertType = 'info') => {
      setAlertData({
        visible: true,
        title,
        message,
        type,
      });
    },
    [],
  );

  // Load transactions
  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getTransactions();

      setTransactions(Array.isArray(data) ? data : []);
    } catch (error: unknown) {
      console.error('Analytics loading error:', error);

      setTransactions([]);

      showSweetAlert(
        'Unable to Load Data',
        error instanceof Error
          ? error.message
          : 'Unable to load saved transactions.',
        'error',
      );
    } finally {
      setLoading(false);
    }
  }, [showSweetAlert]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  // Selected month
  const selectedMonthKey = `${selectedMonth.getFullYear()}-${String(
    selectedMonth.getMonth() + 1,
  ).padStart(2, '0')}`;

  const selectedMonthLabel = selectedMonth.toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  });

  // Filter transactions by selected month
  const monthlyTransactions = useMemo(
    () =>
      transactions.filter(
        item => getMonthKey(item.date) === selectedMonthKey,
      ),
    [transactions, selectedMonthKey],
  );

  // Monthly income, expense and balance
  const summary = useMemo(() => {
    const income = monthlyTransactions
      .filter(item => String(item.type).toLowerCase() === 'income')
      .reduce(
        (sum, item) => sum + getValidAmount(item.amount),
        0,
      );

    const expenses = monthlyTransactions
      .filter(item => String(item.type).toLowerCase() === 'expense')
      .reduce(
        (sum, item) => sum + getValidAmount(item.amount),
        0,
      );

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [monthlyTransactions]);

  // Monthly category-wise expenses
  const categoryData = useMemo(() => {
    const totals: Record<string, number> = {};

    monthlyTransactions
      .filter(item => String(item.type).toLowerCase() === 'expense')
      .forEach(item => {
        const category = item.category?.trim() || 'Other';
        const amount = getValidAmount(item.amount);

        if (amount > 0) {
          totals[category] = (totals[category] || 0) + amount;
        }
      });

    return Object.entries(totals)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage:
          summary.expenses > 0
            ? (amount / summary.expenses) * 100
            : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [monthlyTransactions, summary.expenses]);

  // Donut chart
  const chartRadius = 70;
  const chartCircumference = 2 * Math.PI * chartRadius;

  const chartSegments = useMemo(() => {
    if (summary.expenses <= 0) return [];

    let currentOffset = 0;

    return categoryData.map((item, index) => {
      const segmentLength =
        (item.amount / summary.expenses) * chartCircumference;

      const segment = {
        ...item,
        color: categoryColors[index % categoryColors.length],
        dashArray: `${segmentLength} ${
          chartCircumference - segmentLength
        }`,
        dashOffset: -currentOffset,
      };

      currentOffset += segmentLength;

      return segment;
    });
  }, [categoryData, summary.expenses, chartCircumference]);

  const highestCategory = categoryData[0];

  // Change selected month
  const changeMonth = (direction: number) => {
    setSelectedMonth(current =>
      new Date(
        current.getFullYear(),
        current.getMonth() + direction,
        1,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#F3F8F5"
        barStyle="dark-content"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={21} color="#18392B" />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.title}>Analytics</Text>
          <Text style={styles.subtitle}>
            Monthly financial overview
          </Text>
        </View>

        <TouchableOpacity
          style={styles.refreshButton}
          activeOpacity={0.7}
          onPress={loadData}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#159765" />
          ) : (
            <RefreshCw size={19} color="#159765" />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.mainScroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* MONTH SELECTOR */}
        <View style={styles.monthSelector}>
          <TouchableOpacity
            style={styles.monthArrow}
            onPress={() => changeMonth(-1)}
            activeOpacity={0.7}
          >
            <ChevronLeft size={21} color="#176744" />
          </TouchableOpacity>

          <View style={styles.monthTextWrap}>
            <Text style={styles.monthCaption}>
              SELECTED MONTH
            </Text>

            <Text style={styles.monthTitle}>
              {selectedMonthLabel}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.monthArrow}
            onPress={() => changeMonth(1)}
            activeOpacity={0.7}
          >
            <ChevronRight size={21} color="#176744" />
          </TouchableOpacity>
        </View>

        {/* MONTHLY BALANCE */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <View style={styles.balanceTextWrap}>
              <Text style={styles.summaryLabel}>
                MONTHLY BALANCE
              </Text>

              <Text style={styles.balance}>
                {formatAmount(summary.balance)}
              </Text>

              <Text style={styles.balanceCaption}>
                Savings for {selectedMonthLabel}
              </Text>
            </View>

            <View style={styles.walletIcon}>
              <Wallet size={27} color="#FFFFFF" />
            </View>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <View style={styles.incomeIcon}>
                <TrendingUp size={17} color="#9BFFD0" />
              </View>

              <Text style={styles.summarySmall}>
                Monthly Income
              </Text>

              <Text style={styles.summaryValue}>
                {formatAmount(summary.income)}
              </Text>
            </View>

            <View style={styles.verticalLine} />

            <View style={styles.summaryItem}>
              <View style={styles.expenseIcon}>
                <TrendingDown size={17} color="#FFD4D4" />
              </View>

              <Text style={styles.summarySmall}>
                Monthly Expense
              </Text>

              <Text style={styles.summaryValue}>
                {formatAmount(summary.expenses)}
              </Text>
            </View>
          </View>
        </View>

        {/* EXPENSE STATISTICS */}
        <View style={styles.sectionHeading}>
          <View style={styles.sectionIcon}>
            <ChartPie size={20} color="#159765" />
          </View>

          <View>
            <Text style={styles.sectionTitle}>
              Expense Statistics
            </Text>

            <Text style={styles.sectionSubtitle}>
              Category-wise spending in {selectedMonthLabel}
            </Text>
          </View>
        </View>

        {/* DONUT CHART */}
        <View style={styles.graphCard}>
          <View style={styles.graphHeader}>
            <View style={styles.graphHeaderText}>
              <Text style={styles.graphTitle}>
                Spending Analysis
              </Text>

              <Text style={styles.graphSubtitle}>
                Monthly expense distribution
              </Text>
            </View>

            <View style={styles.graphBadge}>
              <Text style={styles.graphBadgeText}>
                MONTHLY
              </Text>
            </View>
          </View>

          <View style={styles.graphDivider} />

          {loading ? (
            <View style={styles.empty}>
              <ActivityIndicator
                size="large"
                color="#159765"
              />

              <Text style={styles.emptyText}>
                Loading your chart...
              </Text>
            </View>
          ) : chartSegments.length === 0 ? (
            <View style={styles.empty}>
              <View style={styles.emptyIcon}>
                <ReceiptText size={30} color="#159765" />
              </View>

              <Text style={styles.emptyTitle}>
                No expense data for this month
              </Text>

              <Text style={styles.emptyText}>
                Add an expense in {selectedMonthLabel} to see
                the monthly chart.
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.graphTotal}>
                <Text style={styles.graphTotalLabel}>
                  Total Spending
                </Text>

                <Text style={styles.graphTotalAmount}>
                  {formatAmount(summary.expenses)}
                </Text>
              </View>

              <View style={styles.donutContainer}>
                <Svg
                  width={220}
                  height={220}
                  viewBox="0 0 200 200"
                >
                  <Circle
                    cx="100"
                    cy="100"
                    r={chartRadius}
                    stroke="#EDF3EF"
                    strokeWidth="26"
                    fill="none"
                  />

                  {chartSegments.map(segment => (
                    <Circle
                      key={segment.category}
                      cx="100"
                      cy="100"
                      r={chartRadius}
                      fill="none"
                      stroke={segment.color}
                      strokeWidth="26"
                      strokeDasharray={segment.dashArray}
                      strokeDashoffset={segment.dashOffset}
                      strokeLinecap="butt"
                      transform="rotate(-90 100 100)"
                    />
                  ))}
                </Svg>

                <View style={styles.donutCenter}>
                  <Text style={styles.donutCenterLabel}>
                    MONTHLY EXPENSE
                  </Text>

                  <Text style={styles.donutCenterAmount}>
                    {formatAmount(summary.expenses)}
                  </Text>

                  <Text style={styles.donutCenterCaption}>
                    {categoryData.length} Categories
                  </Text>
                </View>
              </View>

              <Text style={styles.graphHint}>
                Spending breakdown for {selectedMonthLabel}
              </Text>
            </>
          )}
        </View>

        {/* CATEGORY BREAKDOWN */}
        <View style={styles.sectionHeading}>
          <View style={styles.sectionIcon}>
            <ChartPie size={19} color="#159765" />
          </View>

          <View>
            <Text style={styles.sectionTitle}>
              Category Breakdown
            </Text>

            <Text style={styles.sectionSubtitle}>
              Monthly expense details
            </Text>
          </View>
        </View>

        <View style={styles.chartCard}>
          {loading ? (
            <View style={styles.empty}>
              <ActivityIndicator color="#159765" />

              <Text style={styles.emptyText}>
                Loading categories...
              </Text>
            </View>
          ) : categoryData.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>
                No categories available
              </Text>

              <Text style={styles.emptyText}>
                Category details for {selectedMonthLabel}
                will appear here.
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.totalHeader}>
                <Text style={styles.totalLabel}>
                  Total Monthly Expenses
                </Text>

                <Text style={styles.totalAmount}>
                  {formatAmount(summary.expenses)}
                </Text>
              </View>

              {chartSegments.map(segment => (
                <View
                  key={segment.category}
                  style={styles.categoryBlock}
                >
                  <View style={styles.legendRow}>
                    <View style={styles.legendLeft}>
                      <View
                        style={[
                          styles.colorDot,
                          { backgroundColor: segment.color },
                        ]}
                      />

                      <Text style={styles.categoryName}>
                        {segment.category}
                      </Text>
                    </View>

                    <View style={styles.legendRight}>
                      <Text style={styles.categoryAmount}>
                        {formatAmount(segment.amount)}
                      </Text>

                      <Text style={styles.percentage}>
                        {segment.percentage.toFixed(1)}%
                      </Text>
                    </View>
                  </View>

                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${Math.min(
                            segment.percentage,
                            100,
                          )}%`,
                          backgroundColor: segment.color,
                        },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </>
          )}
        </View>

        {/* SPENDING INSIGHT */}
        <View style={styles.noteCard}>
          <View style={styles.insightIcon}>
            <TrendingUp size={20} color="#087C50" />
          </View>

          <View style={styles.insightContent}>
            <Text style={styles.noteTitle}>
              Spending Insight
            </Text>

            <Text style={styles.noteText}>
              {loading
                ? 'Calculating your monthly spending insights...'
                : highestCategory
                  ? `${highestCategory.category} is your highest expense category in ${selectedMonthLabel}. You spent ${formatAmount(highestCategory.amount)} (${highestCategory.percentage.toFixed(1)}% of monthly expenses) in this category.`
                  : `Your spending insights for ${selectedMonthLabel} will appear after adding expenses.`}
            </Text>
          </View>
        </View>

        <Text style={styles.footerText}>
          Showing transactions for {selectedMonthLabel} only.
        </Text>
      </ScrollView>

      <SweetAlert
        visible={alertData.visible}
        title={alertData.title}
        message={alertData.message}
        type={alertData.type}
        confirmText="OK"
        onConfirm={() =>
          setAlertData(prev => ({
            ...prev,
            visible: false,
          }))
        }
        onCancel={() =>
          setAlertData(prev => ({
            ...prev,
            visible: false,
          }))
        }
      />
    </SafeAreaView>
  );
};

export default AnalyticsScreen;
