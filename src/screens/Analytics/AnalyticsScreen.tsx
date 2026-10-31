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

// Currency formatting
const formatAmount = (amount: number) => {
  const safeAmount = Number.isFinite(amount) ? amount : 0;

  return `₹${safeAmount.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
  })}`;
};

// Validate amount
const getValidAmount = (amount: unknown): number => {
  const value = Number(amount);

  return Number.isFinite(value) ? value : 0;
};

// Category colors
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

  const [alertData, setAlertData] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'info' as AlertType,
  });

  // SweetAlert
  const showSweetAlert = useCallback(
    (
      title: string,
      message: string,
      type: AlertType = 'info',
    ) => {
      setAlertData({
        visible: true,
        title,
        message,
        type,
      });
    },
    [],
  );

  // Load actual transactions from local storage
  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getTransactions();

      if (Array.isArray(data)) {
        setTransactions(data);
      } else {
        console.warn('Invalid transaction data received');
        setTransactions([]);
      }
    } catch (error: unknown) {
      console.error('Analytics loading error:', error);

      setTransactions([]);

      const message =
        error instanceof Error
          ? error.message
          : 'Unable to load saved transactions.';

      showSweetAlert(
        'Unable to Load Data',
        message,
        'error',
      );
    } finally {
      setLoading(false);
    }
  }, [showSweetAlert]);

  // Refresh whenever Analytics screen gets focus
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  // Calculate income, expense and balance
  const summary = useMemo(() => {
    const income = transactions
      .filter(item => item.type === 'income')
      .reduce(
        (sum, item) => sum + getValidAmount(item.amount),
        0,
      );

    const expenses = transactions
      .filter(item => item.type === 'expense')
      .reduce(
        (sum, item) => sum + getValidAmount(item.amount),
        0,
      );

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  // Calculate category-wise expense from saved transactions
  const categoryData = useMemo(() => {
    const totals: Record<string, number> = {};

    transactions
      .filter(item => item.type === 'expense')
      .forEach(item => {
        const category = item.category?.trim() || 'Other';

        const amount = getValidAmount(item.amount);

        if (amount <= 0) {
          return;
        }

        totals[category] = (totals[category] || 0) + amount;
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
  }, [transactions, summary.expenses]);

  // Donut chart dimensions
  const chartRadius = 70;
  const chartCircumference = 2 * Math.PI * chartRadius;

  // Dynamic chart segments
  const chartSegments = useMemo(() => {
    if (summary.expenses <= 0) {
      return [];
    }

    let currentOffset = 0;

    return categoryData.map((item, index) => {
      const segmentLength =
        (item.amount / summary.expenses) * chartCircumference;

      const segment = {
        category: item.category,
        amount: item.amount,
        percentage: item.percentage,
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

  // Highest expense category
  const highestCategory = categoryData[0];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#F3F8F5"
        barStyle="dark-content"
      />

      {/* FIXED HEADER */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={21} color="#18392B" />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.title}>
            Analytics
          </Text>

          <Text style={styles.subtitle}>
            Your financial overview
          </Text>
        </View>

        <TouchableOpacity
          style={styles.refreshButton}
          activeOpacity={0.7}
          onPress={loadData}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              color="#159765"
            />
          ) : (
            <RefreshCw
              size={19}
              color="#159765"
            />
          )}
        </TouchableOpacity>
      </View>

      {/* SCROLLABLE CONTENT */}

      <ScrollView
        style={styles.mainScroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* BALANCE CARD */}

        <View style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <View>
              <Text style={styles.summaryLabel}>
                TOTAL BALANCE
              </Text>

              <Text style={styles.balance}>
                {formatAmount(summary.balance)}
              </Text>

              <Text style={styles.balanceCaption}>
                Your available balance
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
                <TrendingUp
                  size={17}
                  color="#9BFFD0"
                />
              </View>

              <Text style={styles.summarySmall}>
                Total Income
              </Text>

              <Text style={styles.summaryValue}>
                {formatAmount(summary.income)}
              </Text>
            </View>

            <View style={styles.verticalLine} />

            <View style={styles.summaryItem}>
              <View style={styles.expenseIcon}>
                <TrendingDown
                  size={17}
                  color="#FFD4D4"
                />
              </View>

              <Text style={styles.summarySmall}>
                Total Expense
              </Text>

              <Text style={styles.summaryValue}>
                {formatAmount(summary.expenses)}
              </Text>
            </View>
          </View>
        </View>

        {/* EXPENSE STATISTICS HEADING */}

        <View style={styles.sectionHeading}>
          <View style={styles.sectionIcon}>
            <ChartPie size={20} color="#159765" />
          </View>

          <View>
            <Text style={styles.sectionTitle}>
              Expense Statistics
            </Text>

            <Text style={styles.sectionSubtitle}>
              Category-wise spending overview
            </Text>
          </View>
        </View>

        {/* DYNAMIC DONUT CHART */}

        <View style={styles.graphCard}>
          <View style={styles.graphHeader}>
            <View>
              <Text style={styles.graphTitle}>
                Spending Analysis
              </Text>

              <Text style={styles.graphSubtitle}>
                Category-wise expense distribution
              </Text>
            </View>

            <View style={styles.graphBadge}>
              <Text style={styles.graphBadgeText}>
                ALL TIME
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
                <ReceiptText size={32} color="#159765" />
              </View>

              <Text style={styles.emptyTitle}>
                No expense data yet
              </Text>

              <Text style={styles.emptyText}>
                Add your first expense to see your circular chart here.
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

              {/* CIRCULAR GRAPH */}

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

                {/* CENTER TOTAL */}

                <View style={styles.donutCenter}>
                  <Text style={styles.donutCenterLabel}>
                    TOTAL EXPENSE
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
                Your actual spending by category
              </Text>
            </>
          )}
        </View>

        {/* CATEGORY BREAKDOWN HEADING */}

        <View style={styles.sectionHeading}>
          <View style={styles.sectionIcon}>
            <ChartPie size={19} color="#159765" />
          </View>

          <View>
            <Text style={styles.sectionTitle}>
              Category Breakdown
            </Text>

            <Text style={styles.sectionSubtitle}>
              Detailed expense distribution
            </Text>
          </View>
        </View>

        {/* CATEGORY BREAKDOWN */}

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
                Your category breakdown will appear after adding expenses.
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.totalHeader}>
                <Text style={styles.totalLabel}>
                  Total Expenses
                </Text>

                <Text style={styles.totalAmount}>
                  {formatAmount(summary.expenses)}
                </Text>
              </View>

              {/* ACTUAL CATEGORY LEGEND */}

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
            <TrendingUp
              size={20}
              color="#087C50"
            />
          </View>

          <View style={styles.insightContent}>
            <Text style={styles.noteTitle}>
              Spending Insight
            </Text>

            <Text style={styles.noteText}>
              {loading
                ? 'Calculating your spending insights...'
                : highestCategory
                  ? `${highestCategory.category} is your highest expense category. You spent ${formatAmount(
                      highestCategory.amount,
                    )} (${highestCategory.percentage.toFixed(
                      1,
                    )}% of your total expenses) in this category.`
                  : 'Your spending insights will appear here after adding expenses.'}
            </Text>
          </View>
        </View>

        {/* FOOTER */}

        <Text style={styles.footerText}>
          Your financial summary is based on saved transactions.
        </Text>
      </ScrollView>

      {/* SWEET ALERT */}

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