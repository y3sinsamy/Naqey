import React from 'react';
import { Pressable, Text, StyleSheet, PressableProps, ViewStyle, TextStyle, ActivityIndicator, StyleProp } from 'react-native';
import { Colors, Spacing } from '@/constants/theme';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  style,
  textStyle,
  disabled,
  ...props
}: ButtonProps) => {
  const getBackgroundColor = (pressed: boolean) => {
    if (disabled) return Colors.light.backgroundElement;
    switch (variant) {
      case 'primary': return pressed ? Colors.light.onPrimaryContainer : Colors.light.primary;
      case 'secondary': return pressed ? Colors.light.backgroundSelected : Colors.light.backgroundElement;
      case 'outline': return pressed ? Colors.light.backgroundElement : 'transparent';
      case 'text': return pressed ? Colors.light.backgroundElement : 'transparent';
    }
  };

  const getTextColor = () => {
    if (disabled) return Colors.light.textSecondary;
    switch (variant) {
      case 'primary': return Colors.light.onPrimary;
      case 'secondary': return Colors.light.primary;
      case 'outline': return Colors.light.primary;
      case 'text': return Colors.light.primary;
    }
  };

  const getBorder = () => {
    if (variant === 'outline') {
      return { borderWidth: 1, borderColor: disabled ? Colors.light.outlineVariant : Colors.light.outline };
    }
    return {};
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small': return { paddingVertical: Spacing.two, paddingHorizontal: Spacing.three, minHeight: 36 };
      case 'medium': return { paddingVertical: 12, paddingHorizontal: Spacing.four, minHeight: 48 };
      case 'large': return { paddingVertical: Spacing.three, paddingHorizontal: Spacing.five, minHeight: 56 };
    }
  };

  return (
    <Pressable
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        getSizeStyle(),
        { backgroundColor: getBackgroundColor(pressed) },
        getBorder(),
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
