import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Colors, Spacing } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const MOCK_DOCTORS = [
  { id: '1', name: 'د. سارة خالد', specialty: 'علاج سلوكي معرفي', rating: 4.8, reviews: 124, price: 150 },
  { id: '2', name: 'د. أحمد محمود', specialty: 'طب نفسي', rating: 4.9, reviews: 342, price: 200 },
  { id: '3', name: 'د. نورة سعد', specialty: 'إرشاد أسري', rating: 4.7, reviews: 89, price: 120 },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const renderDoctor = ({ item }: { item: typeof MOCK_DOCTORS[0] }) => (
    <Card style={styles.doctorCard}>
      <View style={styles.cardHeader}>
        <View style={styles.doctorAvatar}>
          <MaterialIcons name="person" size={32} color={Colors.light.primary} />
        </View>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{item.name}</Text>
          <Text style={styles.specialty}>{item.specialty}</Text>
        </View>
        <View style={styles.ratingBadge}>
          <MaterialIcons name="star" size={14} color="#FFB400" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.priceLabel}>سعر الجلسة</Text>
          <Text style={styles.priceText}>{item.price} ريال</Text>
        </View>
        <Button title="احجز الآن" size="small" />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ابحث عن طبيب</Text>
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color={Colors.light.outline} />
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث بالاسم أو التخصص..."
            placeholderTextColor={Colors.light.outline}
            value={searchQuery}
            onChangeText={setSearchQuery}
            textAlign="right"
          />
        </View>
      </View>

      <FlatList
        data={MOCK_DOCTORS}
        renderItem={renderDoctor}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    padding: Spacing.four,
    paddingTop: Spacing.six,
    backgroundColor: Colors.light.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.surfaceVariant,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.onSurface,
    marginBottom: Spacing.four,
    textAlign: 'right',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.backgroundElement,
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
  },
  searchInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: Spacing.two,
    fontSize: 16,
    color: Colors.light.text,
  },
  listContainer: {
    padding: Spacing.four,
    gap: Spacing.three,
  },
  doctorCard: {
    gap: Spacing.three,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  doctorAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.light.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.onSurface,
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFB400',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: Colors.light.surfaceVariant,
    paddingTop: Spacing.three,
    marginTop: Spacing.one,
  },
  priceLabel: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginBottom: 2,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.primary,
  },
});
