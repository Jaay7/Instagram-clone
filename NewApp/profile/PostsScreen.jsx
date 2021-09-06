import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet,Text, StatusBar as RNStatusBar, View, Dimensions, ScrollView, Platform, Alert,TouchableOpacity, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BottomSheet } from 'react-native-btr';
import Feather from 'react-native-vector-icons/Feather';
import { Divider } from 'react-native-elements';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { yourip } from '../helpers/keys';
const PostsScreen = ({navigation}) => {
  // const { username } = route.params;
  const [notLiked, setLiked] = useState('hearto');
  const [notSaved, setSaved] = useState('bookmark-o');
  const [notLikedColor, setLikedColor] = useState('#000000');
  const [bSheetVisible, setBSheetVisible] = useState(false);
  const [ username, setUsername] = useState('')
  const [ name, setName ] = useState('')
  const [propicImage, setPropicImage] = useState(null);
  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setBSheetVisible(!bSheetVisible);
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
        setUsername(data.username);
        setPropicImage(data.profilepic);
        setName(data.name);
      })
    }
    getdata();
  }, []);
  const [ allPosts, setAllPosts ] = useState(allPosts);
  useEffect(() => {
    async function getdata() {
      fetch(`http://${yourip}:3000/uploads/posts/${username}`, {
        method: "GET"
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setAllPosts(data.allPostsOfUser)
      })
    }
    getdata();
  }, [username]);
  return(
    <View style={styles.container}>
      <View style={styles.tabbar}>
        <AntDesign onPress={() => navigation.goBack() } name="arrowleft" color='#000' size={26} style={{ padding: 10}}  />
        <Text style={{color: '#000', fontSize: 19, paddingLeft: 10, fontWeight: '700' }}>Posts</Text>
      </View>
      <ScrollView>
        {allPosts !== undefined ? (
          allPosts.map((index) => {
            return(
            <View key={index._id}>
              <View style={styles.postbar}>
                <Image style={{height: 30, width: 30, borderRadius: 15, alignSelf: 'center', marginLeft: 15}} source={{uri: propicImage}}/>
                <View style={{flex: 1, flexDirection: 'column', paddingLeft: 10, alignSelf: 'center'}}>
                  <Text style={styles.postname}>{index.username}</Text>
                  {index.postLocation !== '' ? (
                    <Text style={styles.postsub}>{index.postLocation}</Text>
                  ) : (<></>)}
                </View>
                <View style={{flex: 1}}></View>
                <MaterialComunityIcons
                  name="dots-vertical" color='#000' size={28} style={{marginVertical: 10, paddingLeft: 10, paddingRight: 10}}  />
              </View>
              <Image source={{uri: index.postImage}} style={{height: 400, width: Platform.OS === 'web' ? 500 : Dimensions.get('window').width, }} />
              <View style={styles.postbar}>
                <AntDesign name={notLiked} color={notLikedColor} 
                onPress={() => {
                  setLiked(
                    notLiked === 'hearto' ? 'heart' : 'hearto'
                  );
                  setLikedColor(
                    notLikedColor === '#000000' ? '#ff5151' : '#000000'
                  )
                }}
                size={27} style={{alignSelf: 'center', paddingLeft: 10}} />
                <Feather name="message-circle" color='#000' size={29} style={{ alignSelf: 'center', paddingLeft: 12}}  />
                <Feather name="send" color='#000' size={26} style={{ alignSelf: 'center', paddingLeft: 12}}  />
                <View style={{flex: 1}}></View>
                <FontAwesome name={notSaved} 
                  onPress={() => {
                    setSaved(
                      notSaved === 'bookmark-o' ? 'bookmark' : 'bookmark-o'
                    );
                  }}
                  onLongPress={toggleBottomNavigationView}
                color='#000' size={28} style={{alignSelf: 'center', paddingLeft: 18, paddingRight: 10}}  />
              </View>
              <View style={styles.postbottom}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Image style={{height: 22, width: 22, borderRadius: 11}} source={{uri: propicImage}}/>
                  <Text style={{color: '#000'}}>  Liked by </Text>
                  <Text style={{color: '#000', fontWeight: 'bold'}}>jaaayyy </Text>
                  <Text style={{color: '#000'}}>and </Text>
                  <Text style={{color: '#000', fontWeight: 'bold'}}>others </Text>
                </View>
                {index.postCaption !== '' ? (
                  <View style={{flex: 1, flexDirection: 'row', margin:3, marginLeft: 0}}>
                    <Text style={{color: '#000', fontWeight: 'bold', fontSize: 15}}>{index.username} </Text>
                    <Text style={{color: '#000', fontSize: 15}}>{index.postCaption}</Text>
                  </View>
                ) : (<></>)}
                {index.comments !== 0 ? (
                  <Text style={{color: '#727272', fontSize: 15}}>View all {index.postComments} comments</Text>
                ) : (<></>)}
                <Text style={{color: '#727272', fontSize: 12, paddingTop: 5}}>{index.createdAt}</Text>
              </View>
            </View>
          )})
        ) : (<></>)}
      </ScrollView>
      <BottomSheet
        visible={bSheetVisible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}>
          <View style={styles.bsheet}>
            <View style={{flexDirection: 'row', margin: 2, display: 'flex', justifyContent: 'flex-end'}}>
              <Text style={{alignSelf: 'center', fontSize: 18, fontWeight: 'bold'}}>Save to</Text>
              <View style={{flex: 0.4}}></View>
              <AntDesign name="plus" color='#000' size={26} style={{padding: 10}}  />
            </View>
            <Divider style={{ backgroundColor: '#cfcfcf'}} />
            <View style={{margin: 20, flexDirection: 'row'}}>
              <View style={{flexDirection: 'column'}}>
                <Image style={{height: 70, width: 70, borderRadius: 10}} source={require('../assets/reelbg.jpg')} />
                <Text style={{alignSelf: 'center'}}>Layouts</Text>
              </View>
            </View>
            <Divider style={{ backgroundColor: '#cfcfcf'}} />
            <TouchableOpacity style={{padding: 15, }}>
              <Text style={{fontSize: 14, fontWeight: 'bold', alignSelf: 'center'}} onPress={toggleBottomNavigationView}>Cancel</Text>
            </TouchableOpacity>
          </View>
      </BottomSheet>
    </View>
  );
}

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight
  },
  tabbar: {
    flexDirection: 'row',
    height: 50,
    zIndex: 1,
    backgroundColor: '#ffffff',
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1,
    alignItems: 'center'
},
postbar: {
  flexDirection: 'row',
  height: 50,
  backgroundColor: '#00000000',
  zIndex: 1
},
postname: {
  color: '#000',
  fontWeight: '700',
  fontSize: 15
},
postsub: {
  color: '#000',
  fontSize: 12,
  top: -4
},
bsheet: {
  backgroundColor: '#fff',
},
bar: {
  height: 5,
  width: 45,
  backgroundColor: '#e2e2e2',
  alignSelf: 'center',
  marginTop: 12,
  borderRadius: 3
},
postbottom: {
  flex: 1,
  // height: 100,
  flexDirection: 'column',
  paddingLeft: 15,
  paddingRight: 10,
  backgroundColor: '#00000000'
},
})