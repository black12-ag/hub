import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  Alert,
  BackHandler,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import WebViewScreen from './src/components/WebViewScreen';
import LoadingScreen from './src/components/LoadingScreen';
import ErrorScreen from './src/components/ErrorScreen';
import {checkInternetConnection} from './src/utils/networkUtils';

const HUBICHAT_URL = 'https://hubi.chat';

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Show splash screen for 2 seconds then load website
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Check internet connection
    checkInternetConnection().then(setIsConnected);

    // Handle back button on Android
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit HubiChat?',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Exit', onPress: () => BackHandler.exitApp()},
          ],
          {cancelable: false},
        );
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Show error screen if no connection
  if (!isConnected) {
    return (
      <ErrorScreen
        onRetry={() => {
          checkInternetConnection().then(setIsConnected);
        }}
      />
    );
  }

  // Load HubiChat website directly
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <WebViewScreen
        url={HUBICHAT_URL}
        title="HubiChat"
        isConnected={isConnected}
        onConnectionChange={setIsConnected}
      />
    </SafeAreaProvider>
  );
};

export default App;
