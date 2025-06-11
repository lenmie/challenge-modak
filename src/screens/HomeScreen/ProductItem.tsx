import React from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';
import { StyledText } from '../../components/StyledText';

const ProductItem = ({
  title,
  image,
  price,
  thumbnail,
}: {
  title: string;
  image?: string;
  price: number;
  thumbnail?: string;
}) => (
  <Container>
    <ProductImage source={{ uri: thumbnail || image }} resizeMode="cover" />
    <InfoContainer>
      <Title>{title}</Title>
      <Price>${price}</Price>
    </InfoContainer>
  </Container>
);

export default ProductItem;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 12px;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
  elevation: 2;
`;

const ProductImage = styled(Image)`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  margin-right: 16px;
  background-color: #eee;
`;

const InfoContainer = styled.View`
  flex: 1;
`;

const Title = styled(StyledText)`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const Price = styled(StyledText)`
  font-size: 16px;
  color: #888;
`;
