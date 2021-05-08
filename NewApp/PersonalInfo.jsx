import React, { useRef, useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet,Text, View, Dimensions, ScrollView, Platform, Image,StatusBar as RNStatusBar } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PersonalInfoScreen = ({navigation}) => {
  
  const [email, setEmail] = useState(email);
  const [phone, setPhone] = useState(phone);
  const [gender, setGender] = useState(gender);
  const [birthday, setBirthday] = useState(birthday);
  useEffect(() => {
    async function getdata() {
      const token = await AsyncStorage.getItem("token")
      // setUsername(token)
    
      fetch('http://192.168.0.103:3000/', {
        headers: new Headers({
          Authorization:"Bearer "+token
        })
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setEmail(data.email);
        setPhone(data.phone);
        setGender(data.gender);
        setBirthday(data.birthday);
      })
    }
    getdata();
  }, []);
  return(
    <View style={styles.container}>
      <View style={styles.tabbar}>
        <AntDesign onPress={() => navigation.navigate('EditProfile', {'email': email, 'phone': phone, 'gender': gender, 'birthday': birthday}) } name="arrowleft" color='#000' size={26} style={{alignSelf: 'center', paddingLeft: 8}}  />
        <Text style={{color: '#000', fontSize: 20, paddingLeft: 20 }}>Personal Information</Text>
      </View>
      <View style={styles.content}>
        <Text style={{padding: 18, color: '#727272', fontSize: 14.5}}>
          Provide your personal information, even if the account is used for a business, a pet or something else. This won't be part of your public profile.
        </Text>
        <TextInput
          label="E-mail Address"
          value={email}
          onChangeText={text => setEmail(text)}
          style={{width: Dimensions.get('window').width - 25, backgroundColor: '#00000000', marginBottom: 10, fontWeight: 'bold'}}
        />
        <TextInput
          label="Phone number"
          value={phone}
          onChangeText={text => setPhone(text)}
          style={{width: Dimensions.get('window').width - 25, backgroundColor: '#00000000', marginBottom: 10, fontWeight: 'bold'}}
        />
        <TextInput
          label="Gender"
          value={gender}
          onChangeText={text => setGender(text)}
          style={{width: Dimensions.get('window').width - 25, backgroundColor: '#00000000', marginBottom: 10, fontWeight: 'bold'}}
        />
        <TextInput
          label="Birthday"
          value={birthday}
          onChangeText={text => setBirthday(text)}
          style={{width: Dimensions.get('window').width - 25, backgroundColor: '#00000000', marginBottom: 10, fontWeight: 'bold'}}
        />
      </View>
    </View>
  );
}

export default PersonalInfoScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'web' ? 0 : StatusBar.currentHeight,
    flex: 1,
  },
  tabbar: {
    flexDirection: 'row',
    height: 50,
    
    zIndex: 1,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1,
    alignItems: 'center'
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  profilepic: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
})