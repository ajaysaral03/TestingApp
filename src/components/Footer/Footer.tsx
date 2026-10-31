
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import {
  House,
  WalletCards,
  Plus,
  ChartPie,
  UserRound,
} from 'lucide-react-native';

import { styles } from './Footer.styles';

export type TabName =
  | 'Home'
  | 'Transactions'
  | 'Analytics'
  | 'Profile';

interface FooterProps {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
  onAddPress: () => void;
}

const tabs = [
  { name: 'Home' as const, label: 'Home', Icon: House },
  {
    name: 'Transactions' as const,
    label: 'Transactions',
    Icon: WalletCards,
  },
  {
    name: 'Analytics' as const,
    label: 'Analytics',
    Icon: ChartPie,
  },
  {
    name: 'Profile' as const,
    label: 'Profile',
    Icon: UserRound,
  },
];

const Footer = ({
  activeTab,
  onTabPress,
  onAddPress,
}: FooterProps) => {
  return (
    <View style={styles.container}>
      {/* Left Tabs */}
      {tabs.slice(0, 2).map(({ name, label, Icon }) => {
        const isActive = activeTab === name;

        return (
          <TouchableOpacity
            key={name}
            style={styles.tab}
            onPress={() => onTabPress(name)}
            activeOpacity={0.7}
          >
            <Icon
              size={22}
              color={isActive ? '#159765' : '#89968E'}
            />

            <Text
              style={[
                styles.label,
                isActive && styles.activeLabel,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Add Transaction Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={onAddPress}
        activeOpacity={0.8}
      >
        <Plus size={29} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Right Tabs */}
      {tabs.slice(2).map(({ name, label, Icon }) => {
        const isActive = activeTab === name;

        return (
          <TouchableOpacity
            key={name}
            style={styles.tab}
            onPress={() => onTabPress(name)}
            activeOpacity={0.7}
          >
            <Icon
              size={22}
              color={isActive ? '#159765' : '#89968E'}
            />

            <Text
              style={[
                styles.label,
                isActive && styles.activeLabel,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Footer;
