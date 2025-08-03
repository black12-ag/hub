import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
  SafeAreaView,
} from 'react-native';
import {WebView, WebViewNavigation} from 'react-native-webview';
import {checkInternetConnection} from '../utils/networkUtils';

interface WebViewScreenProps {
  url: string;
  title: string;
  isConnected: boolean;
  onConnectionChange: (connected: boolean) => void;
}

const WebViewScreen: React.FC<WebViewScreenProps> = ({
  url,
  title,
  isConnected,
  onConnectionChange,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const webViewRef = useRef<WebView>(null);

  const handleLoadStart = () => {
    setLoading(true);
    setError(false);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
    checkInternetConnection().then(onConnectionChange);
  };

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    // Handle navigation changes if needed
    // Can implement deep linking or URL validation here
  };

  const retry = () => {
    setError(false);
    setLoading(true);
    checkInternetConnection().then((connected) => {
      onConnectionChange(connected);
      if (connected && webViewRef.current) {
        webViewRef.current.reload();
      }
    });
  };

  const injectedJavaScript = `
    // Improve mobile experience
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    document.getElementsByTagName('head')[0].appendChild(meta);
    
    // Add mobile-specific styles
    const style = document.createElement('style');
    style.innerHTML = \`
      body {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
      }
      
      /* Improve button tap targets */
      button, a, input, select, textarea {
        min-height: 44px;
        min-width: 44px;
      }
      
      /* Fix iOS specific issues */
      input, textarea, select {
        -webkit-appearance: none;
        border-radius: 0;
      }
    \`;
    document.head.appendChild(style);
    
    true; // Always return true
  `;

  if (error && !isConnected) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <ActivityIndicator size="large" color="#E91E63" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.webViewContainer}>
        <WebView
          ref={webViewRef}
          source={{uri: url}}
          style={styles.webView}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
          onNavigationStateChange={handleNavigationStateChange}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          allowsBackForwardNavigationGestures={true}
          mixedContentMode="compatibility"
          thirdPartyCookiesEnabled={true}
          sharedCookiesEnabled={true}
          injectedJavaScript={injectedJavaScript}
          userAgent={`HubiChatMobile/1.0 ${Platform.OS === 'ios' ? 'iOS' : 'Android'}`}
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#E91E63" />
            </View>
          )}
          onMessage={(event) => {
            // Handle messages from web content if needed
            console.log('Message from WebView:', event.nativeEvent.data);
          }}
          onShouldStartLoadWithRequest={(request) => {
            // Allow all requests to hubi.chat domain
            if (request.url.startsWith('https://hubi.chat')) {
              return true;
            }
            // Block external links or handle them differently
            return false;
          }}
        />
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#E91E63" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webViewContainer: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

export default WebViewScreen;
