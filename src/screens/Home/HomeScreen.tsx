
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import {
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  PieChart,
  Plus,
  ChevronRight,
  Wallet,
  ShoppingBag,
  Utensils,
  Car,
  Home,
  HeartPulse,
  GraduationCap,
  BriefcaseBusiness,
  Smartphone,
  CircleHelp,
  CalendarDays,
  ReceiptText,
  Clock3,
} from 'lucide-react-native';

import SweetAlert from '../../components/SweetAlert/SweetAlert';

import Header from '../../components/Header/Header';
import Footer, { TabName } from '../../components/Footer/Footer';

import {
  getCurrentUser,
  clearCurrentUser,
} from '../../storage/authStorage';

import {
  getTransactions,
  Transaction,
} from '../../storage/transactionStorage';

import { styles } from './HomeScreen.styles';

const MONTHLY_BUDGET = 20000;

// Category-wise icons
const getCategoryIcon = (
  category: string,
  color: string,
) => {
  const value = category?.toLowerCase() || '';

  if (value.includes('food') || value.includes('restaurant'))
    return <Utensils size={21} color={color} />;

  if (value.includes('shopping'))
    return <ShoppingBag size={21} color={color} />;

  if (value.includes('travel') || value.includes('transport'))
    return <Car size={21} color={color} />;

  if (value.includes('home') || value.includes('rent'))
    return <Home size={21} color={color} />;

  if (value.includes('health') || value.includes('medical'))
    return <HeartPulse size={21} color={color} />;

  if (value.includes('education'))
    return <GraduationCap size={21} color={color} />;

  if (value.includes('salary') || value.includes('business'))
    return <BriefcaseBusiness size={21} color={color} />;

  if (value.includes('mobile') || value.includes('recharge'))
    return <Smartphone size={21} color={color} />;

  return <CircleHelp size={21} color={color} />;
};

export default function HomeScreen({ navigation }: any) {
  const [mobile, setMobile] = useState('');
  const [items, setItems] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  // Entrance animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 650,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  // Load user and transaction data
  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const user = await getCurrentUser();

      if (!user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
        return;
      }

      setMobile(user);

      const userTransactions = await getTransactions(user);

      setItems(userTransactions);
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.message || 'Unable to load your dashboard.',
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

  // Calculate income, expense and balance
  const {
    income,
    expense,
    balance,
    monthlyExpense,
  } = useMemo(() => {
    const totalIncome = items
      .filter(item => item.type === 'income')
      .reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0,
      );

    const totalExpense = items
      .filter(item => item.type === 'expense')
      .reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0,
      );

    const now = new Date();

    const currentMonth =
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    const monthExpense = items
      .filter(
        item =>
          item.type === 'expense' &&
          String(item.date).slice(0, 7) === currentMonth,
      )
      .reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0,
      );

    return {
      income: totalIncome,
      expense: totalExpense,
      balance: totalIncome - totalExpense,
      monthlyExpense: monthExpense,
    };
  }, [items]);

  const budgetPercentage = Math.min(
    Math.round((monthlyExpense / MONTHLY_BUDGET) * 100),
    100,
  );

  const formatMoney = (amount: number) =>
    `₹${amount.toLocaleString('en-IN')}`;

  // Logout
  const handleLogout = () => {
    setShowLogoutAlert(true);
  };

  const confirmLogout = async () => {
    try {
      await clearCurrentUser();

      setShowLogoutAlert(false);
      setMobile('');
      setItems([]);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error: any) {
      setShowLogoutAlert(false);

      Alert.alert(
        'Logout Failed',
        error?.message || 'Please try again.',
      );
    }
  };

  // Footer navigation
  const handleTabPress = (tab: TabName) => {
    if (tab === 'Home') return;

    if (tab === 'Transactions') {
      navigation.navigate('Transactions');
      return;
    }

    const routeExists = navigation
      .getState()
      ?.routeNames?.includes(tab);

    if (routeExists) {
      navigation.navigate(tab);
    } else {
      Alert.alert(
        `${tab} screen`,
        `Please add the ${tab} screen to AppNavigator.`,
      );
    }
  };

  // Add transaction
  const handleAddTransaction = (
    type?: 'income' | 'expense',
  ) => {
    navigation.navigate(
      'AddTransaction',
      type ? { type } : undefined,
    );
  };

  const handleNotificationPress = () => {
    Alert.alert(
      'Notifications',
      'You are all caught up!',
    );
  };

  const handleSettingsPress = () => {
    Alert.alert(
      'Settings',
      'Settings screen can be connected here.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: handleLogout,
        },
      ],
    );
  };

  const recentTransactions = items.slice(0, 4);

  return (
    <View style={styles.container}>

      {/* Header */}
<View style={styles.headerWrapper}>
  <Header
    onNotificationPress={handleNotificationPress}
    onSettingsPress={handleSettingsPress}
  />
</View>

      {/* Dashboard Scroll */}
      <Animated.ScrollView
        style={[
          styles.animatedContent,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color="#159765"
            />

            <Text style={styles.loadingText}>
              Loading your dashboard...
            </Text>
          </View>
        ) : (
          <>

            {/* Total Balance */}
            <View style={styles.balanceCard}>

              <View style={styles.balanceTop}>
                <View>
                  <Text style={styles.balanceLabel}>
                    Total Balance
                  </Text>

                  <Text style={styles.balanceSubLabel}>
                    Your available balance
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() =>
                    setBalanceVisible(value => !value)
                  }
                  activeOpacity={0.8}
                >
                  {balanceVisible ? (
                    <Eye size={20} color="#FFFFFF" />
                  ) : (
                    <EyeOff size={20} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              </View>

              <Text
                style={styles.balanceAmount}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {balanceVisible
                  ? formatMoney(balance)
                  : '₹ ••••••'}
              </Text>

              <View style={styles.balanceBottom}>
                <Wallet size={16} color="#D8F9E7" />

                <Text style={styles.balanceBottomText}>
                  Income minus expenses
                </Text>
              </View>

              <View style={styles.balanceDecoration}>
                <Wallet size={95} color="rgba(255,255,255,0.10)" />
              </View>

            </View>

            {/* Income and Expense */}
            <View style={styles.summaryRow}>

              {/* Income */}
              <View style={styles.summaryCard}>

                <View style={styles.summaryCardTop}>
                  <View style={styles.incomeIconBox}>
                    <TrendingUp
                      size={23}
                      color="#159765"
                    />
                  </View>

                  <Text style={styles.summaryBadgeIncome}>
                    INCOME
                  </Text>
                </View>

                <Text style={styles.summaryLabel}>
                  Total Income
                </Text>

                <Text
                  style={styles.summaryAmount}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {formatMoney(income)}
                </Text>

                <View style={styles.summaryBottom}>
                  <ArrowDownRight
                    size={15}
                    color="#159765"
                  />

                  <Text style={styles.summaryBottomIncome}>
                    Money received
                  </Text>
                </View>

              </View>

              {/* Expense */}
              <View style={styles.summaryCard}>

                <View style={styles.summaryCardTop}>
                  <View style={styles.expenseIconBox}>
                    <TrendingDown
                      size={23}
                      color="#EF6672"
                    />
                  </View>

                  <Text style={styles.summaryBadgeExpense}>
                    EXPENSE
                  </Text>
                </View>

                <Text style={styles.summaryLabel}>
                  Total Expense
                </Text>

                <Text
                  style={styles.summaryAmount}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {formatMoney(expense)}
                </Text>

                <View style={styles.summaryBottom}>
                  <ArrowUpRight
                    size={15}
                    color="#EF6672"
                  />

                  <Text style={styles.summaryBottomExpense}>
                    Money spent
                  </Text>
                </View>

              </View>

            </View>

            {/* Quick Actions */}
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>
                  Quick Actions
                </Text>

                <Text style={styles.sectionSubtitle}>
                  Manage your money easily
                </Text>
              </View>
            </View>

            <View style={styles.quickActions}>

              {/* Add Income */}
              <TouchableOpacity
                style={styles.actionItem}
                onPress={() =>
                  handleAddTransaction('income')
                }
                activeOpacity={0.75}
              >
                <View style={styles.incomeAction}>
                  <ArrowDownRight
                    size={25}
                    color="#FFFFFF"
                  />
                </View>

                <Text style={styles.actionText}>
                  Add Income
                </Text>

                <Text style={styles.actionDescription}>
                  Money in
                </Text>
              </TouchableOpacity>

              {/* Add Expense */}
              <TouchableOpacity
                style={styles.actionItem}
                onPress={() =>
                  handleAddTransaction('expense')
                }
                activeOpacity={0.75}
              >
                <View style={styles.expenseAction}>
                  <ArrowUpRight
                    size={25}
                    color="#FFFFFF"
                  />
                </View>

                <Text style={styles.actionText}>
                  Add Expense
                </Text>

                <Text style={styles.actionDescription}>
                  Money out
                </Text>
              </TouchableOpacity>

              {/* History */}
              <TouchableOpacity
                style={styles.actionItem}
                onPress={() =>
                  navigation.navigate('Transactions')
                }
                activeOpacity={0.75}
              >
                <View style={styles.analyticsAction}>
                  <ReceiptText
                    size={24}
                    color="#FFFFFF"
                  />
                </View>

                <Text style={styles.actionText}>
                  History
                </Text>

                <Text style={styles.actionDescription}>
                  View records
                </Text>
              </TouchableOpacity>

            </View>

            {/* Recent Transactions */}
            <View style={styles.sectionHeader}>

              <View>
                <Text style={styles.sectionTitle}>
                  Recent Transactions
                </Text>

                <Text style={styles.sectionSubtitle}>
                  Your latest money activity
                </Text>
              </View>

              <TouchableOpacity
                style={styles.seeAllButton}
                onPress={() =>
                  navigation.navigate('Transactions')
                }
              >
                <Text style={styles.seeAllText}>
                  See All
                </Text>

                <ChevronRight
                  size={17}
                  color="#159765"
                />
              </TouchableOpacity>

            </View>

            <View style={styles.transactionCard}>

              {recentTransactions.length === 0 ? (

                <View style={styles.emptyContainer}>

                  <View style={styles.emptyIcon}>
                    <Wallet
                      size={29}
                      color="#159765"
                    />
                  </View>

                  <Text style={styles.emptyTitle}>
                    No transactions yet
                  </Text>

                  <Text style={styles.emptyText}>
                    Add your first income or expense to
                    see your activity here.
                  </Text>

                  <TouchableOpacity
                    style={styles.emptyButton}
                    onPress={() => handleAddTransaction()}
                  >
                    <Plus size={17} color="#FFFFFF" />

                    <Text style={styles.emptyButtonText}>
                      Add Transaction
                    </Text>
                  </TouchableOpacity>

                </View>

              ) : (

                recentTransactions.map((item, index) => (
                  <View
                    key={item.id}
                    style={[
                      styles.transactionItem,
                      index === recentTransactions.length - 1 &&
                        styles.lastTransaction,
                    ]}
                  >

                    {/* Category Icon */}
                    <View
                      style={[
                        styles.transactionIcon,
                        {
                          backgroundColor:
                            item.type === 'income'
                              ? '#E5F7ED'
                              : '#FFF0F1',
                        },
                      ]}
                    >
                      {getCategoryIcon(
                        item.category,
                        item.type === 'income'
                          ? '#159765'
                          : '#EF6672',
                      )}
                    </View>

                    {/* Details */}
                    <View style={styles.transactionDetails}>

                      <Text
                        style={styles.transactionTitle}
                        numberOfLines={1}
                      >
                        {item.category}
                      </Text>

                      <View style={styles.transactionMeta}>
                        <CalendarDays
                          size={11}
                          color="#98A69D"
                        />

                        <Text
                          style={styles.transactionDate}
                          numberOfLines={1}
                        >
                          {item.date}
                        </Text>
                      </View>

                      {!!item.description && (
                        <Text
                          style={styles.transactionDescription}
                          numberOfLines={1}
                        >
                          {item.description}
                        </Text>
                      )}

                    </View>

                    {/* Amount */}
                    <Text
                      style={[
                        styles.transactionAmount,
                        item.type === 'income'
                          ? styles.incomeAmount
                          : styles.expenseAmount,
                      ]}
                    >
                      {item.type === 'income' ? '+' : '-'}
                      {formatMoney(Number(item.amount))}
                    </Text>

                  </View>
                ))

              )}

            </View>

            {/* Monthly Budget */}
            <View style={styles.sectionHeader}>

              <View>
                <Text style={styles.sectionTitle}>
                  Monthly Budget
                </Text>

                <Text style={styles.sectionSubtitle}>
                  Track your monthly spending
                </Text>
              </View>

              <Text style={styles.budgetCaption}>
                This month
              </Text>

            </View>

            <View style={styles.budgetCard}>

              <View style={styles.budgetTop}>

                <View>
                  <Text style={styles.budgetLabel}>
                    Monthly spending
                  </Text>

                  <Text style={styles.budgetAmount}>
                    {formatMoney(monthlyExpense)}
                  </Text>
                </View>

                <View style={styles.budgetPercentage}>
                  <Text style={styles.budgetPercentageText}>
                    {budgetPercentage}%
                  </Text>
                </View>

              </View>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${budgetPercentage}%` },
                    budgetPercentage >= 100 &&
                      styles.progressWarning,
                  ]}
                />
              </View>

              <View style={styles.budgetBottom}>

                <Text style={styles.budgetHint}>
                  Budget: {formatMoney(MONTHLY_BUDGET)}
                </Text>

                <Text style={styles.budgetHint}>
                  {formatMoney(
                    Math.max(
                      MONTHLY_BUDGET - monthlyExpense,
                      0,
                    ),
                  )} left
                </Text>

              </View>

            </View>

            <View style={styles.bottomSpace} />

          </>
        )}
      </Animated.ScrollView>

      {/* Fixed Footer */}
      <Footer
        activeTab="Home"
        onTabPress={handleTabPress}
        onAddPress={() => handleAddTransaction()}
      />

      {/* Logout Confirmation */}
      <SweetAlert
        visible={showLogoutAlert}
        title="Logout?"
        message="Are you sure you want to logout from your account?"
        type="warning"
        confirmText="Yes, Logout"
        cancelText="Cancel"
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutAlert(false)}
      />

    </View>
  );
}
