import React from 'react';
import { Text, TextProps } from 'react-native';

export interface MaterialSymbolProps extends TextProps {
  name: string;
  size?: number;
  color?: string;
  fill?: boolean;
}

export const MaterialSymbol: React.FC<MaterialSymbolProps> = ({
  name,
  size = 24,
  color,
  fill = false,
  style,
  ...rest
}) => {
  return (
    <Text
      style={[
        {
          fontFamily: 'MaterialSymbolsOutlined_400Regular',
          fontSize: size,
          color,
          lineHeight: size,
        },
        style,
      ]}
      {...rest}
    >
      {name}
    </Text>
  );
};
