import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type CommonScreenContainerProps = {
  children: React.ReactNode;
};

export const CommonScreenContainer = ({
  children,
}: CommonScreenContainerProps) => {
  return <SafeAreaView>{children}</SafeAreaView>;
};
