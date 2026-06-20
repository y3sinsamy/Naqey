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
          fontFamily: 'MaterialSymbolsOutlined-Variable',
          fontSize: size,
          color,
          lineHeight: size,
          fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
        },
        style,
      ]}
      {...rest}
    >
      {name}
    </Text>
  );
};
