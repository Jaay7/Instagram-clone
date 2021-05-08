import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { StyleSheet,Text, TextInput, View, Dimensions, ScrollView,Image, Platform, StatusBar as RNStatusBar } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BottomSheet } from 'react-native-btr';
const ReelsScreen = ({ navigation }) => {

  const [notLikedColor, setLikedColor] = useState('#e2e2e2ad');
  const [visible, setVisible] = useState(false);
    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);
    };
  const BottomSheetList = [
    {
      screen: 'Camera',
      title: 'Report...',
    },
    {
      screen: 'Camera',
      title: 'Not Interested',
    },
    {
      screen: 'Camera',
      title: 'Copy Link',
    },
    {
      screen: 'Camera',
      title: 'Share to...',
    },
    {
      screen: 'Camera',
      title: 'Save',
    },
    ]

  return(
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ImageBackground source={require('../assets/reelbg.jpg')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height - 50}}>
          <View style={styles.tabbar}>
            <AntDesign onPress={() => navigation.goBack() } name="arrowleft" color='#fff' size={26} style={{padding: 10}}  />
            <Text style={{color: '#fff', fontSize: 20, paddingLeft: 17 }}>Reels</Text>
            <View style={{flex: 1}}></View>
            <SimpleLineIcons name="camera" size={24} color="#fff" style={{paddingRight: 10}}/>
          </View>
          <View style={{flex: 0.925}}></View>
          <View style={{alignContent: 'space-around'}}>
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
              <Image style={{height: 30, width: 30, borderRadius: 15, alignSelf: 'center', marginLeft: 17}} source={require('../assets/mine.jpeg')}/>
              <Text style={{color: '#fff', fontWeight: 'bold', paddingLeft: 5}}>_jaaaayy_7</Text>
            </View>
            <Text style={{color: '#fff', paddingLeft: 17, fontSize: 15, paddingTop: 7}}>hey whatsup guys</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', padding: 17, paddingTop: 7}}>
              <SimpleLineIcons name="music-tone" color="#fff" />
              <Text style={{color: '#fff', paddingLeft: 5}}>Hello</Text>
            </View>
            <View style={styles.actions}>
              <AntDesign name="heart" color={notLikedColor} 
                onPress={() => {
                  setLikedColor(
                    notLikedColor === '#e2e2e2ad' ? '#ff5151' : '#e2e2e2ad'
                  )
                }}
                size={27} style={{alignSelf: 'center', paddingLeft: 10}} />
              <Feather name="message-circle" color='#e2e2e2ad' size={29} style={{ alignSelf: 'center', paddingLeft: 12}}  />
              <Feather name="send" color='#e2e2e2ad' size={26} style={{ alignSelf: 'center', paddingLeft: 12}}  />
              <MaterialComunityIcons
                onPress={ toggleBottomNavigationView }
              name="dots-vertical" color='#e2e2e2ad' size={28} style={{ alignSelf: 'center', paddingLeft: 12}}  />
              <View style={{flex: 1}}></View>
              <AntDesign name="heart" color="#e2e2e2ad" size={20} style={{alignSelf: 'center', paddingLeft: 10}} />
              <Text style={{alignSelf: 'center', paddingLeft: 5, color: '#e2e2e2ad'}}>338k</Text>
              <Feather name="message-circle" color='#e2e2e2ad' size={20} style={{ alignSelf: 'center', paddingLeft: 16}}  />
              <Text style={{alignSelf: 'center', paddingRight: 10, paddingLeft: 5, color: '#e2e2e2ad'}}>338</Text>
            </View>
          </View>
        </ImageBackground>
        <BottomSheet
            visible={visible}
            onBackButtonPress={toggleBottomNavigationView}
            onBackdropPress={toggleBottomNavigationView}>
                <View style={styles.bsheet}>
                  <View style={styles.bar}></View>
                  <View>
                    {BottomSheetList.map((index) => {
                      return(
                        <Text style={styles.bsheetText} key={index.title}>{index.title}</Text>
                      )
                    })}
                  </View>
                </View>
            </BottomSheet>
      </View>
      
    );
};

export default ReelsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight
  },
  tabbar: {
    flexDirection: 'row',
    height: 50,
    // marginTop: Platform.OS === 'web' ? 0 : 30,
    zIndex: 1,
    backgroundColor: '#00000000',
    alignItems: 'center'
},
listItems: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: 15,
  paddingBottom: 19
},
 actions: {
   flexDirection: 'row',
 },
 bsheet: {
  backgroundColor: '#ffffff',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
},
bar: {
  height: 5,
  width: 35,
  backgroundColor: '#e2e2e2',
  alignSelf: 'center',
  marginTop: 12,
  borderRadius: 3
},
bsheetText: {
  fontSize: 16,
  padding: 15,
  paddingLeft: 25
}
})