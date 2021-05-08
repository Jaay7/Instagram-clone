import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet,Text, TextInput, View, Dimensions, ScrollView,ImageBackground, Platform, Alert,TouchableOpacity, StatusBar as RNStatusBar } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';


const IGTVDiscoverScreen = ({ navigation }) => {
  var vi = 600;
  const [search, setSearch] = useState('')
  const igtvs = [
    {
      name: '_jaaaay_7',
      caption: 'dfjibgdf',
      views: `${vi} views`,
      image: require('./assets/reelbg.jpg')
    },
    {
      name: 'gyftdcf',
      caption: 'sgsgrdeh',
      views: `${vi} views`,
      image: require('./assets/reelbg.jpg')
    },
    {
      name: 'uvugvjnj',
      caption: 'tshrhrsth',
      views: `${vi} views`,
      image: require('./assets/reelbg.jpg')
    },
    {
      name: 'sgdgdrhgt',
      caption: 'tshrhrsth',
      views: `${vi} views`,
      image: require('./assets/reelbg.jpg')
    },
    {
      name: 'aerwe',
      caption: 'tshrhrsth',
      views: `${vi} views`,
      image: require('./assets/reelbg.jpg')
    }
  ]

  return(
    <View style={styles.container}>
      <View style={styles.tabbar}>
        <AntDesign onPress={() => navigation.goBack() } name="arrowleft" color='#000' size={26} style={{padding: 10}}  />
        <Text style={{color: '#000', fontSize: 24, paddingLeft: 10, fontWeight: 'bold' }}>IGTV </Text>
        <Text style={{color: '#b1b1b1', fontSize: 24, fontWeight: 'bold' }}>Discover</Text>
        <View style={{flex: 1}}></View>
        <AntDesign name="plus" color='#000' size={26} style={{padding: 10}}  />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inputFields}>
          <AntDesign name="search1" color='#b1b1b1' size={22} style={{paddingLeft: 5, paddingRight: 10}}  />
          <TextInput
          style={{flex: 1}}
            placeholder="Search IGTV creators"
            value={search}
            onChangeText={text => setSearch(text)}
            placeholderTextColor="#b1b1b1"
          />
        </View>
        
      <Text style={styles.headText}>Videos For You</Text>
      
        <View style={styles.igs}>
        {igtvs.map((index) => {
          return(
            <View style={{borderRadius: 20, marginTop: 10 }} key={index.name}>
              <ImageBackground style={styles.igbox} imageStyle={{borderRadius: 20}} source={index.image}>
                <View style={{flexDirection: 'column', flex: 1, padding: 15}}>
                  <View style={{flex: 1}}></View>
                  <Text style={{fontWeight: 'bold', color: '#f1f1f1', fontSize: 15}}>{index.name}</Text>
                  <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 17}}>{index.caption}</Text>
                  <Text style={{color: '#e2e2e2'}}>{index.views}</Text>
                </View>
                
              </ImageBackground>
            </View>
          )
        })}
        
        </View>
      </ScrollView>
      
    </View>
    
  );
};

export default IGTVDiscoverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight
  },
  tabbar: {
    flexDirection: 'row',
    height: 50,
    zIndex: 1,
    // borderBottomColor: '#e2e2e2',
    // borderBottomWidth: 1,
    alignItems: 'center'
  },
  inputFields:{
    color: '#000000',
    width: Dimensions.get('window').width -35,
    height: 35,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 15,
    padding: 2,
    marginTop: 15,
    backgroundColor: '#ececec',
    // borderWidth: 1,
    flexDirection: 'row', 
    alignItems: 'center',
    overflow: 'hidden'
  },
  headText: {
    fontWeight: 'bold',
    fontSize: 19,
    paddingLeft: 15
  },
  igs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'space-around'
  },
  igbox: {
    width: Dimensions.get('window').width / 2 - 10,
    height: 250,
    overflow: 'hidden',
  }
})