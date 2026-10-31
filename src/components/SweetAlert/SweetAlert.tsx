
import React, { useEffect, useRef } from 'react';

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Pressable,
} from 'react-native';

import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
} from 'lucide-react-native';

import { styles } from './SweetAlert.styles';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface SweetAlertProps {
  visible: boolean;
  title: string;
  message: string;
  type?: AlertType;

  // Support both prop names
  buttonText?: string;
  confirmText?: string;

  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const SweetAlert = ({
  visible,
  title,
  message,
  type = 'success',
  buttonText,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: SweetAlertProps) => {
  const scale = useRef(new Animated.Value(0.8)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const confirmLock = useRef(false);

  const finalButtonText =
    confirmText || buttonText || 'Okay';

  useEffect(() => {
    if (!visible) {
      scale.setValue(0.8);
      opacity.setValue(0);
      confirmLock.current = false;
      return;
    }

    confirmLock.current = false;

    const animation = Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),

      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => {
      animation.stop();
    };
  }, [visible, scale, opacity]);

  const iconSettings = {
    success: {
      Icon: CheckCircle2,
      color: '#159765',
      background: '#E5F7ED',
    },
    error: {
      Icon: AlertCircle,
      color: '#E85C68',
      background: '#FFF0F0',
    },
    warning: {
      Icon: AlertTriangle,
      color: '#E6A23C',
      background: '#FFF6E5',
    },
    info: {
      Icon: Info,
      color: '#398CE0',
      background: '#EAF3FF',
    },
  };

  const { Icon, color, background } = iconSettings[type];

  const handleConfirm = () => {
    if (confirmLock.current) {
      return;
    }

    confirmLock.current = true;
    onConfirm();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        {/* Background */}
        <Pressable
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
          onPress={handleCancel}
        />

        {/* Alert Card */}
        <Animated.View
          style={[
            styles.dialog,
            {
              opacity,
              transform: [{ scale }],
            },
          ]}
        >
          {/* Icon */}
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: background },
            ]}
          >
            <Icon
              size={39}
              color={color}
              strokeWidth={2}
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>
            {title}
          </Text>

          {/* Message */}
          <Text style={styles.message}>
            {message}
          </Text>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            {cancelText ? (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelText}>
                  {cancelText}
                </Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              style={[
                styles.confirmButton,
                { backgroundColor: color },
                !cancelText && styles.fullButton,
              ]}
              onPress={handleConfirm}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmText}>
                {finalButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default SweetAlert;
