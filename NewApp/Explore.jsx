import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet,Text, StatusBar as RNStatusBar, View, Dimensions, ScrollView, Platform, Alert,TouchableOpacity, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BottomSheet } from 'react-native-btr';
import Feather from 'react-native-vector-icons/Feather';
import { Divider } from 'react-native-elements';

const ExploreScreen = ({route, navigation}) => {
  const { post } = route.params;
  const [notLiked, setLiked] = useState('hearto');
  const [notSaved, setSaved] = useState('bookmark-o');
  const [notLikedColor, setLikedColor] = useState('#000000');
  const [bSheetVisible, setBSheetVisible] = useState(false);
  const toggleBottomNavigationView = () => {
      //Toggling the visibility state of the bottom sheet
      setBSheetVisible(!bSheetVisible);
  };
  return(
    <View style={styles.container}>
      <View style={styles.tabbar}>
        <AntDesign onPress={() => navigation.goBack() } name="arrowleft" color='#000' size={26} style={{ padding: 10}}  />
        <Text style={{color: '#000', fontSize: 20, paddingLeft: 10 }}>Explore</Text>
      </View>
      <ScrollView>
        <View>
          <View style={styles.postbar}>
            <Image style={{height: 30, width: 30, borderRadius: 15, alignSelf: 'center', marginLeft: 15}} source={require('./assets/reelbg.jpg')}/>
            <View style={{flex: 1, flexDirection: 'column', paddingLeft: 10, alignSelf: 'center'}}>
              <Text style={styles.postname}>_jaaaayy_7</Text>
              <Text style={styles.postsub}>Eluru, India</Text>
            </View>
            <View style={{flex: 1}}></View>
            <MaterialComunityIcons
              name="dots-vertical" color='#000' size={28} style={{marginVertical: 10, paddingLeft: 10, paddingRight: 10}}  />
          </View>
          <Image source={post} style={{height: 400, width: Platform.OS === 'web' ? 500 : Dimensions.get('window').width, }} />
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
        </View>
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
                <Image style={{height: 70, width: 70, borderRadius: 10}} source={require('./assets/reelbg.jpg')} />
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

export default ExploreScreen;

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
})