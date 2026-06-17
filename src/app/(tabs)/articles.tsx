import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '@/constants/theme';

export default function ArticlesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>المقالات</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.light.text,
  },
});
