import React, { useRef, useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet,Text, View, Dimensions, ScrollView, Platform, Image,TouchableOpacity, StatusBar as RNStatusBar } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { yourip } from './helpers/keys'
const EditProfileScreen = ({route, navigation}) => {
  
  const [name, setName] = useState(name);
  const [username, setUsername] = useState(username);
  const [website, setWebsite] = useState('');
  const [bio, setBio] = useState(bio);
  const [propicImage, setPropicImage] = useState(null);
  const componentDidMount = () => {
    this.getPermissionAsync();
  }

  const getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setPropicImage(result.uri);
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
  useEffect(() => {
    async function getdata() {
      const token = await AsyncStorage.getItem("token")
      // setUsername(token)
    
      fetch(`http://${yourip}:3000/`, {
        headers: new Headers({
          Authorization:"Bearer "+token
        })
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setUsername(data.username);
        setPropicImage(data.profilepic);
        setName(data.name)
        setBio(data.bio)
      })
    }
    getdata();
  }, []);
  const submitProfile = async() => {
    const token = await AsyncStorage.getItem("token")
    fetch(`http://${yourip}:3000/updateprofile`, {
      method: "POST",
      headers: new Headers({
        Authorization:"Bearer "+token,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        "profilepic": propicImage,
        "name": name,
        "email": route.params?.email,
        "phone": route.params?.phone,
        "bio": bio,
        "gender": route.params?.gender,
        "birthday": route.params?.birthday
      })
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      try {
        navigation.navigate('Profile')
      } catch (error) {
        console.log(error)
      }
    })
  }
  return(
    <View style={styles.container}>
      <View style={styles.tabbar}>
        <AntDesign onPress={() => navigation.goBack()} name="close" size={27} style={{ paddingLeft: 10}}  />
          <Text style={{color: '#000', fontSize: 20, paddingLeft: 20 }}>Edit Profile</Text>
        <View style={{flex: 1}}></View>
        <Feather name="check" color='#2778e2' size={27} style={{paddingLeft: 5, paddingRight: 10}} onPress={()=> submitProfile()}  />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
      <TouchableWithoutFeedback onPress={_pickImage} style={{alignItems: 'center'}}>
        <Image source={{uri: propicImage}} style={styles.profilepic} />
        <Text style={{padding: 10, fontSize: 20, color: '#2778e2'}}>Change Profile Photo</Text>
      </TouchableWithoutFeedback>
        <TextInput
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
          style={{width: Dimensions.get('window').width - 25, backgroundColor: '#00000000', marginBottom: 10}}
        />
        <TextInput
          label="Username"
          value={username}
          onChangeText={text => setUsername(text)}
          style={{width: Dimensions.get('window').width - 25, backgroundColor: '#00000000', marginBottom: 10}}
        />
        <TextInput
          label="Website"
          value={website}
          onChangeText={text => setWebsite(text)}
          style={{width: Dimensions.get('window').width - 25, backgroundColor: '#00000000',marginBottom: 10}}
        />
        <TextInput
          label="Bio"
          value={bio}
          onChangeText={text => setBio(text)}
          style={{width: Dimensions.get('window').width - 25, backgroundColor: '#00000000',marginBottom: 10}}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btntext}>Switch to Professional account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate('PersonalInfo')}
        >
          <Text style={styles.btntext}>Personal Information Settings</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight
  },
  tabbar: {
    flexDirection: 'row',
    height: 50,
    zIndex: 1,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1,
    alignItems: 'center'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 13
  },
  profilepic: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  button: {
    width: Dimensions.get('screen').width,
    borderTopColor: '#e2e2e2',
    borderTopWidth: 1,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1,
    padding: 13,
    marginTop: 10
  },
  btntext: {
    color: '#2778e2',
    fontSize: 17
  }
})