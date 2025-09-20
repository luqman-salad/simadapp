import React, { useState, useRef, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import useTheme from '../../hooks/usetheme';
import { useRouter } from 'expo-router';
import { Header } from '../../components/Headrer';

// Dummy data for transactions
const allTransactions = [
  { id: '1', description: 'Tuition & Fees', date: 'August 25, 2024', amount: -10000.00 },
  { id: '2', description: 'Housing Fee', date: 'August 25, 2024', amount: -2500.00 },
  { id: '3', description: 'University Scholarship', date: 'September 1, 2024', amount: 5000.00 },
  { id: '4', description: 'Federal Pell Grant', date: 'September 1, 2024', amount: 3000.00 },
  { id: '5', description: 'Tuition Payment', date: 'October 1, 2024', amount: -2000.00 },
];

const AllTransactionsBottomSheet = ({ onClose }) => {
  return (
    <View style={transactionsBottomSheetStyles.container}>
      <Text style={transactionsBottomSheetStyles.title}>All Financial Transactions</Text>
      <Text style={transactionsBottomSheetStyles.subtitle}>A complete history of your account activity.</Text>
      
      {/* Table Header */}
      <View style={transactionsBottomSheetStyles.tableHeader}>
        <Text style={[transactionsBottomSheetStyles.headerText, { flex: 2, textAlign: 'left' }]}>Description</Text>
        <Text style={[transactionsBottomSheetStyles.headerText, { flex: 1.2 }]}>Date</Text>
        <Text style={[transactionsBottomSheetStyles.headerText, { flex: 1, textAlign: 'right' }]}>Amount</Text>
      </View>

      {/* Transactions List */}
      <BottomSheetScrollView contentContainerStyle={transactionsBottomSheetStyles.scrollViewContent}>
        {allTransactions.map((transaction) => (
          <View key={transaction.id} style={transactionsBottomSheetStyles.transactionItem}>
            <View style={{ flex: 2 }}>
              <Text style={transactionsBottomSheetStyles.transactionDescription}>{transaction.description}</Text>
            </View>
            <Text style={[transactionsBottomSheetStyles.transactionDate, { flex: 1.2 }]}>{transaction.date}</Text>
            <Text 
              style={[
                transactionsBottomSheetStyles.transactionAmount, 
                { flex: 1 },
                transaction.amount < 0 ? transactionsBottomSheetStyles.negativeAmount : transactionsBottomSheetStyles.positiveAmount
              ]}
            >
              {transaction.amount < 0 ? `-$${Math.abs(transaction.amount).toFixed(2)}` : `+$${transaction.amount.toFixed(2)}`}
            </Text>
          </View>
        ))}
      </BottomSheetScrollView>

      {/* Back to Summary Button */}
      <TouchableOpacity onPress={onClose} style={transactionsBottomSheetStyles.backButton}>
        <Text style={transactionsBottomSheetStyles.backButtonText}>← Back to Summary</Text>
      </TouchableOpacity>
    </View>
  );
};

const MyFinancesScreen = () => {
  // Bottom sheet state and references
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['70%', '85%'], []);

  const { colors } = useTheme();
  const styles = createStyle(colors);
  const router = useRouter();

  const handleOpenTransactions = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleCloseTransactions = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.Wrapper}>
        <Header
        title="Finances"
        showLeftIcon
        leftIconName="chevron-back"
        onLeftIconPress={() => router.back()}
      />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>My Finances</Text>
            <Text style={styles.subtitle}>Your account summary for Fall 2024</Text>
          </View>

          {/* Account Summary Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Account Summary</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Charges:</Text>
              <Text style={styles.summaryValue}>$12,500.00</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Financial Aid:</Text>
              <Text style={[styles.summaryValue, styles.financialAidValue]}>-$8,000.00</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Remaining Balance:</Text>
              <Text style={[styles.summaryValue, styles.remainingBalanceValue]}>$4,500.00</Text>
            </View>
          </View>

          {/* Make a Payment Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Make a Payment</Text>
          </TouchableOpacity>

          {/* Recent Transactions Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Recent Transactions</Text>
            </View>
            
            {/* Transaction 1 */}
            <View style={styles.transactionItem}>
              <View>
                <Text style={styles.transactionTitle}>Tuition Payment</Text>
                <Text style={styles.transactionDate}>October 1, 2024</Text>
              </View>
              <Text style={[styles.transactionAmount, styles.negativeAmount]}>-$2,000.00</Text>
            </View>

            {/* Transaction 2 */}
            <View style={styles.transactionItem}>
              <View>
                <Text style={styles.transactionTitle}>Registration Fee</Text>
                <Text style={styles.transactionDate}>September 15, 2024</Text>
              </View>
              <Text style={[styles.transactionAmount, styles.negativeAmount]}>-$500.00</Text>
            </View>

            {/* Transaction 3 */}
            <View style={styles.transactionItem}>
              <View>
                <Text style={styles.transactionTitle}>University Scholarship</Text>
                <Text style={styles.transactionDate}>September 1, 2024</Text>
              </View>
              <Text style={[styles.transactionAmount, styles.positiveAmount]}>$5,000.00</Text>
            </View>

            {/* View All Transactions Link */}
            <TouchableOpacity onPress={handleOpenTransactions}>
              <Text style={styles.viewAllText}>View All Transactions →</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* All Transactions Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={transactionsBottomSheetStyles.bottomSheetBackground}
        handleIndicatorStyle={transactionsBottomSheetStyles.bottomSheetHandle}
      >
        <AllTransactionsBottomSheet onClose={handleCloseTransactions} />
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

// Main screen styles
const createStyle = (colors) => {
    return StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollViewContent: {
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 10,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.text,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.text,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  financialAidValue: {
    color: 'green',
  },
  remainingBalanceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.danger,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 10,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  transactionDate: {
    fontSize: 12,
    color: colors.text,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  negativeAmount: {
    color: colors.danger, // Red
  },
  positiveAmount: {
    color: colors.primary, // Green
  },
  viewAllText: {
    color: colors.secondary, // Blue
    textAlign: 'center',
    marginTop: 10,
  },
});
}

// Styles for the new bottom sheet
const transactionsBottomSheetStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  bottomSheetBackground: {
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  bottomSheetHandle: {
    backgroundColor: '#ccc',
    width: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontWeight: 'bold',
    color: '#555',
    fontSize: 14,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionDescription: {
    fontSize: 16,
    color: '#333',
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  negativeAmount: {
    color: '#e74c3c',
  },
  positiveAmount: {
    color: '#27ae60',
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 10,
  },
  backButtonText: {
    color: '#3498db',
    fontSize: 16,
  },
});

export default MyFinancesScreen;