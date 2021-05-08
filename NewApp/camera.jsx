import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet,Text, TextInput, View, ScrollView, Dimensions, Platform, Alert,TouchableOpacity, StatusBar as RNStatusBar } from 'react-native';
import { Camera } from 'expo-camera';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CameraScreen = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [cameraRef, setCameraRef] = useState(null)
  const [flashBtn, setFlashBtn] = useState('md-flash-off');
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const types = [
    {
      title: 'Create',
      icon: 'format-letter-case'
    },
    {
      title: 'Boomerang',
      icon: 'infinity'
    },
    {
      title: 'Layout',
      icon: 'format-letter-case'
    },
    {
      title: 'Multi - Camera',
      icon: 'camera-control'
    },
    {
      title: 'Level',
      icon: 'scale-balance'
    },
  ]
  return (
    <View style={styles.container}>
      {/* <StatusBar hidden/> */}
      <Camera style={styles.camera} type={type}
        ratio={'16:9'}
        flashMode={flash} autoFocus="on"
        ref={ref => {setCameraRef(ref)}}>
        <View style={styles.tabbar}>
          <AntDesign name="setting" color='#fff' size={26} onPress={() => navigation.navigate('CameraSettings')} style={{ padding: 15}} />
          <View style={{flex: 1}}></View>
          <Ionicons
          onPress={() => {
            setFlash( 
              flash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.on
                : Camera.Constants.FlashMode.off
            );
            setFlashBtn(
              flashBtn === 'md-flash-off' 
              ? 'md-flash'
              : 'md-flash-off' );
          }}
          name={flashBtn} color='#fff' size={26} style={{ padding: 15}} />
          <View style={{flex: 1}}></View>
          <AntDesign onPress={() => navigation.goBack() } name="close" color='#fff' size={26} style={{ padding: 15}}  />
        </View>
        <View style={{flex: 1}}></View>
        <View>
          {types.map((index) => {
            return(
              <TouchableOpacity key={index.title} style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
                {index.title === 'Layout' ? <Feather name="layout" color="#fff" size={30} /> : <MaterialComunityIcons name={index.icon} color='#fff' size={34} />}
                <Text style={{fontWeight: 'bold', color: '#fff', paddingLeft: 15}}>{index.title}</Text>
              </TouchableOpacity>
            )
          })}
          <MaterialIcons name="keyboard-arrow-down" color='#fff' size={36} style={{ paddingLeft: 10}}  />
        </View>
        <View style={{flex: 0.3}}></View>
        <TouchableOpacity style={{alignSelf: 'center'}} 
        onLongPress = {async() => {
          if(cameraRef) {
            let photo = await cameraRef.recordAsync('photo');
          console.log('photo', photo);
          navigation.navigate('Story', {'photo': photo});
          }
        }}
        onPress={async() => {
          if(cameraRef){
          let photo = await cameraRef.takePictureAsync('photo');
          console.log('photo', photo);
          navigation.navigate('Story',{'photo':photo});
          }
          }}>
            <MaterialComunityIcons name="camera-iris" size={70} color="#fff" />
          </TouchableOpacity>
      </Camera>
        <View style={styles.bottombar}>
          <View style={{flexDirection: 'row'}}>
            <AntDesign name="picture" size={28} color='#fff' style={{padding: 15}} />
            <View style={{flex: 1}}></View>
            <Text style={styles.text}>STORY</Text>
            <View style={{flex: 1}}></View>
            <Ionicons
              style={styles.button}
              name="md-reverse-camera"
              color="#fff"
              size={34}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            />
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    
  },
  camera: {
    flex: 1,
    marginTop: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight
    // marginTop: 30
  },
  bottombar: {
    backgroundColor: '#000000',
    height: 100,
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    padding: 15
  },
  text: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  tabbar: {
    flexDirection: 'row',
    height: 50,
    zIndex: 1,
    backgroundColor: '#00000000',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 25: 0
},
});


export default CameraScreen;