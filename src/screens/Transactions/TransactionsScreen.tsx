import React, {useCallback, useMemo, useState} from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';

import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';

import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  ArrowLeft,
  Wallet,
  ReceiptText,
  Trash2,
  Pencil,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ChevronDown,
  Filter,
  BriefcaseBusiness,
  Utensils,
  Car,
  ShoppingBag,
  House,
  HeartPulse,
  GraduationCap,
  Clapperboard,
  Gift,
  CircleHelp,
  Laptop,
  Coffee,
  Plane,
  CreditCard,
  Banknote,
  X,
  Check,
} from 'lucide-react-native';

import type {Transaction} from '../../types/transaction';

import type {RootStackParamList} from '../../navigation/types';

import {
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from '../../storage/transactionStorage';

import {getCurrentUser} from '../../storage/authStorage';

import SweetAlert from '../../components/SweetAlert/SweetAlert';

import {styles} from './TransactionsScreen.styles';

type AlertType = 'success' | 'error' | 'warning' | 'info';

type CategoryIconComponent = React.ComponentType<{
  size?: number;
  color?: string;
}>;

const formatAmount = (amount: number) =>
  `₹${Number(amount || 0).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
  })}`;

const formatDate = (date: string) => {
  if (!date) return '';

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return parsedDate.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const getCategoryIcon = (
  category: string,
): CategoryIconComponent => {
  const name = category.toLowerCase().trim();

  if (name.includes('salary') || name.includes('job')) {
    return BriefcaseBusiness;
  }

  if (name.includes('food') || name.includes('restaurant')) {
    return Utensils;
  }

  if (name.includes('travel') || name.includes('transport')) {
    return Car;
  }

  if (name.includes('shopping')) {
    return ShoppingBag;
  }

  if (name.includes('rent') || name.includes('house')) {
    return House;
  }

  if (name.includes('health') || name.includes('medical')) {
    return HeartPulse;
  }

  if (name.includes('education') || name.includes('study')) {
    return GraduationCap;
  }

  if (
    name.includes('entertainment') ||
    name.includes('movie')
  ) {
    return Clapperboard;
  }

  if (name.includes('gift')) {
    return Gift;
  }

  if (
    name.includes('investment') ||
    name.includes('saving')
  ) {
    return TrendingUp;
  }

  if (
    name.includes('freelance') ||
    name.includes('business')
  ) {
    return Laptop;
  }

  if (name.includes('coffee')) {
    return Coffee;
  }

  if (
    name.includes('flight') ||
    name.includes('trip')
  ) {
    return Plane;
  }

  if (
    name.includes('bill') ||
    name.includes('payment')
  ) {
    return CreditCard;
  }

  if (name.includes('cash')) {
    return Banknote;
  }

  return CircleHelp;
};

export default function TransactionsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [mobile, setMobile] = useState('');

  const [items, setItems] = useState<Transaction[]>([]);

  const [selectedCategory, setSelectedCategory] =
    useState('all');

  const [dropdownVisible, setDropdownVisible] =
    useState(false);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const [alertAction, setAlertAction] =
    useState<'delete' | null>(null);

  const [alertData, setAlertData] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'info' as AlertType,
    confirmText: 'OK',
  });

  // EDIT STATES
  const [editVisible, setEditVisible] = useState(false);

  const [editingItem, setEditingItem] =
    useState<Transaction | null>(null);

  const [editType, setEditType] =
    useState<'income' | 'expense'>('expense');

  const [editAmount, setEditAmount] = useState('');

  const [editCategory, setEditCategory] = useState('');

  const [editDate, setEditDate] = useState('');

  const [editDescription, setEditDescription] =
    useState('');

  // SWEET ALERT
  const showSweetAlert = (
    title: string,
    message: string,
    type: AlertType = 'info',
    confirmText = 'OK',
  ) => {
    setAlertData({
      visible: true,
      title,
      message,
      type,
      confirmText,
    });
  };

  const closeAlert = () => {
    setAlertData(prev => ({
      ...prev,
      visible: false,
    }));

    setAlertAction(null);
    setSelectedId(null);
  };

  // LOAD TRANSACTIONS
  const loadTransactions = useCallback(async () => {
    try {
      setLoading(true);

      const currentMobile = await getCurrentUser();

      if (!currentMobile) {
        setItems([]);
        navigation.replace('Login');
        return;
      }

      const userMobile = String(currentMobile)
        .replace(/\D/g, '')
        .slice(-10);

      if (!/^[6-9]\d{9}$/.test(userMobile)) {
        throw new Error('Valid mobile number not found.');
      }

      setMobile(userMobile);

      const data = await getTransactions(userMobile);

      setItems(Array.isArray(data) ? data : []);

      console.log('Transactions loaded:', data);
    } catch (error: any) {
      console.log('Transaction loading error:', error);

      setItems([]);

      showSweetAlert(
        'Unable to Load',
        error?.message || 'Could not load your transactions.',
        'error',
      );
    } finally {
      setLoading(false);
    }
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [loadTransactions]),
  );

  // SUMMARY
  const summary = useMemo(() => {
    const income = items
      .filter(item => item.type === 'income')
      .reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0,
      );

    const expense = items
      .filter(item => item.type === 'expense')
      .reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0,
      );

    return {
      income,
      expense,
      total: items.length,
    };
  }, [items]);

  // CATEGORY FILTER
  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(
        items
          .map(item => item.category?.trim())
          .filter(
            (category): category is string =>
              Boolean(category),
          ),
      ),
    );

    return ['all', ...unique];
  }, [items]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') {
      return items;
    }

    return items.filter(
      item =>
        item.category?.toLowerCase().trim() ===
        selectedCategory.toLowerCase().trim(),
    );
  }, [items, selectedCategory]);

  // OPEN EDIT MODAL
  const openEdit = (item: Transaction) => {
    setEditingItem(item);

    setEditType(item.type);

    setEditAmount(String(item.amount));

    setEditCategory(item.category || '');

    setEditDate(item.date || '');

    setEditDescription(item.description || '');

    setEditVisible(true);
  };

  // VALIDATE DATE
  const isValidDate = (date: string) => {
    const match = date.match(
      /^(\d{4})-(\d{2})-(\d{2})$/,
    );

    if (!match) return false;

    const [, year, month, day] = match;

    const parsed = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
    );

    return (
      parsed.getFullYear() === Number(year) &&
      parsed.getMonth() === Number(month) - 1 &&
      parsed.getDate() === Number(day)
    );
  };

  // UPDATE TRANSACTION
  const handleUpdate = async () => {
    if (!editingItem || !mobile || saving) {
      return;
    }

    const amount = Number(editAmount);

    if (
      !editAmount.trim() ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      showSweetAlert(
        'Invalid Amount',
        'Please enter a valid amount greater than zero.',
        'warning',
      );
      return;
    }

    if (!editCategory.trim()) {
      showSweetAlert(
        'Missing Category',
        'Please enter a category.',
        'warning',
      );
      return;
    }

    if (!isValidDate(editDate.trim())) {
      showSweetAlert(
        'Invalid Date',
        'Please enter date in YYYY-MM-DD format.',
        'warning',
      );
      return;
    }

    try {
      setSaving(true);

      const updatedItem: Transaction = {
        ...editingItem,
        id: editingItem.id,
        title:
          editDescription.trim() ||
          editCategory.trim(),
        type: editType,
        amount,
        category: editCategory.trim(),
        date: editDate.trim(),
        description: editDescription.trim(),
      };

      // IMPORTANT: Update data in AsyncStorage
      const updatedList = await updateTransaction(
        mobile,
        editingItem.id,
        updatedItem,
      );

      // Update screen immediately
      setItems(updatedList);

      setEditVisible(false);

      setEditingItem(null);

      showSweetAlert(
        'Updated Successfully',
        'Your transaction details have been updated.',
        'success',
      );

      console.log('Updated transaction:', updatedItem);
    } catch (error: any) {
      console.log('Transaction update error:', error);

      showSweetAlert(
        'Update Failed',
        error?.message || 'Unable to update transaction.',
        'error',
      );
    } finally {
      setSaving(false);
    }
  };

  // DELETE CONFIRMATION
  const handleDelete = (id: string) => {
    setSelectedId(id);

    setAlertAction('delete');

    showSweetAlert(
      'Delete Transaction?',
      'This transaction will be permanently deleted. Are you sure?',
      'error',
      'Delete',
    );
  };

  // CONFIRM DELETE
  const confirmDelete = async () => {
    if (!selectedId || !mobile || saving) {
      return;
    }

    const id = selectedId;

    setAlertData(prev => ({
      ...prev,
      visible: false,
    }));

    setSaving(true);

    try {
      const updatedList = await deleteTransaction(
        mobile,
        id,
      );

      setItems(updatedList);

      setSelectedId(null);

      setAlertAction(null);

      showSweetAlert(
        'Deleted Successfully',
        'Your transaction has been removed.',
        'success',
      );
    } catch (error: any) {
      console.log('Delete transaction error:', error);

      setSelectedId(null);

      setAlertAction(null);

      showSweetAlert(
        'Delete Failed',
        error?.message || 'Unable to delete transaction.',
        'error',
      );
    } finally {
      setSaving(false);
    }
  };

  // ALERT BUTTON
  const handleAlertConfirm = () => {
    if (alertAction === 'delete') {
      confirmDelete();
    } else {
      closeAlert();
    }
  };

  // TRANSACTION CARD
  const renderTransaction = ({
    item,
  }: {
    item: Transaction;
  }) => {
    const isIncome = item.type === 'income';

    const CategoryIcon = getCategoryIcon(
      item.category || 'other',
    );

    return (
      <View style={styles.transactionCard}>
        <View
          style={[
            styles.transactionIcon,
            isIncome
              ? styles.incomeIconBg
              : styles.expenseIconBg,
          ]}>
          <CategoryIcon
            size={22}
            color={isIncome ? '#159765' : '#E85C68'}
          />
        </View>

        <View style={styles.details}>
          <Text
            style={styles.transactionTitle}
            numberOfLines={1}>
            {item.category || 'Other'}
          </Text>

          <Text
            style={styles.transactionMeta}
            numberOfLines={1}>
            {item.description ||
              (isIncome ? 'Income' : 'Expense')}
          </Text>

          <Text style={styles.dateText}>
            {formatDate(item.date)}
          </Text>
        </View>

        <View style={styles.amountSection}>
          <Text
            style={[
              styles.amount,
              isIncome ? styles.income : styles.expense,
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit>
            {isIncome ? '+' : '-'}
            {formatAmount(Number(item.amount))}
          </Text>

          <View style={styles.actionRow}>
            {/* EDIT */}
            <TouchableOpacity
              style={styles.editButton}
              activeOpacity={0.7}
              onPress={() => openEdit(item)}>
              <Pencil size={15} color="#159765" />
            </TouchableOpacity>

            {/* DELETE */}
            <TouchableOpacity
              style={styles.deleteButton}
              activeOpacity={0.7}
              onPress={() => handleDelete(item.id)}>
              <Trash2 size={15} color="#E53945" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // LIST HEADER
  const ListHeader = () => (
    <View>
      <View style={styles.summaryContainer}>
        <View style={[styles.summaryCard, styles.incomeCard]}>
          <View style={styles.summaryIcon}>
            <TrendingUp size={18} color="#159765" />
          </View>

          <Text style={styles.summaryLabel}>Income</Text>

          <Text style={styles.summaryAmount} numberOfLines={1}>
            {formatAmount(summary.income)}
          </Text>
        </View>

        <View style={[styles.summaryCard, styles.expenseCard]}>
          <View style={styles.summaryIcon}>
            <TrendingDown size={18} color="#E85C68" />
          </View>

          <Text style={styles.summaryLabel}>Expenses</Text>

          <Text style={styles.summaryAmount} numberOfLines={1}>
            {formatAmount(summary.expense)}
          </Text>
        </View>
      </View>

      <View style={styles.countCard}>
        <View style={styles.countIcon}>
          <ReceiptText size={19} color="#159765" />
        </View>

        <View style={styles.countDetails}>
          <Text style={styles.countTitle}>
            All Transactions
          </Text>

          <Text style={styles.countSubtitle}>
            Your complete transaction history
          </Text>
        </View>

        <Text style={styles.countNumber}>
          {summary.total}
        </Text>
      </View>

      {/* FILTER */}
      <View style={styles.filterSection}>
        <View style={styles.filterHeading}>
          <View style={styles.filterHeadingLeft}>
            <Wallet size={18} color="#159765" />

            <Text style={styles.filterTitle}>
              Filter Transactions
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.dropdownButton}
          onPress={() => setDropdownVisible(true)}>
          <View style={styles.dropdownIcon}>
            <Filter size={19} color="#159765" />
          </View>

          <View style={styles.dropdownTextContainer}>
            <Text style={styles.dropdownLabel}>
              Selected Category
            </Text>

            <Text style={styles.dropdownValue}>
              {selectedCategory === 'all'
                ? 'All Categories'
                : selectedCategory}
            </Text>
          </View>

          <ChevronDown size={20} color="#159765" />
        </TouchableOpacity>
      </View>

      <View style={styles.filteredHeader}>
        <View style={styles.filteredHeaderDetails}>
          <Text style={styles.filteredTitle}>
            {selectedCategory === 'all'
              ? 'Transactions List'
              : `${selectedCategory} Transactions`}
          </Text>

          <Text style={styles.filteredSubtitle}>
            {selectedCategory === 'all'
              ? 'Showing all your transactions'
              : `Showing ${selectedCategory} transactions only`}
          </Text>
        </View>

        <View style={styles.filteredCount}>
          <Text style={styles.filteredCountText}>
            {filteredItems.length}
          </Text>
        </View>
      </View>
    </View>
  );

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
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={21} color="#18392B" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.title}>Transactions</Text>

          <Text style={styles.subtitle}>
            Manage your money activity
          </Text>
        </View>

        <TouchableOpacity
          style={styles.refreshButton}
          onPress={loadTransactions}
          disabled={loading || saving}
          activeOpacity={0.75}>
          <RefreshCw size={19} color="#159765" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#159765"
          />

          <Text style={styles.loadingText}>
            Loading transactions...
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={item => String(item.id)}
          renderItem={renderTransaction}
          ListHeaderComponent={ListHeader}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContent,
            filteredItems.length === 0 &&
              styles.emptyListContent,
          ]}
          ListEmptyComponent={
            <View style={styles.empty}>
              <View style={styles.emptyIcon}>
                <ReceiptText
                  size={30}
                  color="#159765"
                />
              </View>

              <Text style={styles.emptyTitle}>
                {selectedCategory === 'all'
                  ? 'No Transactions Yet'
                  : `No ${selectedCategory} Transactions`}
              </Text>

              <Text style={styles.emptyText}>
                {selectedCategory === 'all'
                  ? 'Add your first income or expense to see your activity here.'
                  : `No transactions found in ${selectedCategory} category.`}
              </Text>
            </View>
          }
        />
      )}

      {/* CATEGORY FILTER MODAL */}
      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setDropdownVisible(false)}>
          <Pressable
            style={styles.dropdownModal}
            onPress={() => {}}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>
                  Select Category
                </Text>

                <Text style={styles.modalSubtitle}>
                  Choose a category to filter transactions
                </Text>
              </View>

              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setDropdownVisible(false)}>
                <X size={20} color="#52645A" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={categories}
              keyExtractor={item => item}
              style={styles.dropdownOptions}
              renderItem={({item}) => {
                const isSelected =
                  selectedCategory === item;

                const CategoryIcon =
                  item === 'all'
                    ? Filter
                    : getCategoryIcon(item);

                const count =
                  item === 'all'
                    ? items.length
                    : items.filter(
                        transaction =>
                          transaction.category
                            ?.toLowerCase()
                            .trim() === item.toLowerCase().trim(),
                      ).length;

                return (
                  <TouchableOpacity
                    style={[
                      styles.dropdownOption,
                      isSelected &&
                        styles.selectedDropdownOption,
                    ]}
                    onPress={() => {
                      setSelectedCategory(item);
                      setDropdownVisible(false);
                    }}>
                    <View
                      style={[
                        styles.optionIcon,
                        isSelected &&
                          styles.selectedOptionIcon,
                      ]}>
                      <CategoryIcon
                        size={19}
                        color={
                          isSelected
                            ? '#159765'
                            : '#718078'
                        }
                      />
                    </View>

                    <Text
                      style={[
                        styles.optionText,
                        isSelected &&
                          styles.selectedOptionText,
                      ]}>
                      {item === 'all'
                        ? 'All Categories'
                        : item}
                    </Text>

                    <Text style={styles.optionCount}>
                      {count}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>

      {/* EDIT TRANSACTION MODAL */}
      <Modal
        visible={editVisible}
        transparent
        animationType="slide"
        onRequestClose={() => {
          if (!saving) {
            setEditVisible(false);
            setEditingItem(null);
          }
        }}>
        <View style={styles.editOverlay}>
          <View style={styles.editModal}>
            <View style={styles.editModalHeader}>
              <View>
                <Text style={styles.editModalTitle}>
                  Edit Transaction
                </Text>

                <Text style={styles.editModalSubtitle}>
                  Correct your transaction details
                </Text>
              </View>

              <TouchableOpacity
                style={styles.modalClose}
                disabled={saving}
                onPress={() => {
                  setEditVisible(false);
                  setEditingItem(null);
                }}>
                <X size={20} color="#52645A" />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">

              <Text style={styles.editLabel}>
                Transaction Type
              </Text>

              <View style={styles.typeRow}>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    editType === 'income' &&
                      styles.incomeTypeSelected,
                  ]}
                  onPress={() => setEditType('income')}>
                  <TrendingUp
                    size={17}
                    color={
                      editType === 'income'
                        ? '#FFFFFF'
                        : '#159765'
                    }
                  />

                  <Text
                    style={[
                      styles.typeButtonText,
                      editType === 'income' &&
                        styles.typeButtonTextSelected,
                    ]}>
                    Income
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    editType === 'expense' &&
                      styles.expenseTypeSelected,
                  ]}
                  onPress={() => setEditType('expense')}>
                  <TrendingDown
                    size={17}
                    color={
                      editType === 'expense'
                        ? '#FFFFFF'
                        : '#E53945'
                    }
                  />

                  <Text
                    style={[
                      styles.typeButtonText,
                      editType === 'expense' &&
                        styles.typeButtonTextSelected,
                    ]}>
                    Expense
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.editLabel}>
                Amount (₹)
              </Text>

              <TextInput
                style={styles.editInput}
                value={editAmount}
                onChangeText={setEditAmount}
                keyboardType="decimal-pad"
                placeholder="Enter amount"
                placeholderTextColor="#A0AAA4"
              />

              <Text style={styles.editLabel}>
                Category
              </Text>

              <TextInput
                style={styles.editInput}
                value={editCategory}
                onChangeText={setEditCategory}
                placeholder="Enter category"
                placeholderTextColor="#A0AAA4"
              />

              <Text style={styles.editLabel}>
                Date (YYYY-MM-DD)
              </Text>

              <TextInput
                style={styles.editInput}
                value={editDate}
                onChangeText={setEditDate}
                placeholder="2026-10-31"
                placeholderTextColor="#A0AAA4"
              />

              <Text style={styles.editLabel}>
                Description
              </Text>

              <TextInput
                style={[
                  styles.editInput,
                  styles.descriptionInput,
                ]}
                value={editDescription}
                onChangeText={setEditDescription}
                placeholder="Enter description"
                placeholderTextColor="#A0AAA4"
                multiline
              />

              <View style={styles.editActions}>
                <TouchableOpacity
                  style={styles.editCancelButton}
                  onPress={() => {
                    setEditVisible(false);
                    setEditingItem(null);
                  }}
                  disabled={saving}>
                  <Text style={styles.editCancelText}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.editSaveButton}
                  onPress={handleUpdate}
                  disabled={saving}>
                  {saving ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.editSaveText}>
                      Update Transaction
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* SWEET ALERT */}
      <SweetAlert
        visible={alertData.visible}
        title={alertData.title}
        message={alertData.message}
        type={alertData.type}
        confirmText={alertData.confirmText}
        cancelText={
          alertAction === 'delete'
            ? 'Cancel'
            : undefined
        }
        onConfirm={handleAlertConfirm}
        onCancel={closeAlert}
      />
    </SafeAreaView>
  );
}