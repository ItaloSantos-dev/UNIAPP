import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import MarketplaceScreen from './src/screens/MarketplaceScreen';
import GroupsScreen from './src/screens/GroupsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

type Screen = 'login' | 'market' | 'groups' | 'profile';

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');

  return (
    <SafeAreaProvider>
      <StatusBar style={screen === 'login' ? 'light' : 'dark'} />

      {screen === 'login' && (
        <LoginScreen onLogin={() => setScreen('market')} />
      )}

      {screen === 'market' && (
        <MarketplaceScreen
          onNavigate={(s) => setScreen(s)}
          onLogout={() => setScreen('login')}
        />
      )}

      {screen === 'groups' && (
        <GroupsScreen onNavigate={(s) => setScreen(s)} />
      )}

      {screen === 'profile' && (
        <ProfileScreen
          onNavigate={(s) => setScreen(s)}
          onLogout={() => setScreen('login')}
        />
      )}
    </SafeAreaProvider>
  );
}