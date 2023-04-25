import {NativeModules} from 'react-native';

const handler = NativeModules.WidgetModule;

export const setWidgetData = (msg, url) => {
  handler.setWidgetData(msg, url);
};
