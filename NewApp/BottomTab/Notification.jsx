import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet,Text, TouchableWithoutFeedback, View, Dimensions, ScrollView,Image, Platform, Alert,TouchableOpacity, StatusBar as RNStatusBar } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { createStackNavigator } from '@react-navigation/stack';
import FollowReqScreen from './FollowReq';

const Stack = createStackNavigator();

const NotficationScreen = ({ navigation }) => {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name="Activity"
        component={ActivityScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="FollowReq"
        component={FollowReqScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
};

export default NotficationScreen;

const ActivityScreen = ({ navigation }) => {
  return(
    <View style={styles.container}>
      <View style={styles.tabbar}>
        <Text style={{color: '#000', alignSelf: 'center', fontSize: 20, paddingLeft: 20 }}>Activity</Text>
      </View>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('FollowReq')}>
        <View style={{flexDirection: 'row', backgroundColor: '#727272', padding: 10}}>
          <Fontisto name="react" color='#000'
            style={{alignSelf: 'center'}} size={40} />
          <View style={{flexDirection: 'column'}}>
            <Text>Follow Requests</Text>
            <Text>erdtfgyhuj</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
    
  );
}

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
    // borderBottomColor: '#e2e2e2',
    // borderBottomWidth: 1 
},
listItems: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: 15,
  paddingBottom: 19
}
})