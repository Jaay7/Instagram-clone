import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet,Text, TextInput, View, Dimensions, ScrollView, Platform, StatusBar as RNStatusBar,TouchableOpacity, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BottomSheet } from 'react-native-btr';
import { Divider } from 'react-native-elements';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const ArchiveScreen = ({navigation}) => {
  const [visible, setVisible] = useState(false);
    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);
    };
  const [checked, setChecked] = React.useState('Stories');
  return(
    <View style={styles.container}>
      <View style={styles.tabbar}>
        <AntDesign onPress={() => navigation.goBack() } name="arrowleft" color='#000' size={26} style={{ padding: 10}}  />
        <TouchableWithoutFeedback style={{ flexDirection: 'row', alignItems: 'center'}}  onPress={toggleBottomNavigationView}>
          <Text style={{color: '#000', fontSize: 19, paddingLeft: 10, fontWeight: '700',}}>{checked} Archive</Text>
          <MaterialIcons name="keyboard-arrow-down" size={26} style={{ alignSelf: 'center'}}/>
        </TouchableWithoutFeedback>
        <View style={{flex: 1}}></View>
        <MaterialComunityIcons name="dots-vertical" color='#000' size={22} style={{marginVertical: 10, paddingLeft: 10, paddingRight: 10}}  />
      </View>
      {
        checked === 'Stories' ? (
          <StoriesArchiveScreen navigation={navigation} />
        ) : (
          <PostsArchiveScreen navigation={navigation} />
        )
      }
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}>
        <View style={styles.bsheet}>
          <View style={styles.bar}></View>
        </View>
        <View style={{backgroundColor: '#fff'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text onPress={() => {setChecked('Stories'); toggleBottomNavigationView()}} style={styles.itemss}>Stories Archive</Text>
          </View>
        </View>
        <View style={{backgroundColor: '#fff'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text onPress={() => {setChecked('Posts'); toggleBottomNavigationView()}} style={styles.itemss}>Post Archive</Text>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

export default ArchiveScreen;

const TopTab = createMaterialTopTabNavigator();

const StoriesArchiveScreen = ({navigation}) => {
  const tabs = [
    {tname: 'NormalStory', tcomponent: NormalStoryView, iconname: "loading1"},
    {tname: 'CalendarStory', tcomponent: CalendarStoryView, iconname: "calendar"},
    {tname: 'MapStory', tcomponent: MapStoryView, iconname: "map-pin"},
  ]
  return(
    <View style={{flex: 1}}>
        <TopTab.Navigator
        initialRouteName='Homes'
        tabBarOptions={{
          showLabel: false,
          showIcon: true,
          inactiveTintColor: '#c7c7c7',
          activeTintColor: '#000',
          style: {
            // backgroundColor: '#f8f8f8',
          },
          indicatorStyle: {
            backgroundColor: '#000',
            height: 1
          }
        }}>
          {tabs.map((item) => {
            return(
              <TopTab.Screen
                key={item.tname}
                name={item.tname}
                component={item.tcomponent}
                options={{
                  tabBarIcon: ({color}) => (
                    item.tname === 'NormalStory' ? (
                      <AntDesign name={item.iconname} size={24} color={color} />
                    ) : (
                      <Feather name={item.iconname} size={24} color={color} />
                    )
                  )
                }}
              />
            )
          })}
        </TopTab.Navigator>
      </View>
  )
}

const NormalStoryView = ({navigation}) => {
  const explorepost = [
    {source: require('../assets/reelbg.jpg'), key: 1},
    {source: require('../assets/reelbg.jpg'), key: 2},
    {source: require('../assets/reelbg.jpg'), key: 3},
    {source: require('../assets/reelbg.jpg'), key: 4},
    {source: require('../assets/reelbg.jpg'), key: 5},
    {source: require('../assets/reelbg.jpg'), key: 6},
  ]
  return(
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
      snapToEnd={false}
      snapToStart={false}
      >
        {/* <Text>PostsArchiveScreen</Text> */}
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#ffffff', flexWrap: 'wrap'}}>
          {explorepost.map((index) => {
            return(
              <TouchableOpacity
                // onPress={() => navigation.navigate('Explore', {'post': index.source})}
                key={index.key}>
                <View style={{width: 119, height: 200, backgroundColor: 'powderblue', borderWidth: 1, borderColor: '#fff'}}>
                <Image style={{width: 119, height: 200,}} source={index.source} />
              </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View>
          <View style={{height: 50, alignItems: 'center', flexDirection: 'row', padding: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>Memories</Text>
            <View style={{flex: 1}}></View>
            <AntDesign name="close" size={22} color="#727272" />
          </View>
          <View style={{flexDirection: 'row', padding: 10, alignItems: 'center', paddingTop: 0}}>
            <TouchableOpacity
                // onPress={() => navigation.navigate('Explore', {'post': index.source})}
            style={{paddingLeft: 10}}>
              <View style={{width: 119, height: 200, backgroundColor: 'powderblue', borderWidth: 1, borderColor: '#fff'}}>
                <Image style={{width: 119, height: 200,}} source={require('../assets/reelbg.jpg')} />
              </View>
            </TouchableOpacity>
            <View style={{marginLeft: 20}}>
              <Text style={{fontWeight: '700'}}>On This Day</Text>
              <Text style={{color: '#727272'}}>1 year ago today.</Text>
              <TouchableOpacity style={{backgroundColor: '#2778e2', padding: 5, width: 80, alignItems: 'center', borderRadius: 5, marginTop: 10}}>
                <Text style={{color: '#fff', fontSize: 15}}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{textAlign: 'center', fontSize: 12, color: '#727272', padding: 10, marginTop: 10}}>Only you can see your memories and archived stories unless you choose to share them.</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const CalendarStoryView = ({navigation}) => {
  return(
    <View style={{flex:1}}>
      <Text>Calendar Story</Text>
    </View>
  )
}

const MapStoryView = ({navigation}) => {
  return(
    <View style={{flex:1}}>
      <Text>Map Story</Text>
    </View>
  )
}

const PostsArchiveScreen = ({navigation}) => {
  const explorepost = [
    {source: require('../assets/reelbg.jpg'), key: 1},
    {source: require('../assets/reelbg.jpg'), key: 2},
    {source: require('../assets/reelbg.jpg'), key: 3},
    {source: require('../assets/reelbg.jpg'), key: 4},
    {source: require('../assets/reelbg.jpg'), key: 5},
  ]
  return(
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <View style={{height: 50, backgroundColor: '#f1f1f1', alignItems: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 13, top: 15, color: '#727272'}}>Only you can see the posts you've archived.</Text>
        </View>
        {/* <Text>PostsArchiveScreen</Text> */}
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#ffffff', flexWrap: 'wrap'}}>
            {explorepost.map((index) => {
              return(
                <TouchableOpacity
                  onPress={() => navigation.navigate('Explore', {'post': index.source})}
                  key={index.key}>
                  <View style={{width: 119, height: 119, backgroundColor: 'powderblue', borderWidth: 1, borderColor: '#fff'}}>
                  <Image style={{width: 119, height: 119,}} source={index.source} />
                </View>
                </TouchableOpacity>
              );
            })}
          </View>
      </ScrollView>
    </View>
  )
}

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
    alignItems: 'center'
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
  teexts:{
    color: '#000',
    paddingLeft: 3,
    fontWeight: 'bold',
    fontSize: 17,
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  itemss: {
    margin: 15,
    fontSize: 16
  },
})