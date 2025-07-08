import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

type SortPickerProps = {
  sortBy: string;
  setSortBy: (value: string) => void;
};

export const SortPicker: React.FC<SortPickerProps> = ({
  sortBy,
  setSortBy,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(sortBy);

  const items = [
    { label: 'Sort by', value: '' },
    { label: 'Price', value: 'price' },
    { label: 'Rating', value: 'rating' },
  ];

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        onSelectItem={item => {
          setSortBy(item.value as 'price' | 'rating');
        }}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={styles.text}
        placeholder="Sort by"
        searchable={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    zIndex: 15,
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
