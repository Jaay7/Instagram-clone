import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet,Text, TextInput, View, Dimensions, ScrollView, Platform, StatusBar as RNStatusBar,TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const RecomendedSearchesScreen = ({route, navigation}) => {
    const { tabname } = route.params;
  return(
    <View style={styles.container}>
      <View style={styles.tabbar}>
        <AntDesign onPress={() => navigation.goBack() } name="arrowleft" color='#000' size={26} style={{ padding: 10}}  />
        <Text style={{color: '#000', fontSize: 20, paddingLeft: 10 }}>{tabname}</Text>
      </View>
      <Text>RecomendedSearchesScreen</Text>
    </View>
  );
}

export default RecomendedSearchesScreen;

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
})