import {useNavigation} from '@react-navigation/native';
import {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, RadioButton} from 'react-native-paper';
import {GlobalContext} from '../store/global-context';
var SharedPreferences = require('react-native-shared-preferences');
import SplashScreen from 'react-native-splash-screen';

export default function Setup() {
  const [selectedName, setSelectedName] = useState('');
  const ctx = useContext(GlobalContext);
  const nav = useNavigation();

  useEffect(() => {
    async function Run() {
      SharedPreferences.getItem('Lover', function (value) {
        if (value) {
          ctx.setLover(value);
          SplashScreen.hide();
          nav.navigate('Home');
        } else {
          SplashScreen.hide();
        }
      });
    }
    Run();
  }, []);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.RadioContainer}>
        <View style={styles.RadioSubContainer}>
          <Text style={styles.QuestionText}>Who will be using this app ?</Text>
          <View style={styles.RadioItemsContainer}>
            <View style={styles.RadioItem}>
              <Text style={styles.RadioText}>Sandhya</Text>
              <RadioButton
                value="Sandhya"
                status={selectedName === 'Sandhya' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedName('Sandhya')}
              />
            </View>
            <View style={styles.RadioItem}>
              <Text style={styles.RadioText}>Shyam</Text>
              <RadioButton
                value="Shyam"
                onPress={() => setSelectedName('Shyam')}
                status={selectedName === 'Shyam' ? 'checked' : 'unchecked'}
              />
            </View>
          </View>
        </View>
      </View>
      <Button
        mode="contained"
        style={styles.ProceedBtn}
        onPress={() => {
          if (selectedName.length < 1) {
            alert('Choose an option to continue...');
            return;
          }
          if (selectedName === 'Shyam') {
            ctx.setLover('Sandhya');
            SharedPreferences.setItem('Lover', 'Sandhya');
          } else {
            ctx.setLover('Shyam');
            SharedPreferences.setItem('Lover', 'Shyam');
          }

          nav.navigate('Home');
        }}>
        Proceed
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  rootContainer: {
    alignItems: 'center',
  },
  RadioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 120,
  },
  RadioText: {
    fontSize: 18,
    fontWeight: '400',
  },
  RadioContainer: {
    width: '100%',
  },
  RadioSubContainer: {
    margin: 10,
    paddingStart: 15,
    backgroundColor: '#dccfcf',
    padding: 5,
    borderRadius: 10,
    elevation: 5,
  },
  QuestionText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  RadioItemsContainer: {
    marginTop: 10,
  },
  ProceedBtn: {
    maxWidth: 150,
  },
});
