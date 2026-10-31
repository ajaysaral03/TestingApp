import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import {
  ArrowLeft,
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  CalendarDays,
  Wallet,
  Tags,
  FileText,
  Save,
  X,
  Check,
  BriefcaseBusiness,
  TrendingUp,
  Gift,
  Utensils,
  Car,
  ShoppingBag,
  Receipt,
  House,
  HeartPulse,
  GraduationCap,
  Clapperboard,
  CircleHelp,
} from 'lucide-react-native';

import SweetAlert from '../../components/SweetAlert/SweetAlert';

import {getCurrentUser} from '../../storage/authStorage';

import type {TransactionType} from '../../types/transaction';

import {addTransaction} from '../../storage/transactionStorage';

import {styles} from './AddTransactionScreen.styles';

type CategoryItem = {
  name: string;
  icon: React.ComponentType<any>;
};

const incomeCategories: CategoryItem[] = [
  {name: 'Salary', icon: BriefcaseBusiness},
  {name: 'Business', icon: TrendingUp},
  {name: 'Freelance', icon: Wallet},
  {name: 'Investment', icon: TrendingUp},
  {name: 'Gift', icon: Gift},
  {name: 'Other', icon: CircleHelp},
];

const expenseCategories: CategoryItem[] = [
  {name: 'Food', icon: Utensils},
  {name: 'Travel', icon: Car},
  {name: 'Shopping', icon: ShoppingBag},
  {name: 'Bills', icon: Receipt},
  {name: 'Rent', icon: House},
  {name: 'Health', icon: HeartPulse},
  {name: 'Education', icon: GraduationCap},
  {name: 'Entertainment', icon: Clapperboard},
  {name: 'Other', icon: CircleHelp},
];

// DATE FORMAT: YYYY-MM-DD
const formatDateForStorage = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// DISPLAY DATE
const formatDateForDisplay = (date: Date) => {
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

// DISPLAY DAY
const formatDay = (date: Date) => {
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
  });
};

export default function AddTransactionScreen({
  navigation,
  route,
}: any) {
  const initialType: TransactionType =
    route?.params?.type === 'income' ? 'income' : 'expense';

  const [type, setType] =
    useState<TransactionType>(initialType);

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const [transactionDate, setTransactionDate] =
    useState(new Date());

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  const [dropdownVisible, setDropdownVisible] =
    useState(false);

  const [loading, setLoading] = useState(false);

  // SWEET ALERT STATES
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const [alertType, setAlertType] = useState<
    'success' | 'error' | 'warning' | 'info'
  >('success');

  const [confirmText, setConfirmText] = useState('OK');

  const [alertCallback, setAlertCallback] =
    useState<() => void>(() => {});

  // CATEGORY LIST
  const categories =
    type === 'income' ? incomeCategories : expenseCategories;

  const selectedCategory = categories.find(
    item => item.name === category,
  );

  // UPDATE SCREEN WHEN HOME SENDS TYPE
  useEffect(() => {
    const selectedType: TransactionType =
      route?.params?.type === 'income' ? 'income' : 'expense';

    setType(selectedType);
    setCategory('');
    setAmount('');
    setDescription('');
    setTransactionDate(new Date());
  }, [route?.params?.type]);

  // SWEET ALERT HELPER
  const showSweetAlert = (
    title: string,
    message: string,
    alertKind: 'success' | 'error' | 'warning' | 'info' = 'success',
    buttonText = 'OK',
    callback?: () => void,
  ) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertType(alertKind);
    setConfirmText(buttonText);

    setAlertCallback(() => callback || (() => {}));

    setAlertVisible(true);
  };

  // ALERT CONFIRM
  const handleAlertConfirm = () => {
    setAlertVisible(false);
    alertCallback();
  };

  // CHANGE INCOME / EXPENSE
  const handleTypeChange = (
    selectedType: TransactionType,
  ) => {
    setType(selectedType);
    setCategory('');
  };

  // DATE PICKER
  const handleDateChange = (
    event: any,
    selectedDate?: Date,
  ) => {
    setShowDatePicker(false);

    if (event?.type === 'set' && selectedDate) {
      setTransactionDate(selectedDate);
    }
  };

  // SAVE TRANSACTION
  const handleSave = async () => {
    if (loading) return;

    const value = Number(amount);

    // AMOUNT VALIDATION
    if (
      !amount.trim() ||
      !Number.isFinite(value) ||
      value <= 0
    ) {
      showSweetAlert(
        'Invalid Amount',
        'Please enter an amount greater than zero.',
        'warning',
      );

      return;
    }

    // CATEGORY VALIDATION
    if (!category.trim()) {
      showSweetAlert(
        'Category Required',
        'Please select a transaction category.',
        'warning',
      );

      return;
    }

    try {
      setLoading(true);

      // GET CURRENT LOGGED-IN USER
      const currentMobile = await getCurrentUser();

      console.log('Current logged-in mobile:', currentMobile);

      // NORMALIZE MOBILE NUMBER
      const mobile = String(currentMobile || '')
        .replace(/\D/g, '')
        .slice(-10);

      // MOBILE VALIDATION
      if (!/^[6-9]\d{9}$/.test(mobile)) {
        showSweetAlert(
          'Login Required',
          'Valid mobile number not found. Please login again.',
          'error',
          'Login',
          () => {
            navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            });
          },
        );

        return;
      }

      // CREATE NEW TRANSACTION
      const newTransaction = {
        id: `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,

        title: description.trim() || category.trim(),

        type,

        amount: value,

        category: category.trim(),

        description: description.trim(),

        date: formatDateForStorage(transactionDate),
      };

      console.log('Saving transaction for:', mobile);
      console.log('New transaction:', newTransaction);

      // IMPORTANT FIX:
      // PASS MOBILE NUMBER AND TRANSACTION OBJECT
      const savedTransactions = await addTransaction(
        mobile,
        newTransaction,
      );

      console.log(
        'Transaction saved successfully:',
        savedTransactions,
      );

      // RESET FORM
      setAmount('');
      setCategory('');
      setDescription('');
      setTransactionDate(new Date());

      // SUCCESS ALERT
      showSweetAlert(
        'Transaction Saved!',
        'Your transaction has been added successfully.',
        'success',
        'Continue',
        () => navigation.goBack(),
      );

    } catch (error: any) {
      console.error('Transaction save error:', error);

      showSweetAlert(
        'Save Failed',
        error?.message ||
          'Could not save transaction. Please try again.',
        'error',
      );

    } finally {
      setLoading(false);
    }
  };

  // CATEGORY ITEM
  const renderCategory = ({
    item,
  }: {
    item: CategoryItem;
  }) => {
    const Icon = item.icon;

    const isSelected = category === item.name;

    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          isSelected && styles.selectedCategoryItem,
        ]}
        onPress={() => {
          setCategory(item.name);
          setDropdownVisible(false);
        }}
        activeOpacity={0.75}>

        <View style={styles.categoryLeft}>
          <View
            style={[
              styles.categoryIconBox,
              isSelected && styles.selectedCategoryIconBox,
            ]}>
            <Icon
              size={19}
              color={isSelected ? '#159765' : '#52645A'}
            />
          </View>

          <Text
            style={[
              styles.categoryItemText,
              isSelected && styles.selectedCategoryText,
            ]}>
            {item.name}
          </Text>
        </View>

        {isSelected && (
          <Check size={19} color="#159765" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F4FAF6"
      />

      {/* FIXED HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}>

          <ArrowLeft size={22} color="#18392B" />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>
            Add Transaction
          </Text>

          <Text style={styles.headerSubtitle}>
            Record your income and expenses
          </Text>
        </View>

        <View style={styles.headerPlaceholder}>
          <Wallet size={21} color="#159765" />
        </View>
      </View>

      {/* SCROLLABLE FORM */}
      <ScrollView
        style={styles.formScroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        {/* INCOME / EXPENSE */}
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === 'income' && styles.incomeActive,
            ]}
            onPress={() => handleTypeChange('income')}
            activeOpacity={0.8}>

            <ArrowDownRight
              size={20}
              color={type === 'income' ? '#FFFFFF' : '#159765'}
            />

            <Text
              style={[
                styles.typeText,
                type === 'income' && styles.activeTypeText,
              ]}>
              Income
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              type === 'expense' && styles.expenseActive,
            ]}
            onPress={() => handleTypeChange('expense')}
            activeOpacity={0.8}>

            <ArrowUpRight
              size={20}
              color={type === 'expense' ? '#FFFFFF' : '#F16D76'}
            />

            <Text
              style={[
                styles.typeText,
                type === 'expense' && styles.activeTypeText,
              ]}>
              Expense
            </Text>
          </TouchableOpacity>
        </View>

        {/* AMOUNT CARD */}
        <View style={styles.amountCard}>
          <View style={styles.cardHeading}>
            <View style={styles.headingIcon}>
              <Wallet size={19} color="#159765" />
            </View>

            <Text style={styles.sectionTitle}>
              Transaction Amount
            </Text>
          </View>

          <Text style={styles.fieldLabel}>
            AMOUNT IN RUPEES
          </Text>

          <View style={styles.amountInputContainer}>
            <Text
              style={[
                styles.rupeeSymbol,
                {
                  color:
                    type === 'income' ? '#159765' : '#F16D76',
                },
              ]}>
              ₹
            </Text>

            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor="#A2B0A7"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
              maxLength={12}
            />
          </View>

          <Text style={styles.amountHint}>
            Enter the transaction amount
          </Text>
        </View>

        {/* TRANSACTION DETAILS */}
        <View style={styles.formCard}>
          <View style={styles.sectionHeading}>
            <View style={styles.sectionHeadingIcon}>
              <FileText size={20} color="#159765" />
            </View>

            <View>
              <Text style={styles.sectionTitle}>
                Transaction Details
              </Text>

              <Text style={styles.sectionSubtitle}>
                Add category, date and description
              </Text>
            </View>
          </View>

          {/* CATEGORY */}
          <View style={styles.labelRow}>
            <View style={styles.smallLabelIcon}>
              <Tags size={15} color="#159765" />
            </View>

            <Text style={styles.fieldLabel}>
              CATEGORY
            </Text>
          </View>

          <TouchableOpacity
            style={styles.dropdownButton}
            activeOpacity={0.8}
            onPress={() => setDropdownVisible(true)}>

            <View style={styles.inputLeftContent}>
              <View style={styles.inputIconBox}>
                {selectedCategory ? (
                  <selectedCategory.icon
                    size={19}
                    color="#159765"
                  />
                ) : (
                  <Tags size={19} color="#159765" />
                )}
              </View>

              <Text
                style={[
                  styles.dropdownText,
                  !category && styles.placeholderText,
                ]}>
                {category || 'Select category'}
              </Text>
            </View>

            <ChevronDown size={21} color="#159765" />
          </TouchableOpacity>

          {/* DATE */}
          <View style={styles.labelRow}>
            <View style={styles.smallLabelIcon}>
              <CalendarDays size={15} color="#159765" />
            </View>

            <Text style={styles.fieldLabel}>
              TRANSACTION DATE
            </Text>
          </View>

          <TouchableOpacity
            style={styles.dateInput}
            activeOpacity={0.8}
            onPress={() => setShowDatePicker(true)}>

            <View style={styles.inputLeftContent}>
              <View style={styles.dateIconBox}>
                <CalendarDays size={21} color="#159765" />
              </View>

              <View style={styles.dateTextContainer}>
                <Text style={styles.dateValue}>
                  {formatDateForDisplay(transactionDate)}
                </Text>

                <Text style={styles.dateHint}>
                  {formatDay(transactionDate)} · Tap to change
                </Text>
              </View>
            </View>

            <View style={styles.dateChangeBadge}>
              <Text style={styles.dateChangeText}>
                Change
              </Text>

              <ChevronDown size={14} color="#159765" />
            </View>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={transactionDate}
              mode="date"
              display={
                Platform.OS === 'ios' ? 'compact' : 'default'
              }
              maximumDate={new Date()}
              onChange={handleDateChange}
            />
          )}

          {/* DESCRIPTION */}
          <View style={styles.labelRow}>
            <View style={styles.smallLabelIcon}>
              <FileText size={15} color="#159765" />
            </View>

            <Text style={styles.fieldLabel}>
              DESCRIPTION (OPTIONAL)
            </Text>
          </View>

          <View style={styles.descriptionContainer}>
            <FileText
              size={19}
              color="#89968E"
              style={styles.descriptionIcon}
            />

            <TextInput
              style={styles.descriptionInput}
              placeholder={
                type === 'income'
                  ? 'e.g. October Month Salary'
                  : 'e.g. Dinner, Grocery, Electricity Bill'
              }
              placeholderTextColor="#A2B0A7"
              value={description}
              onChangeText={setDescription}
              multiline
              maxLength={150}
              textAlignVertical="top"
            />
          </View>

          <Text style={styles.characterCount}>
            {description.length}/150
          </Text>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* FIXED SAVE FOOTER */}
      <View style={styles.fixedSaveFooter}>
        <TouchableOpacity
          style={[
            styles.saveButton,
            type === 'income' && styles.incomeSaveButton,
            loading && styles.disabledButton,
          ]}
          onPress={handleSave}
          disabled={loading}
          activeOpacity={0.85}>

          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Save size={20} color="#FFFFFF" />

              <Text style={styles.saveButtonText}>
                Save Transaction
              </Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.footerInfo}>
          <Check size={13} color="#159765" />

          <Text style={styles.footerNote}>
            Your transactions are saved on this device.
          </Text>
        </View>
      </View>

      {/* CATEGORY MODAL */}
      <Modal
        visible={dropdownVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setDropdownVisible(false)}>

        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDropdownVisible(false)}>

          <View
            style={styles.dropdownModal}
            onStartShouldSetResponder={() => true}>

            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>
                  Select {type === 'income' ? 'Income' : 'Expense'} Category
                </Text>

                <Text style={styles.modalSubtitle}>
                  Choose the category for your transaction
                </Text>
              </View>

              <TouchableOpacity
                style={styles.modalCloseIcon}
                onPress={() => setDropdownVisible(false)}>

                <X size={20} color="#18392B" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={categories}
              keyExtractor={item => item.name}
              showsVerticalScrollIndicator={false}
              renderItem={renderCategory}
            />

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setDropdownVisible(false)}>

              <Text style={styles.modalCloseText}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* SWEET ALERT */}
      <SweetAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        type={alertType}
        confirmText={confirmText}
        onConfirm={handleAlertConfirm}
        onCancel={() => setAlertVisible(false)}
      />

    </KeyboardAvoidingView>
  );
}