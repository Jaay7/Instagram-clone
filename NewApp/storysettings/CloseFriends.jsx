import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet,Text, TextInput, View, Dimensions, ScrollView, Platform, StatusBar as RNStatusBar,TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BottomSheet } from 'react-native-btr';
import { Divider } from 'react-native-elements';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const CloseFriendsScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [bSheetVisible, setBSheetVisible] = useState(false);
  const toggleBottomNavigationView = () => {
      //Toggling the visibility state of the bottom sheet
      setBSheetVisible(!bSheetVisible);
  };
  const btms = [
    {icon: 'account-multiple', title: "Choose who's on your list", subtitle: "You can add or remove people whenever you like, they won't be notified either way."},
    {icon: 'star-circle-outline', title: 'Share with only them', subtitle: 'Photos and videos you share with your close friends list gets a special label.'},
    {icon: 'eye-outline', title: 'Only you can see your list', subtitle: "People will see that you're sharing to close friends, but won't see who's on your list"},
  ]
  return(
    <View style={styles.container}>
      <View style={styles.tabbar}>
        <AntDesign onPress={() => navigation.goBack() } name="close" color='#000' size={26} style={{ padding: 10}}   />
        <Text style={{color: '#000', fontSize: 20, paddingLeft: 10 }}>Close Friends</Text>
        <View style={{flex: 1}}></View>
        <AntDesign name="plus" color='#000' size={26} style={{padding: 10}}  />
      </View>
      <View>
        <Text style={styles.info}>We don't send notification when you edit your close friends list.<Text onPress={toggleBottomNavigationView} style={styles.infooo}>How it Works</Text></Text>
        
      </View>
      <Divider style={{ backgroundColor: '#e2e2e2'}} />
      <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.inputFields}>
          <AntDesign name="search1" color='#b1b1b1' size={22} style={{paddingLeft: 5, paddingRight: 10}}  />
          <TextInput
            placeholder="Search"
            value={search}
            onChangeText={text => setSearch(text)}
            placeholderTextColor="#b1b1b1"
          />
        </View>
        <ScrollView></ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button}>
            <Text style={{color: '#fff', alignSelf: 'center', fontWeight: 'bold'}}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet
        visible={bSheetVisible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}>
          <View style={styles.bsheet}>
            <View style={styles.bar}></View>
            <Text style={{fontWeight: 'bold', fontSize: 18, alignSelf: 'center', margin: 10}}>How it works</Text>
            <Divider style={{ backgroundColor: '#cfcfcf'}} />
            <View>
              {btms.map((index) => {
                return(
                  <View style={{margin: 10, flexDirection: 'row'}} key={index.title}>
                    <MaterialComunityIcons name={index.icon} size={30} />
                    <View style={{flexDirection: 'column'}}>
                      <Text  style={{marginLeft: 20, fontSize: 15, marginRight: 20}}>{index.title}</Text>
                      <Text style={{marginLeft: 20, color: '#727272', marginRight: 20}}>{index.subtitle}</Text>
                    </View>
                  </View>
                )
              })
              }
            </View>
            
          </View>
      </BottomSheet>
    </View>
  );
}

export default CloseFriendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  info: {
    textAlign: 'center',
    color: '#727272',
    margin: 20
  },
  infooo: {
    color: '#000',
    fontWeight: 'bold'
  },
  inputFields:{
    color: '#000000',
    width: Dimensions.get('window').width -35,
    height: 35,
    alignSelf: 'center',
    borderRadius: 4,
    marginBottom: 15,
    padding: 2,
    marginTop: 15,
    borderColor: '#d3d2d2',
    borderWidth: 1,
    flexDirection: 'row', 
    alignItems: 'center',
    overflow: 'hidden'
  },
  button: {
    width: Dimensions.get('window').width -25,
    backgroundColor: '#2778e2',
    justifyContent: 'center', 
    height: 50,
    borderRadius: 5,
    marginTop: 10
  },
  footer: {
    // position: 'absolute',
    // flex:0.1,
    width: Dimensions.get('window').width,
    // bottom: -10,
    flexDirection:'row',
    height: 80,
    borderTopColor: '#e2e2e2',
    borderTopWidth: 1,
    justifyContent: 'center'
  },
  bsheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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