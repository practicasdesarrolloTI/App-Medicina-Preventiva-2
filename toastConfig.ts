import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ToastConfig } from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

type ToastType = 'success' | 'error' | 'info';

type ToastProps = {
  text1?: string;
  text2?: string;
  type?: ToastType;
};

const toastColors = {
  success: '#4CAF50',
  error: '#F44336',
  info: '#0D47A1',
};

const toastIcons = {
  success: 'checkmark-circle',
  error: 'alert-circle',
  info: 'information-circle',
};

export const toastConfig: ToastConfig = {
  customMulti: ({ text1, text2, type = 'info' }: ToastProps) => {
    const bgColor = toastColors[type];
    const iconName = toastIcons[type];

    return (
      <View style={[styles.toastContainer, { backgroundColor: bgColor }]}>
        <Ionicons name={iconName as any} size={28} color="#fff" style={styles.icon} />
        <View style={styles.textContainer}>
          {text1 && <Text style={styles.text1}>{text1}</Text>}
          {text2 && <Text style={styles.text2}>{text2}</Text>}
        </View>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 12,
    elevation: 4,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  text2: {
    fontSize: 14,
    color: '#fff',
  },
});
