import NetInfo from '@react-native-community/netinfo';

export const checkInternetConnection = async (): Promise<boolean> => {
  try {
    const netInfoState = await NetInfo.fetch();
    return netInfoState.isConnected === true && netInfoState.isInternetReachable === true;
  } catch (error) {
    console.error('Error checking internet connection:', error);
    return false;
  }
};

export const subscribeToNetworkChanges = (callback: (isConnected: boolean) => void) => {
  return NetInfo.addEventListener(state => {
    const isConnected = state.isConnected === true && state.isInternetReachable === true;
    callback(isConnected);
  });
};

export const isValidHubiChatUrl = (url: string): boolean => {
  try {
    const urlObject = new URL(url);
    return urlObject.hostname === 'hubi.chat' && urlObject.protocol === 'https:';
  } catch (error) {
    return false;
  }
};

export const testHubiChatConnection = async (): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch('https://hubi.chat', {
      method: 'HEAD',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.error('Error testing HubiChat connection:', error);
    return false;
  }
};
