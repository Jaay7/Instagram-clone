import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet,Text, TextInput, View, Dimensions, ScrollView, Platform, StatusBar as RNStatusBar,TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Divider } from 'react-native-elements';
import { RadioButton, Switch } from 'react-native-paper';

const CameraSettingsScreen = ({navigation}) => {
  const [checked, setChecked] = React.useState('FollowersYouFollowBack');
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return(
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.tabbar}>
        <AntDesign onPress={() => navigation.goBack() } name="arrowleft" color='#000' size={26} style={{ padding: 10}}   />
        <Text style={{color: '#000', fontSize: 20, paddingLeft: 20 }}>Story</Text>
      </View>
      <ScrollView style={{marginBottom: 30}}>
        <Divider style={{ backgroundColor: '#aaaaaa', marginTop: 20}} />
        <Text style={styles.headings}>Hide Story From</Text>
        <Text style={styles.itemss} onPress={() => navigation.navigate('HideStoryFrom')}>3 People</Text>
        <Text style={styles.description}>Hide your stories and live videos from specific people.</Text>
        <Divider style={{ backgroundColor: '#aaaaaa', marginTop: 20}} />
        <Text style={styles.headings}>Close Friends</Text>
        <Text style={styles.itemss} onPress={() => navigation.navigate('CloseFriends')}>28 People</Text>
        <Divider style={{ backgroundColor: '#aaaaaa', marginTop: 5}} />
        <Text style={styles.headings}>Allow Replies and Reactions</Text>
        <View style={{flexDirection: 'row', alignItems: 'center',}}>
            <Text style={styles.itemss} onPress={() => {setChecked('YourFollowers')}}>Your Followers</Text>
            <View style={{flex: 1}}></View>
            <RadioButton
            color="#2778e2"
            value="YourFollowers"
            status={ checked === 'YourFollowers' ? 'checked' : 'unchecked' }
            onPress={() => {setChecked('YourFollowers')}}
          />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.itemss} onPress={() => {setChecked('FollowersYouFollowBack')}}>Followers You Follow Back</Text>
            <View style={{flex: 1}}></View>
            <RadioButton
            color="#2778e2"
            value="FollowersYouFollowBack"
            status={ checked === 'FollowersYouFollowBack' ? 'checked' : 'unchecked' }
            onPress={() => {setChecked('FollowersYouFollowBack')}}
          />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.itemss} onPress={() => {setChecked('Off')}}>Off</Text>
            <View style={{flex: 1}}></View>
            <RadioButton
            color="#2778e2"
            value="Off"
            status={ checked === 'Off' ? 'checked' : 'unchecked' }
            onPress={() => {setChecked('Off')}}
          />
          </View>
          
        <Text style={styles.description}>Choose who can reply and react to your story.</Text>
        <Divider style={{ backgroundColor: '#aaaaaa', marginTop: 20}} />
        <Text style={styles.headings}>Saving</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.itemss}>Save to Gallery</Text>
            <View style={{flex: 1}}></View>
            <Switch value={isSwitchOn} color="#2778e2" onValueChange={onToggleSwitch} />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.itemss}>Save Story to Archive</Text>
            <View style={{flex: 1}}></View>
            <Switch value={isSwitchOn} color="#2778e2" onValueChange={onToggleSwitch} />
          </View>
        <Text style={styles.description}>Automatically save photos and videos in your archive so you don't have to save them on your phone. Only you can see them after they disapper from your story.</Text>
        <Divider style={{ backgroundColor: '#aaaaaa', marginTop: 20}} />
        <Text style={styles.headings}>Sharing</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.itemss}>Allow Resharing to Stories</Text>
            <View style={{flex: 1}}></View>
            <Switch value={isSwitchOn} color="#2778e2" onValueChange={onToggleSwitch} />
          </View>
        <Text style={styles.description}>Other people can add your feed posts and IGTV videos to their stories. Your username will always show up with your posts.</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.itemss}>Allow Sharing</Text>
            <View style={{flex: 1}}></View>
            <Switch value={isSwitchOn} color="#2778e2" onValueChange={onToggleSwitch} />
          </View>
        <Text style={styles.description}>Let your followers share photos and videos from your story as message. Only your followers can see what's shared.</Text>
      </ScrollView>
      
    </View>
  );
}

export default CameraSettingsScreen;

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
  headings: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 15
  },
  itemss: {
    fontSize: 16,
    margin: 15
  },
  description: {
    fontSize: 12,
    color: '#727272',
    marginLeft: 15,
    marginRight: 20
  }
})