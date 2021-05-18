import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet,Text, StatusBar as RNStatusBar, View, Dimensions, ScrollView,Image, Platform, TouchableOpacity, Picker, TextInput} from 'react-native';
import 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { Divider } from 'react-native-paper';
const PostScreen = ({ navigation }) => {
  // const [selectedValue, setSelectedValue] = useState("");
  // const [ albums, setAlbums ] = useState([]);
  // const [ assets, setAssets ] = useState([]);
  // useEffect(() => {
  //   async function mediaLibraryAsync() {
  //     let {status} = await MediaLibrary.requestPermissionsAsync()
  //     const getAlbums = await MediaLibrary.getAlbumsAsync();
  //     console.log(getAlbums)
  //     setAlbums(getAlbums);
  //   }
  //   mediaLibraryAsync()
  // }, []);
  // async function mediaLibraryAssetsAsync(albumName) {
  //   let {status} = await MediaLibrary.requestPermissionsAsync()
  //   const getAssets = await MediaLibrary.getAssetsAsync({albumName});
  //   console.log(getAssets.assets);
  //   setAssets(getAssets);
  // }
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
  const [propicImage, setPropicImage] = useState(null);
  const [postImage, setPostImage] = useState(null);
  const [ username, setUsername] = useState('');
  const [ caption, setCaption ] = useState("");
    useEffect(() => {
      async function getdata() {
        const token = await AsyncStorage.getItem("token")
        // setUsername(token)
      
        fetch('http://yourip:3000/', { 
          headers: new Headers({
            Authorization:"Bearer "+token
          })
        })
        .then(res => res.json())
        .then((data) => {
          console.log(data.profilepic)
          setPropicImage(data.profilepic)
          setUsername(data.username)
        })
      }
      getdata();
    }, []);
    const _pickImage = async () => {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
          setPostImage(result.uri);
        }
  
        console.log(result);
      } catch (E) {
        console.log(E);
      }
    };
  const submitPost = async() => {
    fetch(`http://yourip:3000/uploads/posts/${username}`, {
      method: "POST",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        "postImage": postImage,
        "postCaption": caption
      })
    })
    .then((res) => res.json)
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
        <Text style={{color: '#000', fontSize: 20, paddingLeft: 20 }}>New Post</Text>
        <View style={{flex: 1}}></View>
        <Feather name="check" color='#2778e2' size={27} style={{paddingLeft: 5, paddingRight: 10}} onPress={() => submitPost()} />
      </View>
      <View style={styles.postbar}>
        <Image source={{uri: propicImage}} style={{height: 40, width: 40, borderRadius: 20}} />
        <TextInput
          value = {caption}
          onChangeText = {(text) => setCaption(text)}
          placeholder="Write a caption..."
          style={{marginLeft: 20, flex: 1}}
        />
        <TouchableWithoutFeedback onPress={_pickImage}>
          <Image source={{uri: postImage}} style={{height: 60, width: 60, backgroundColor: "#f1f1f1"}} />
        </TouchableWithoutFeedback>
      </View>
      <Divider />
      <Text style={{padding: 12, fontSize: 18}}>Tag People</Text>
      <Divider />
      <Text style={{padding: 12, fontSize: 18}}>Add Location</Text>
      <Divider />
      <Text style={{padding: 10, color: "#727272"}}>Advanced Settings</Text>
       {/* <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => {setSelectedValue(itemValue); mediaLibraryAssetsAsync(itemValue)}}
      >
        {albums.map((index) => (
          <Picker.Item label={index.title} value={index.title} key={index.title} />
        ))}
      </Picker>
      { assets !== undefined ? (
      assets.map((index) => (
        <TouchableOpacity>
          <View style={{width: Dimensions.get("screen").width / 3, height: Dimensions.get("screen").width / 3, backgroundColor: 'powderblue', borderWidth: 1, borderColor: '#fff'}}>
            <Image style={{width: Dimensions.get("screen").width / 3, height: Dimensions.get("screen").width / 3,}} source={{uri: index.uri}} />
          </View>
        </TouchableOpacity>
      )) ) : (<></>)} */}
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  texts:{
    color: '#777777',
    padding: 5,
  },
  tabbar: {
    flexDirection: 'row',
    height: 50,
    zIndex: 1,
    backgroundColor: '#ffffff',
    alignItems: "center"
    // borderBottomColor: '#e2e2e2',
    // borderBottomWidth: 1 
  },
  container: {
    flex: 1,
    marginTop: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight,
    backgroundColor: "#fff"
  },
  postbar: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
    alignItems: "center"
  }
})
