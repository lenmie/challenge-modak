import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, ProductDetailScreen } from '../screens';
import { Product } from '../store/api/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Home: {
    type: string;
    value: string;
  };
  ProductDetail: {
    product: Product;
  };
};

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['challenge-modak://', 'https://challenge-modak.com'],
  config: {
    screens: {
      Home: {
        path: ':type/:value',
        parse: {
          type: (type: string) => type,
          value: (value: string) => value,
        },
      },
    },
  },
};

export function AppNavigator() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
