import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';
import { Category } from '../../store/api/types';
import { StyledText } from '../../components/StyledText';

type CategoryPickerProps = {
  categories: Category[];
  selectedCategory?: Category;
  setSelectedCategory: (cat?: Category) => void;
  loading: boolean;
  error: boolean;
};

export const CategoryPicker: React.FC<CategoryPickerProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  loading,
  error,
}) => (
  <>
    {loading && <StyledText>Loading categories...</StyledText>}
    {error && <StyledText>Error loading categories</StyledText>}
    <Picker
      selectedValue={selectedCategory?.name}
      onValueChange={(itemValue, itemIndex) => {
        const category = categories[itemIndex - 1];
        setSelectedCategory(category);
      }}
      style={styles.picker}
    >
      <Picker.Item label="All Categories" value="" />
      {categories.map((category, index) => (
        <Picker.Item
          key={index}
          label={category.name}
          value={category.name}
        />
      ))}
    </Picker>
  </>
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