import React from 'react';
import { AppNavigator } from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './store/redux';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
