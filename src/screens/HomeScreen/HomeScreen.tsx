import React, { useEffect } from 'react';
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
import GenericAlertModal from '../../components/GenericAlertModal';
import { SortPicker } from './SortPicker';
import { CategoryPicker } from './CategoryPicker';
import { handleDeepLink } from './utils';

type HomeScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp['navigation'];
  route?: HomeScreenNavigationProp['route'];
};

export const HomeScreen: React.FC<HomeScreenProps> = ({
  navigation,
  route,
}) => {
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
  const { type, value } = route?.params || {};

  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    if (productsError) {
      setError('Failed to load products');
    } else if (categoriesError) {
      setError('Failed to load categories');
    } else {
      setError(null);
    }
  }, [productsError, categoriesError]);

  const filteredProducts = React.useMemo(() => {
    if (!products) return [];
    if (!selectedCategory) return products;
    return products.filter(
      product =>
        product.category.toLowerCase() === selectedCategory.name.toLowerCase(),
    );
  }, [products, selectedCategory]);

  const [sortBy, setSortBy] = React.useState('');

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

  useEffect(() => {
    handleDeepLink({
      type,
      value,
      categories,
      products,
      setSelectedCategory,
      navigation,
      setError,
    });
  }, [type, value, categories, products]);

  return (
    <CommonScreenContainer>
      <Header>
        <HeaderTitle>Product Store</HeaderTitle>
      </Header>

      <GenericAlertModal
        isOpen={!!error}
        title="Error"
        message={error || ''}
        onClose={() => setError(null)}
        confirmText="OK"
      />

      <SortPicker sortBy={sortBy} setSortBy={setSortBy} />

      <CategoryPicker
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        loading={categoriesLoading}
        error={!!categoriesError}
      />
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
