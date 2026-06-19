import React from 'react';
import { View, StyleSheet, ViewProps, ViewStyle, StyleProp } from 'react-native';
import { Colors, Spacing } from '@/constants/theme';
import { useThemeContext } from '@/hooks/use-theme';

interface CardProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  variant?: 'elevated' | 'outlined' | 'filled';
}

export const Card = ({ children, style, variant = 'elevated', ...props }: CardProps) => {
  const { colors } = useThemeContext();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return styles.elevated;
      case 'outlined':
        return styles.outlined;
      case 'filled':
        return styles.filled;
    }
  };

  return (
    <View style={[styles.card, getVariantStyles(), style]} {...props}>
      {children}
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: Spacing.four,
    backgroundColor: colors.surface,
  },
  elevated: {
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  filled: {
    backgroundColor: colors.backgroundElement,
  },
});
