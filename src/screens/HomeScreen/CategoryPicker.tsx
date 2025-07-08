import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
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
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedCategory?.name || null);

  const items = [
    { label: 'All Categories', value: '' },
    ...categories.map(category => ({
      label: category.name,
      value: category.name,
    })),
  ];

  return (
    <View style={styles.container}>
      {loading && <StyledText>Loading categories...</StyledText>}
      {error && <StyledText>Error loading categories</StyledText>}
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        onSelectItem={(item) => {
          if (!item.value) {
            setSelectedCategory(undefined);
          } else {
            const category = categories.find(cat => cat.name === item.value);
            setSelectedCategory(category);
          }
        }}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={styles.text}
        placeholder="Select a category"
        searchable={false}
        disabled={loading || error}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    zIndex: 10,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 8,
    height: 50,
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});