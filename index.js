/**
 * @format
 */
import 'react-native-gesture-handler';
import 'react-native-splash-screen';
import {Provider as PaperProvider} from 'react-native-paper';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import GlobalContextProvider from './src/store/global-context';

export default function Main() {
  return (
    <GlobalContextProvider>
      <PaperProvider>
        <App />
      </PaperProvider>
    </GlobalContextProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
