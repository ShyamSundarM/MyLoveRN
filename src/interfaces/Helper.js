import {NativeModules} from 'react-native';

const handler = NativeModules.HelperModule;

export const sendNotification = () => {
  handler.createNotification();
};
