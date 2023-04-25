import {View} from 'react-native';
import {useEffect, useContext} from 'react';
import BackgroundService from 'react-native-background-actions';
import database from '@react-native-firebase/database';
import {GlobalContext} from '../store/global-context';
import {Button, Text} from 'react-native-paper';
import {setWidgetData} from '../interfaces/WidgetModule';
import {sendNotification} from '../interfaces/Helper';

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const veryIntensiveTask = async (name: string) => {
  const path = '/' + name + '/Widget/value';
  //console.log(path);
  database()
    .ref(path)
    .on('value', snapshot => {
      if (snapshot.exists()) {
        setWidgetData(
          snapshot.child('message').val(),
          snapshot.child('photo').val(),
        );
      }
    });

  await new Promise(async resolve => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
      console.log(i);
      await sleep(10000);
      database().ref('temp').set(i);
    }
  });
};

const options = {
  taskName: 'Example',
  taskTitle: 'Dont bother darling',
  taskDesc: 'ExampleTask description',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane',
  parameters: {
    delay: 1000,
  },
};

export default function HomeContent() {
  const ctx = useContext(GlobalContext);
  useEffect(() => {
    async function Run() {
      await BackgroundService.start(
        veryIntensiveTask.bind(this, ctx.User),
        options,
      );
      const task = await BackgroundService.updateNotification({
        taskDesc: "I'll always be there for you",
      });
    }
    if (!BackgroundService.isRunning()) Run();
  }, []);
  return (
    <View>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
        inventore nisi aperiam numquam! Aliquam, nulla, natus velit error
        voluptatibus suscipit accusantium, iure tenetur sapiente laboriosam iste
        a aliquid sint officia.
      </Text>
    </View>
  );
}
