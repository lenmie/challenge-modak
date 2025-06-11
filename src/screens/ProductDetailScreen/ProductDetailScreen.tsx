import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import { CommonScreenContainer } from '../../components/CommonScreenContainer';
import { StyledText } from '../../components/StyledText';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type ProductDetailNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetail'
>;

type ProductDetailScreenProps = {
  route: ProductDetailNavigationProp['route'];
  navigation: ProductDetailNavigationProp['navigation'];
};

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  route,
}) => {
  const { product } = route.params;

  return (
    <CommonScreenContainer>
      <Header>
        <HeaderTitle>{product.title}</HeaderTitle>
      </Header>
      <ImageContainer>
        <ProductImage
          source={{ uri: product.images?.[0] || product.thumbnail }}
          resizeMode="contain"
        />
      </ImageContainer>
      <InfoContainer>
        <StyledText style={{ fontSize: 22, fontWeight: 'bold' }}>
          ${product.price}
        </StyledText>
        <StyledText style={{ marginTop: 16 }}>{product.description}</StyledText>
      </InfoContainer>
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
  font-size: 24px;
  font-weight: bold;
  color: #22223b;
`;

const ImageContainer = styled.View`
  align-items: center;
  margin: 24px 0;
`;

const ProductImage = styled(Image)`
  width: 220px;
  height: 220px;
  border-radius: 12px;
  background-color: #f0f0f0;
`;

const InfoContainer = styled.View`
  padding: 0 20px;
`;
