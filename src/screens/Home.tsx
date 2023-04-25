import {View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Settings from './Settings';
import PartnerWidgetUpdate from './PartnerWidgetUpdate';
import {NavigationContainer} from '@react-navigation/native';
import HomeContent from './HomeContent';

const Drawer = createDrawerNavigator();
export default function Home() {
  return (
    <Drawer.Navigator
      screenOptions={{drawerType: 'slide', drawerHideStatusBarOnOpen: false}}>
      <Drawer.Screen name="HomeContent" component={HomeContent} />
      <Drawer.Screen name="Setings" component={Settings} />
      <Drawer.Screen
        name="WidgetUpdate"
        component={PartnerWidgetUpdate}
        options={{
          headerTitle: 'Partner Widget Updater',
          headerTitleAlign: 'center',
        }}
      />
    </Drawer.Navigator>
  );
}
