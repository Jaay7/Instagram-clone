import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet,Text, ActivityIndicator, View, Dimensions, ScrollView, Platform, StatusBar as RNStatusBar,TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoadingScreen = ({navigation}) => {
//   const detectLogin = async() => {
//     const token = await AsyncStorage.getItem('token')
//     if (token) {
//       navigation.replace('Main')
//     } else {
//       navigation.replace('Login')
//     }
//   }
//   useEffect( async () => {
//     detectLogin()
//   }, [])
  return(
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight
  },
})