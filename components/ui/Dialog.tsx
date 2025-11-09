import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DialogProps {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ visible, onClose, children }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={22} color="#6b7280" />
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </Modal>
  );
};

// ✅ DialogHeader
export const DialogHeader: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <View style={styles.header}>{children}</View>
);

// ✅ DialogTitle
export const DialogTitle: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <Text style={styles.title}>{children}</Text>
);

// ✅ DialogDescription
export const DialogDescription: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <Text style={styles.description}>{children}</Text>
);

// ✅ DialogContent
export const DialogContent: React.FC<{ children?: React.ReactNode; style?: any }> = ({
  children,
  style,
}) => <View style={[styles.dialogContent, style]}>{children}</View>;

// ✅ DialogFooter
export const DialogFooter: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <View style={styles.footer}>{children}</View>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '85%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 4,
    opacity: 0.7,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827', // text-gray-900
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6b7280', // text-muted-foreground
  },
  dialogContent: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 8,
  },
});
