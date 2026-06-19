import React from 'react';
import { Pressable, Text, StyleSheet, PressableProps, ViewStyle, TextStyle, ActivityIndicator, StyleProp } from 'react-native';
import { Colors, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';
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
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const getBackgroundColor = (pressed: boolean) => {
    if (disabled) return colors.backgroundElement;
    switch (variant) {
      case 'primary': return pressed ? colors.onPrimaryContainer : colors.primary;
      case 'secondary': return pressed ? colors.backgroundSelected : colors.backgroundElement;
      case 'outline': return pressed ? colors.backgroundElement : 'transparent';
      case 'text': return pressed ? colors.backgroundElement : 'transparent';
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.textSecondary;
    switch (variant) {
      case 'primary': return colors.onPrimary;
      case 'secondary': return colors.primary;
      case 'outline': return colors.primary;
      case 'text': return colors.primary;
    }
  };

  const getBorder = () => {
    if (variant === 'outline') {
      return { borderWidth: 1, borderColor: disabled ? colors.outlineVariant : colors.outline };
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

const createStyles = (colors: any) => StyleSheet.create({
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
