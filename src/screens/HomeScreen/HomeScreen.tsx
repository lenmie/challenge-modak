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

  const filteredProducts = React.useMemo(() => {
    if (!products) return [];
    if (!selectedCategory) return products;
    return products.filter(product =>
      product.category.toLowerCase() === selectedCategory.name.toLowerCase()
    );
  }, [products, selectedCategory]);

  const [sortBy, setSortBy] = React.useState<'price' | 'rating' | undefined>();

  const sortedProducts = React.useMemo(() => {
    if (!filteredProducts) return [];
    if (!sortBy) return filteredProducts;
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      }
      if (sortBy === 'rating') {
        return (b.rating ?? 0) - (a.rating ?? 0);
      }
      return 0;
    });
  }, [filteredProducts, sortBy]);

  return (
    <CommonScreenContainer>
      <Header>
        <HeaderTitle>Product Store</HeaderTitle>
      </Header>

      <Picker
        selectedValue={sortBy}
        onValueChange={itemValue => setSortBy(itemValue as 'price' | 'rating')}
        style={styles.picker}
      >
        <Picker.Item label="Sort by" value="" />
        <Picker.Item label="Price" value="price" />
        <Picker.Item label="Rating" value="rating" />
      </Picker>

      {categoriesLoading && <StyledText>Loading categories...</StyledText>}
      {categoriesError && <StyledText>Error loading categories</StyledText>}
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
        data={sortedProducts}
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
