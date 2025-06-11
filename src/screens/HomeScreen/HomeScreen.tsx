import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { useGetProductsQuery } from '../../store/api/api';
import { FlatList } from 'react-native';
import { CommonScreenContainer } from '../../components/CommonScreenContainer';
import { StyledText } from '../../components/StyledText';
import ProductItem from './ProductItem';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type HomeScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Home'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp['navigation'];
  route?: HomeScreenNavigationProp['route'];
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { data, error, isLoading } = useGetProductsQuery();

  const products = data?.products;

  return (
    <CommonScreenContainer>
      <Header>
        <HeaderTitle>Product Store</HeaderTitle>
      </Header>

      {isLoading && <StyledText>Loading...</StyledText>}
      {error && <StyledText>Error loading products</StyledText>}
      <FlatList
        data={products}
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
