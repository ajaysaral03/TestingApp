

import React, {useCallback, useMemo, useState} from 'react';



import DateTimePicker from '@react-native-community/datetimepicker';



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

  Filter,

  Search,

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

  SlidersHorizontal,

  ChevronLeft,

  ChevronRight,

  CalendarDays,

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



type TransactionType = 'all' | 'income' | 'expense';



type DateFilterType =

  | 'all'

  | 'month'

  | 'year'

  | 'date'

  | 'range';



type CategoryIconComponent = React.ComponentType<{

  size?: number;

  color?: string;

}>;



// FORMAT AMOUNT

const formatAmount = (amount: number) =>

  `₹${Number(amount || 0).toLocaleString('en-IN', {

    maximumFractionDigits: 2,

  })}`;



// FORMAT DATE

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



// VALIDATE DATE

const isValidDate = (date: string) => {

  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) return false;



  const [, year, month, day] = match;

  const parsed = new Date(Number(year), Number(month) - 1, Number(day));



  return (

    parsed.getFullYear() === Number(year) &&

    parsed.getMonth() === Number(month) - 1 &&

    parsed.getDate() === Number(day)

  );

};



// Convert stored transaction date to YYYY-MM safely.

// Supports YYYY-MM-DD and DD/MM/YYYY formats.

const getMonthKey = (value: string) => {

  if (!value) return '';

  const date = String(value).trim();



  const isoMatch = date.match(/^(\d{4})-(\d{2})/);

  if (isoMatch) return `${isoMatch[1]}-${isoMatch[2]}`;



  const slashMatch = date.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (slashMatch) return `${slashMatch[3]}-${slashMatch[2]}`;



  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return '';

  return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}`;

};



const getMonthLabel = (value: string) => {

  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) return '';

  const [year, month] = value.split('-').map(Number);

  return new Date(year, month - 1, 1).toLocaleDateString('en-IN', {

    month: 'long',

    year: 'numeric',

  });

};



// CATEGORY ICON

const getCategoryIcon = (

  category: string,

): CategoryIconComponent => {

  const name = category.toLowerCase().trim();



  if (name.includes('salary') || name.includes('job'))

    return BriefcaseBusiness;



  if (name.includes('food') || name.includes('restaurant'))

    return Utensils;



  if (name.includes('travel') || name.includes('transport'))

    return Car;



  if (name.includes('shopping'))

    return ShoppingBag;



  if (name.includes('rent') || name.includes('house'))

    return House;



  if (name.includes('health') || name.includes('medical'))

    return HeartPulse;



  if (name.includes('education') || name.includes('study'))

    return GraduationCap;



  if (name.includes('entertainment') || name.includes('movie'))

    return Clapperboard;



  if (name.includes('gift'))

    return Gift;



  if (name.includes('investment') || name.includes('saving'))

    return TrendingUp;



  if (name.includes('freelance') || name.includes('business'))

    return Laptop;



  if (name.includes('coffee'))

    return Coffee;



  if (name.includes('flight') || name.includes('trip'))

    return Plane;



  if (name.includes('bill') || name.includes('payment'))

    return CreditCard;



  if (name.includes('cash'))

    return Banknote;



  return CircleHelp;

};



export default function TransactionsScreen() {

  const navigation =

    useNavigation<NativeStackNavigationProp<RootStackParamList>>();



  // DATA

  const [mobile, setMobile] = useState('');



  const [items, setItems] = useState<Transaction[]>([]);



  const [loading, setLoading] = useState(true);



  const [saving, setSaving] = useState(false);



  // SEARCH

  const [searchQuery, setSearchQuery] = useState('');

  // Independent month selector for the monthly income/expense overview.
  const currentMonthKey = `${new Date().getFullYear()}-${String(
    new Date().getMonth() + 1,
  ).padStart(2, '0')}`;
  const [selectedSummaryMonth, setSelectedSummaryMonth] =
    useState(currentMonthKey);



  // APPLIED FILTERS

  const [selectedType, setSelectedType] =

    useState<TransactionType>('all');



  const [selectedCategory, setSelectedCategory] =

    useState('all');



  const [selectedDateType, setSelectedDateType] =

    useState<DateFilterType>('all');



  const [selectedMonth, setSelectedMonth] = useState('');



  const [selectedYear, setSelectedYear] = useState('');



  const [selectedDate, setSelectedDate] = useState('');



  const [fromDate, setFromDate] = useState('');



  const [toDate, setToDate] = useState('');



  // TEMPORARY FILTERS

  const [filterVisible, setFilterVisible] = useState(false);



  const [tempType, setTempType] =

    useState<TransactionType>('all');



  const [tempCategory, setTempCategory] = useState('all');



  const [tempDateType, setTempDateType] =

    useState<DateFilterType>('all');



  const [tempMonth, setTempMonth] = useState('');

  const [monthPickerVisible, setMonthPickerVisible] = useState(false);

  const [monthPickerDate, setMonthPickerDate] = useState(new Date());



  const [tempYear, setTempYear] = useState('');



  const [tempDate, setTempDate] = useState('');



  const [tempFromDate, setTempFromDate] = useState('');



  const [tempToDate, setTempToDate] = useState('');





  // CALENDAR STATE

  const [calendarVisible, setCalendarVisible] = useState(false);

  const [calendarTarget, setCalendarTarget] = useState<'date' | 'from' | 'to'>('date');

  const [calendarViewDate, setCalendarViewDate] = useState(new Date());



  const openCalendar = (target: 'date' | 'from' | 'to') => {

    setCalendarTarget(target);



    const currentValue =

      target === 'date'

        ? tempDate

        : target === 'from'

        ? tempFromDate

        : tempToDate;



    const parsedDate = currentValue

      ? new Date(`${currentValue}T00:00:00`)

      : new Date();



    setCalendarViewDate(

      Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate,

    );

    setCalendarVisible(true);

  };



  const changeCalendarMonth = (amount: number) => {

    setCalendarViewDate(previous =>

      new Date(previous.getFullYear(), previous.getMonth() + amount, 1),

    );

  };



  const selectCalendarDate = (day: number) => {

    const year = calendarViewDate.getFullYear();

    const month = String(calendarViewDate.getMonth() + 1).padStart(2, '0');

    const date = String(day).padStart(2, '0');

    const value = `${year}-${month}-${date}`;



    if (calendarTarget === 'date') setTempDate(value);

    if (calendarTarget === 'from') setTempFromDate(value);

    if (calendarTarget === 'to') setTempToDate(value);



    setCalendarVisible(false);

  };



  // DELETE

  const [selectedId, setSelectedId] =

    useState<string | null>(null);



  const [alertAction, setAlertAction] =

    useState<'delete' | null>(null);



  // SWEET ALERT

  const [alertData, setAlertData] = useState({

    visible: false,

    title: '',

    message: '',

    type: 'info' as AlertType,

    confirmText: 'OK',

  });



  // EDIT

  const [editVisible, setEditVisible] = useState(false);



  const [editingItem, setEditingItem] =

    useState<Transaction | null>(null);



  const [editType, setEditType] =

    useState<'income' | 'expense'>('expense');



  const [editAmount, setEditAmount] = useState('');



  const [editCategory, setEditCategory] = useState('');



  const [editDate, setEditDate] = useState('');



  const [editDescription, setEditDescription] = useState('');



  // ALERT FUNCTION

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



  // CATEGORY LIST

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





  // Months that actually contain transactions, newest first.
  const availableMonths = useMemo(() => {
    const months = Array.from(
      new Set(
        items
          .map(item => getMonthKey(String(item.date || '')))
          .filter(Boolean),
      ),
    );
    return months.sort((a, b) => b.localeCompare(a));
  }, [items]);

  // Keep the selected month when possible; otherwise show the newest month.
  const activeSummaryMonth = availableMonths.includes(selectedSummaryMonth)
    ? selectedSummaryMonth
    : availableMonths[0] || selectedSummaryMonth;

  // ACTIVE FILTER COUNT

  const activeFilterCount =

    (selectedType !== 'all' ? 1 : 0) +

    (selectedCategory !== 'all' ? 1 : 0) +

    (selectedDateType !== 'all' ? 1 : 0);



  // SEARCH + TYPE + CATEGORY + DATE FILTER

  const filteredItems = useMemo(() => {

    let result = [...items];



    // TYPE FILTER

    if (selectedType !== 'all') {

      result = result.filter(

        item => item.type === selectedType,

      );

    }



    // CATEGORY FILTER

    if (selectedCategory !== 'all') {

      result = result.filter(

        item =>

          item.category?.toLowerCase().trim() ===

          selectedCategory.toLowerCase().trim(),

      );

    }



    // MONTHLY FILTER

    if (selectedDateType === 'month') {

      result = result.filter(

        item => getMonthKey(String(item.date || '')) === selectedMonth,

      );

    }



    // YEARLY FILTER

    if (selectedDateType === 'year') {

      result = result.filter(item =>

        item.date?.startsWith(selectedYear),

      );

    }



    // SPECIFIC DATE FILTER

    if (selectedDateType === 'date') {

      result = result.filter(

        item => item.date === selectedDate,

      );

    }



    // DATE RANGE FILTER

    if (selectedDateType === 'range') {

      result = result.filter(item => {

        const transactionDate = item.date;



        return (

          transactionDate >= fromDate &&

          transactionDate <= toDate

        );

      });

    }



    // SEARCH FILTER

    const query = searchQuery.trim().toLowerCase();



    if (query) {

      result = result.filter(item => {

        const searchableText = [

          item.category,

          item.description,

          item.title,

          item.amount,

          item.date,

          item.type,

        ]

          .map(value => String(value ?? '').toLowerCase())

          .join(' ');



        return searchableText.includes(query);

      });

    }



    // SORT BY NEWEST DATE

    result.sort((a, b) =>

      String(b.date || '').localeCompare(String(a.date || '')),

    );



    return result;

  }, [

    items,

    selectedType,

    selectedCategory,

    selectedDateType,

    selectedMonth,

    selectedYear,

    selectedDate,

    fromDate,

    toDate,

    searchQuery,

  ]);



  // MONTH-WISE INCOME & EXPENSE SUMMARY.
  // This summary uses only the selected month and is independent of list filters.
  const summary = useMemo(() => {
    const monthItems = items.filter(
      item => getMonthKey(String(item.date || '')) === activeSummaryMonth,
    );

    const income = monthItems
      .filter(item => item.type === 'income')
      .reduce((total, item) => total + Number(item.amount || 0), 0);

    const expense = monthItems
      .filter(item => item.type === 'expense')
      .reduce((total, item) => total + Number(item.amount || 0), 0);

    return {
      income,
      expense,
      saving: income - expense,
      total: monthItems.length,
    };
  }, [items, activeSummaryMonth]);

  // DATE FILTER LABEL

  const dateFilterLabel = useMemo(() => {

    if (selectedDateType === 'month') {

      return getMonthLabel(selectedMonth) || selectedMonth;

    }



    if (selectedDateType === 'year') {

      return selectedYear;

    }



    if (selectedDateType === 'date') {

      return selectedDate;

    }



    if (selectedDateType === 'range') {

      return `${fromDate} to ${toDate}`;

    }



    return '';

  }, [

    selectedDateType,

    selectedMonth,

    selectedYear,

    selectedDate,

    fromDate,

    toDate,

  ]);



  // MONTH PICKER

  const openMonthPicker = () => {

    const parsed = /^\d{4}-(0[1-9]|1[0-2])$/.test(tempMonth)

      ? new Date(Number(tempMonth.slice(0, 4)), Number(tempMonth.slice(5, 7)) - 1, 1)

      : new Date();

    setMonthPickerDate(parsed);

    setMonthPickerVisible(true);

  };



  const handleMonthPickerChange = (event: any, date?: Date) => {

    if (event?.type === 'dismissed') {

      setMonthPickerVisible(false);

      return;

    }

    if (date) {

      setMonthPickerDate(date);

      setTempMonth(

        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,

      );

    }

    setMonthPickerVisible(false);

  };



  // OPEN FILTER MODAL

  const openFilterModal = () => {

    setTempType(selectedType);

    setTempCategory(selectedCategory);



    setTempDateType(selectedDateType);

    setTempMonth(selectedMonth);

    setTempYear(selectedYear);

    setTempDate(selectedDate);

    setTempFromDate(fromDate);

    setTempToDate(toDate);



    setFilterVisible(true);

  };



  // APPLY FILTERS

  const applyFilters = () => {

    if (tempDateType === 'month') {

      if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(tempMonth)) {

        showSweetAlert(

          'Invalid Month',

          'Please choose a valid month.',

          'warning',

        );

        return;

      }

    }



    if (tempDateType === 'year') {

      if (!/^\d{4}$/.test(tempYear)) {

        showSweetAlert(

          'Invalid Year',

          'Please enter a valid year, e.g. 2026.',

          'warning',

        );

        return;

      }

    }



    if (

      tempDateType === 'date' &&

      !isValidDate(tempDate.trim())

    ) {

      showSweetAlert(

        'Invalid Date',

        'Please enter date in YYYY-MM-DD format.',

        'warning',

      );

      return;

    }



    if (tempDateType === 'range') {

      if (

        !isValidDate(tempFromDate.trim()) ||

        !isValidDate(tempToDate.trim())

      ) {

        showSweetAlert(

          'Invalid Date Range',

          'Please enter valid From Date and To Date.',

          'warning',

        );

        return;

      }



      if (tempFromDate > tempToDate) {

        showSweetAlert(

          'Invalid Date Range',

          'From Date cannot be greater than To Date.',

          'warning',

        );

        return;

      }

    }



    setSelectedType(tempType);

    setSelectedCategory(tempCategory);



    setSelectedDateType(tempDateType);

    setSelectedMonth(tempMonth);

    setSelectedYear(tempYear);

    setSelectedDate(tempDate);

    setFromDate(tempFromDate);

    setToDate(tempToDate);



    setFilterVisible(false);

  };



  // RESET FILTERS

  const resetAllFilters = () => {

    setTempType('all');

    setTempCategory('all');

    setTempDateType('all');



    setTempMonth('');

    setTempYear('');

    setTempDate('');

    setTempFromDate('');

    setTempToDate('');



    setSelectedType('all');

    setSelectedCategory('all');

    setSelectedDateType('all');



    setSelectedMonth('');

    setSelectedYear('');

    setSelectedDate('');

    setFromDate('');

    setToDate('');



    setSearchQuery('');



    setFilterVisible(false);

  };



  // CLEAR SEARCH

  const clearSearch = () => {

    setSearchQuery('');

  };



  // EDIT TRANSACTION

  const openEdit = (item: Transaction) => {

    setEditingItem(item);

    setEditType(item.type);

    setEditAmount(String(item.amount));

    setEditCategory(item.category || '');

    setEditDate(item.date || '');

    setEditDescription(item.description || '');

    setEditVisible(true);

  };



  // UPDATE TRANSACTION

  const handleUpdate = async () => {

    if (!editingItem || !mobile || saving) return;



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



      const updatedList = await updateTransaction(

        mobile,

        editingItem.id,

        updatedItem,

      );



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



  // DELETE TRANSACTION

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

    if (!selectedId || !mobile || saving) return;



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



  // ALERT CONFIRM

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

            <TouchableOpacity

              style={styles.editButton}

              activeOpacity={0.7}

              onPress={() => openEdit(item)}>

              <Pencil size={15} color="#159765" />

            </TouchableOpacity>



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

  const ListHeader = (

    <View>

      {/* TOTAL TRANSACTIONS */}

      <View style={styles.countCard}>

        <View style={styles.countIcon}>

          <ReceiptText size={19} color="#159765" />

        </View>



        <View style={styles.countDetails}>

          <Text style={styles.countTitle}>

            Transactions

          </Text>



          <Text style={styles.countSubtitle}>

            {selectedDateType === 'all'

              ? 'Your complete transaction history'

              : `Date filter: ${dateFilterLabel}`}

          </Text>

        </View>



        <Text style={styles.countNumber}>

          {summary.total}

        </Text>

      </View>



      {/* RESULT HEADER */}

      <View style={styles.filteredHeader}>

        <View style={styles.filteredHeaderDetails}>

          <Text style={styles.filteredTitle}>

            Transactions List

          </Text>



          <Text style={styles.filteredSubtitle}>

            {searchQuery.trim() || activeFilterCount > 0

              ? 'Filtered transaction results'

              : 'Showing all your transactions'}

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



      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity

          style={styles.backButton}

          onPress={() => navigation.goBack()}>

          <ArrowLeft size={21} color="#18392B" />

        </TouchableOpacity>



        <View style={styles.headerCenter}>

          <Text style={styles.title}>

            Transactions

          </Text>



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



      {/* SEARCH BAR */}

      <View style={styles.searchSection}>

        <View style={styles.searchContainer}>

          <Search size={20} color="#89968E" />



          <TextInput

            style={styles.searchInput}

            placeholder="Search transactions..."

            placeholderTextColor="#A0AAA4"

            value={searchQuery}

            onChangeText={setSearchQuery}

            returnKeyType="search"

            blurOnSubmit={false}

            autoCorrect={false}

            autoCapitalize="none"

            underlineColorAndroid="transparent"

          />



          {searchQuery.length > 0 && (

            <TouchableOpacity

              onPress={clearSearch}

              style={styles.searchClearButton}>

              <X size={17} color="#89968E" />

            </TouchableOpacity>

          )}



          <TouchableOpacity

            style={styles.searchFilterButton}

            onPress={openFilterModal}

            activeOpacity={0.75}>

            <SlidersHorizontal size={20} color="#FFFFFF" />



            {activeFilterCount > 0 && (

              <View style={styles.filterBadge}>

                <Text style={styles.filterBadgeText}>

                  {activeFilterCount}

                </Text>

              </View>

            )}

          </TouchableOpacity>

        </View>

      </View>



      {/* MONTHLY INCOME & EXPENSE OVERVIEW */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          marginHorizontal: 16,
          marginTop: 12,
          marginBottom: 12,
          padding: 15,
          borderRadius: 16,
          elevation: 2,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}>
          <Text style={{fontSize: 16, fontWeight: '800', color: '#18392B'}}>
            Monthly Overview
          </Text>
          <Text style={{fontSize: 12, color: '#89968E'}}>
            {getMonthLabel(activeSummaryMonth) || 'No month selected'}
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {availableMonths.map(month => {
            const active = activeSummaryMonth === month;
            return (
              <TouchableOpacity
                key={month}
                onPress={() => setSelectedSummaryMonth(month)}
                activeOpacity={0.75}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 9,
                  borderRadius: 20,
                  marginRight: 8,
                  backgroundColor: active ? '#159765' : '#F0F5F2',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '700',
                    color: active ? '#FFFFFF' : '#52645A',
                  }}>
                  {getMonthLabel(month)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {availableMonths.length === 0 && (
          <Text style={{color: '#89968E', fontSize: 12}}>
            No monthly transactions available.
          </Text>
        )}

        <View style={{flexDirection: 'row', marginTop: 14, gap: 10}}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#E8F7EE',
              borderRadius: 12,
              padding: 12,
            }}>
            <Text style={{fontSize: 12, color: '#16834F', fontWeight: '700'}}>
              Income
            </Text>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{fontSize: 18, color: '#16834F', fontWeight: '900', marginTop: 5}}>
              {formatAmount(summary.income)}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: '#FCEDEF',
              borderRadius: 12,
              padding: 12,
            }}>
            <Text style={{fontSize: 12, color: '#D84D5B', fontWeight: '700'}}>
              Expenses
            </Text>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{fontSize: 18, color: '#D84D5B', fontWeight: '900', marginTop: 5}}>
              {formatAmount(summary.expense)}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 12,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: '#EEF2EF',
          }}>
          <View>
            <Text style={{fontSize: 12, color: '#89968E', fontWeight: '700'}}>
              Monthly Saving
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '900',
                color: summary.saving >= 0 ? '#159765' : '#E53945',
                marginTop: 3,
              }}>
              {formatAmount(summary.saving)}
            </Text>
          </View>
          <Text style={{fontSize: 11, color: '#89968E'}}>
            {summary.total} transactions
          </Text>
        </View>
      </View>

      {/* ACTIVE FILTER LABELS */}

      {(selectedType !== 'all' ||

        selectedCategory !== 'all' ||

        selectedDateType !== 'all') && (

        <View style={styles.activeFilters}>

          {selectedType !== 'all' && (

            <View style={styles.activeFilterChip}>

              <Text style={styles.activeFilterText}>

                {selectedType === 'income' ? 'Income' : 'Expense'}

              </Text>

            </View>

          )}



          {selectedCategory !== 'all' && (

            <View style={styles.activeFilterChip}>

              <Text style={styles.activeFilterText}>

                {selectedCategory}

              </Text>

            </View>

          )}



          {selectedDateType !== 'all' && (

            <View style={styles.activeFilterChip}>

              <Text style={styles.activeFilterText}>

                {dateFilterLabel}

              </Text>

            </View>

          )}



          <TouchableOpacity onPress={resetAllFilters}>

            <Text style={styles.clearFiltersText}>

              Clear filters

            </Text>

          </TouchableOpacity>

        </View>

      )}



      {/* TRANSACTION LIST */}

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

          keyboardShouldPersistTaps="always"

          keyboardDismissMode="none"

          removeClippedSubviews={false}

          automaticallyAdjustKeyboardInsets={false}

          contentInsetAdjustmentBehavior="never"

          contentContainerStyle={[

            styles.listContent,

            filteredItems.length === 0 &&

              styles.emptyListContent,

          ]}

          ListEmptyComponent={

            <View style={styles.empty}>

              <View style={styles.emptyIcon}>

                <ReceiptText size={30} color="#159765" />

              </View>



              <Text style={styles.emptyTitle}>

                {searchQuery.trim()

                  ? 'No Matching Transactions'

                  : 'No Transactions Found'}

              </Text>



              <Text style={styles.emptyText}>

                {searchQuery.trim()

                  ? 'Try another keyword or clear your search.'

                  : 'Try changing your filters or add a new transaction.'}

              </Text>



              {(searchQuery.length > 0 ||

                activeFilterCount > 0) && (

                <TouchableOpacity

                  style={styles.emptyResetButton}

                  onPress={resetAllFilters}>

                  <Text style={styles.emptyResetText}>

                    Reset Search & Filters

                  </Text>

                </TouchableOpacity>

              )}

            </View>

          }

        />

      )}



      {/* FILTER MODAL */}

      <Modal

        visible={filterVisible}

        transparent

        animationType="slide"

        onRequestClose={() => setFilterVisible(false)}>

        <Pressable

          style={styles.filterModalOverlay}

          onPress={() => setFilterVisible(false)}>

          <Pressable

            style={styles.filterModal}

            onPress={() => {}}>



            {/* MODAL HEADER */}

            <View style={styles.filterModalHeader}>

              <View>

                <Text style={styles.filterModalTitle}>

                  Filter Transactions

                </Text>



                <Text style={styles.filterModalSubtitle}>

                  Customize your transaction results

                </Text>

              </View>



              <TouchableOpacity

                style={styles.modalClose}

                onPress={() => setFilterVisible(false)}>

                <X size={20} color="#52645A" />

              </TouchableOpacity>

            </View>



            <ScrollView

              showsVerticalScrollIndicator={false}

              keyboardShouldPersistTaps="handled">



              {/* TYPE FILTER */}

              <Text style={styles.filterModalLabel}>

                Transaction Type

              </Text>



              <View style={styles.filterTypeRow}>

                {(

                  ['all', 'income', 'expense'] as const

                ).map(type => {

                  const active = tempType === type;



                  return (

                    <TouchableOpacity

                      key={type}

                      style={[

                        styles.filterTypeButton,

                        active && styles.filterTypeActive,

                      ]}

                      onPress={() => setTempType(type)}>



                      {type === 'income' && (

                        <TrendingUp

                          size={15}

                          color={active ? '#FFFFFF' : '#159765'}

                        />

                      )}



                      {type === 'expense' && (

                        <TrendingDown

                          size={15}

                          color={active ? '#FFFFFF' : '#E53945'}

                        />

                      )}



                      {type === 'all' && (

                        <Wallet

                          size={15}

                          color={active ? '#FFFFFF' : '#718078'}

                        />

                      )}



                      <Text

                        style={[

                          styles.filterTypeText,

                          active && styles.filterTypeTextActive,

                        ]}>

                        {type === 'all'

                          ? 'All'

                          : type === 'income'

                          ? 'Income'

                          : 'Expense'}

                      </Text>

                    </TouchableOpacity>

                  );

                })}

              </View>



              {/* DATE FILTER */}

              <Text style={styles.filterModalLabel}>

                Filter By Date

              </Text>



              <View style={styles.dateOptions}>

                {(

                  [

                    'all',

                    'month',

                    'year',

                    'date',

                    'range',

                  ] as const

                ).map(type => {

                  const active = tempDateType === type;



                  const labels: Record<DateFilterType, string> = {

                    all: 'All Time',

                    month: 'Monthly',

                    year: 'Yearly',

                    date: 'Specific Date',

                    range: 'Date Range',

                  };



                  return (

                    <TouchableOpacity

                      key={type}

                      style={[

                        styles.dateOption,

                        active && styles.dateOptionActive,

                      ]}

                      onPress={() => setTempDateType(type)}>

                      <Text

                        style={[

                          styles.dateOptionText,

                          active && styles.dateOptionTextActive,

                        ]}>

                        {labels[type]}

                      </Text>

                    </TouchableOpacity>

                  );

                })}

              </View>



              {/* MONTHLY FILTER */}

              {tempDateType === 'month' && (

                <View>

                  <Text style={styles.inputLabel}>

                    Select Month

                  </Text>



                  <TouchableOpacity

                    style={[

                      styles.input,

                      {

                        flexDirection: 'row',

                        alignItems: 'center',

                        justifyContent: 'space-between',

                      },

                    ]}

                    activeOpacity={0.75}

                    onPress={openMonthPicker}>

                    <Text style={{color: tempMonth ? '#18392B' : '#A0AAA4'}}>

                      {tempMonth ? getMonthLabel(tempMonth) : 'Choose month'}

                    </Text>

                    <CalendarDays size={19} color="#159765" />

                  </TouchableOpacity>

                </View>

              )}



              {/* YEARLY FILTER */}

              {tempDateType === 'year' && (

                <View>

                  <Text style={styles.inputLabel}>

                    Select Year (YYYY)

                  </Text>



                  <TextInput

                    style={styles.input}

                    placeholder="2026"

                    placeholderTextColor="#A0AAA4"

                    value={tempYear}

                    onChangeText={setTempYear}

                    keyboardType="number-pad"

                    maxLength={4}

                  />

                </View>

              )}



              {/* SPECIFIC DATE FILTER */}

              {tempDateType === 'date' && (

                <View>

                  <Text style={styles.inputLabel}>

                    Select Date (YYYY-MM-DD)

                  </Text>



                  <TouchableOpacity

                    style={[styles.input, {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}

                    activeOpacity={0.75}

                    onPress={() => openCalendar('date')}>

                    <Text style={{color: tempDate ? '#18392B' : '#A0AAA4'}}>

                      {tempDate ? formatDate(tempDate) : 'Choose date'}

                    </Text>

                    <CalendarDays size={19} color="#159765" />

                  </TouchableOpacity>

                </View>

              )}



              {/* DATE RANGE FILTER */}

              {tempDateType === 'range' && (

                <View>

                  <Text style={styles.inputLabel}>

                    From Date (YYYY-MM-DD)

                  </Text>



                  <TouchableOpacity

                    style={[styles.input, {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}

                    activeOpacity={0.75}

                    onPress={() => openCalendar('from')}>

                    <Text style={{color: tempFromDate ? '#18392B' : '#A0AAA4'}}>

                      {tempFromDate ? formatDate(tempFromDate) : 'Choose start date'}

                    </Text>

                    <CalendarDays size={19} color="#159765" />

                  </TouchableOpacity>



                  <Text style={styles.inputLabel}>

                    To Date (YYYY-MM-DD)

                  </Text>



                  <TouchableOpacity

                    style={[styles.input, {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}

                    activeOpacity={0.75}

                    onPress={() => openCalendar('to')}>

                    <Text style={{color: tempToDate ? '#18392B' : '#A0AAA4'}}>

                      {tempToDate ? formatDate(tempToDate) : 'Choose end date'}

                    </Text>

                    <CalendarDays size={19} color="#159765" />

                  </TouchableOpacity>



                  <Text style={styles.hint}>

                    Transactions between these two dates will be displayed.

                  </Text>

                </View>

              )}



              {/* CATEGORY FILTER */}

              <Text style={styles.filterModalLabel}>

                Select Category

              </Text>



              <View style={styles.filterCategoryList}>

                {categories.map(category => {

                  const active = tempCategory === category;



                  const CategoryIcon =

                    category === 'all'

                      ? Filter

                      : getCategoryIcon(category);



                  const count =

                    category === 'all'

                      ? items.length

                      : items.filter(

                          item =>

                            item.category?.toLowerCase().trim() ===

                            category.toLowerCase().trim(),

                        ).length;



                  return (

                    <TouchableOpacity

                      key={category}

                      style={[

                        styles.filterCategoryItem,

                        active && styles.filterCategoryActive,

                      ]}

                      onPress={() => setTempCategory(category)}>



                      <View style={styles.filterCategoryLeft}>

                        <View style={styles.filterCategoryIcon}>

                          <CategoryIcon

                            size={18}

                            color={active ? '#159765' : '#718078'}

                          />

                        </View>



                        <Text

                          style={[

                            styles.filterCategoryText,

                            active && styles.filterCategoryTextActive,

                          ]}>

                          {category === 'all'

                            ? 'All Categories'

                            : category}

                        </Text>

                      </View>



                      <View style={styles.filterCategoryRight}>

                        <Text style={styles.filterCategoryCount}>

                          {count}

                        </Text>



                        {active && (

                          <View style={styles.filterCheck}>

                            <Check size={14} color="#FFFFFF" />

                          </View>

                        )}

                      </View>

                    </TouchableOpacity>

                  );

                })}

              </View>

            </ScrollView>



            {/* MODAL ACTIONS */}

            <View style={styles.filterModalActions}>

              <TouchableOpacity

                style={styles.filterResetButton}

                onPress={resetAllFilters}>

                <Text style={styles.filterResetText}>

                  Reset

                </Text>

              </TouchableOpacity>



              <TouchableOpacity

                style={styles.filterApplyButton}

                onPress={applyFilters}>

                <Text style={styles.filterApplyText}>

                  Apply Filters

                </Text>

              </TouchableOpacity>

            </View>

          </Pressable>

        </Pressable>

      </Modal>



      {/* MONTH PICKER */}

      {monthPickerVisible && (

        <DateTimePicker

          value={monthPickerDate}

          mode="date"

          display="default"

          onChange={handleMonthPickerChange}

        />

      )}



      {/* CALENDAR MODAL */}

      <Modal

        visible={calendarVisible}

        transparent

        animationType="fade"

        onRequestClose={() => setCalendarVisible(false)}>

        <Pressable

          style={{

            flex: 1,

            backgroundColor: 'rgba(0,0,0,0.45)',

            justifyContent: 'center',

            paddingHorizontal: 22,

          }}

          onPress={() => setCalendarVisible(false)}>

          <Pressable

            onPress={() => {}}

            style={{backgroundColor: '#FFFFFF', borderRadius: 20, padding: 18}}>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18}}>

              <TouchableOpacity onPress={() => changeCalendarMonth(-1)}>

                <ChevronLeft size={24} color="#18392B" />

              </TouchableOpacity>



              <Text style={{fontSize: 17, fontWeight: '900', color: '#18392B'}}>

                {calendarViewDate.toLocaleDateString('en-IN', {month: 'long', year: 'numeric'})}

              </Text>



              <TouchableOpacity onPress={() => changeCalendarMonth(1)}>

                <ChevronRight size={24} color="#18392B" />

              </TouchableOpacity>

            </View>



            <View style={{flexDirection: 'row', marginBottom: 8}}>

              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (

                <View key={day} style={{width: '14.2857%', alignItems: 'center'}}>

                  <Text style={{fontSize: 11, fontWeight: '800', color: '#89968E'}}>{day}</Text>

                </View>

              ))}

            </View>



            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>

              {Array.from({

                length: new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth(), 1).getDay(),

              }).map((_, index) => (

                <View key={`blank-${index}`} style={{width: '14.2857%', height: 42}} />

              ))}



              {Array.from({

                length: new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 0).getDate(),

              }).map((_, index) => {

                const day = index + 1;

                const year = calendarViewDate.getFullYear();

                const month = String(calendarViewDate.getMonth() + 1).padStart(2, '0');

                const dateValue = `${year}-${month}-${String(day).padStart(2, '0')}`;



                const selectedValue =

                  calendarTarget === 'date'

                    ? tempDate

                    : calendarTarget === 'from'

                    ? tempFromDate

                    : tempToDate;



                const selected = selectedValue === dateValue;



                return (

                  <TouchableOpacity

                    key={day}

                    onPress={() => selectCalendarDate(day)}

                    style={{width: '14.2857%', height: 42, alignItems: 'center', justifyContent: 'center'}}>

                    <View style={{

                      width: 34,

                      height: 34,

                      borderRadius: 11,

                      alignItems: 'center',

                      justifyContent: 'center',

                      backgroundColor: selected ? '#159765' : 'transparent',

                    }}>

                      <Text style={{

                        fontSize: 13,

                        fontWeight: selected ? '900' : '600',

                        color: selected ? '#FFFFFF' : '#18392B',

                      }}>

                        {day}

                      </Text>

                    </View>

                  </TouchableOpacity>

                );

              })}

            </View>



            <TouchableOpacity

              onPress={() => setCalendarVisible(false)}

              style={{marginTop: 16, height: 44, borderRadius: 12, backgroundColor: '#EEF3EF', alignItems: 'center', justifyContent: 'center'}}>

              <Text style={{fontSize: 13, fontWeight: '800', color: '#52645A'}}>Cancel</Text>

            </TouchableOpacity>

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

                placeholder="2026-11-02"

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

                    Cancel sdfsfsf

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


