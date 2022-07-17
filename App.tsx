/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {UIProvider} from './app/hooks/UIProvider';
import Navigator from './app/navigation/Navigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <UIProvider>
        <Navigator />
      </UIProvider>
    </SafeAreaProvider>
  );
};

export default App;
