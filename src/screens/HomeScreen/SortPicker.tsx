import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

type SortPickerProps = {
  sortBy: 'price' | 'rating' | undefined;
  setSortBy: (value: 'price' | 'rating' | undefined) => void;
};

export const SortPicker: React.FC<SortPickerProps> = ({
  sortBy,
  setSortBy,
}) => (
  <Picker
    selectedValue={sortBy}
    onValueChange={itemValue => setSortBy(itemValue as 'price' | 'rating')}
    style={styles.picker}
  >
    <Picker.Item label="Sort by" value="" />
    <Picker.Item label="Price" value="price" />
    <Picker.Item label="Rating" value="rating" />
  </Picker>
);

const styles = StyleSheet.create({
  picker: {
    height: 100,
    width: '100%',
    marginVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
