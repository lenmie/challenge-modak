import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from '../../store/api/api';
import { FlatList } from 'react-native';
import { CommonScreenContainer } from '../../components/CommonScreenContainer';
import { StyledText } from '../../components/StyledText';
import ProductItem from './ProductItem';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Category } from '../../store/api/types';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

type HomeScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp['navigation'];
  route?: HomeScreenNavigationProp['route'];
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsQuery();
  const [selectedCategory, setSelectedCategory] = React.useState<
    Category | undefined
  >();

  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery();

  const categories = categoriesData || [];

  const products = productsData?.products;

  const filteredProducts =
    products?.filter(product => {
      if (!selectedCategory) return true;
      return (
        product.category.toLowerCase() === selectedCategory.name.toLowerCase()
      );
    }) || [];

  return (
    <CommonScreenContainer>
      <Header>
        <HeaderTitle>Product Store</HeaderTitle>
      </Header>

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

      {productsLoading && <StyledText>Loading...</StyledText>}
      {productsError && <StyledText>Error loading products</StyledText>}
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ProductItem
            title={item.title}
            image={item.images?.[0]}
            price={item.price}
            thumbnail={item.thumbnail}
            onPress={() =>
              navigation.navigate('ProductDetail', {
                product: item,
              })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={<StyledText>No products available</StyledText>}
      />
    </CommonScreenContainer>
  );
};

const Header = styled.View`
  padding: 32px 0 16px 0;
  background-color: #f5f6fa;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const HeaderTitle = styled(StyledText)`
  font-size: 28px;
  font-weight: bold;
  color: #22223b;
`;

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
