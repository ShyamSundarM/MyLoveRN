import {Image, StyleSheet, Text, View} from 'react-native';
import database from '@react-native-firebase/database';
import {useContext, useState} from 'react';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {GlobalContext} from '../store/global-context';

export default function PartnerWidgetUpdate() {
  const [file, setFile] = useState();
  const [uploadStatus, setUploadStatus] = useState({
    status: '',
    isUploading: false,
  });
  const ctx = useContext(GlobalContext);
  const [msg, setMsg] = useState(null);
  const delay = (ms: Number) => new Promise(res => setTimeout(res, ms));
  async function pickPressed() {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (!result.didCancel) {
      setFile(result.assets[0]);
    }
  }
  function uploadPressed() {
    if (file) {
      if (!msg) {
        alert('Comment required bangaram');
        return;
      }
      setUploadStatus({status: 'Uploading...', isUploading: true});
      const ref = storage().ref(`/WidgetPics/${ctx.Lover}.jpg`);
      const dbRef = database().ref(`/${ctx.Lover}/Widget/value`);
      const task = ref.putFile(file.uri);
      task.then(async () => {
        setUploadStatus({status: 'generating url...', isUploading: true});
        const url = await ref.getDownloadURL();
        setUploadStatus({status: 'Updating db...', isUploading: true});
        dbRef.set({message: msg, photo: url}).then(async () => {
          setUploadStatus({status: 'Done babe', isUploading: false});
          await delay(1000);
          setUploadStatus({status: '', isUploading: false});
        });
      });
      task.catch(err => {
        console.log(err);
      });
    }
  }
  return (
    <View>
      <View style={[styles.form, file && styles.formOpen]}>
        <View>
          <Text style={styles.headingText}>Choose Image</Text>
          {file && (
            <Image
              source={{uri: file.uri}}
              style={styles.image}
              resizeMode="contain"
            />
          )}
          {file && (
            <TextInput
              disabled={uploadStatus.isUploading}
              label="Enter Comment for above image"
              style={styles.ipText}
              onChangeText={text => setMsg(text)}
            />
          )}
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Button
          mode="outlined"
          onPress={pickPressed}
          disabled={uploadStatus.isUploading}>
          Pick
        </Button>
        {file && (
          <Button
            loading={uploadStatus.isUploading}
            disabled={uploadStatus.isUploading}
            style={styles.uploadBtn}
            mode="contained"
            onPress={uploadPressed}>
            Upload
          </Button>
        )}
        <Text style={styles.statusText}>{uploadStatus.status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 10,
  },
  formOpen: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#e0d3d3',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
    marginVertical: 20,
  },
  headingText: {
    fontWeight: 'bold',
    fontSize: 21,
  },
  btnContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  uploadBtn: {
    marginStart: 10,
  },
  ipText: {
    borderRadius: 10,
  },
  statusText: {
    fontSize: 16,
    marginStart: 10,
    textAlignVertical: 'center',
    color: '#4c6246',
  },
});
