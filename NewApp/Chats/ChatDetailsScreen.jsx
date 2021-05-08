import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet,Text, TouchableHighlight, View, Dimensions, ImageBackground, Platform, StatusBar as RNStatusBar,TouchableOpacity, Image, Modal } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RadioButton, Switch } from 'react-native-paper';
import { Divider } from 'react-native-elements';

const ChatDetailsScreen = ({route, navigation}) => {
  const {username} = route.params;
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  // const name="jay";
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [modalVisible, setModalVisible] = useState(false);
  const [propic, setPropic] = useState(null);
  const [name, setName] = useState('');
  useEffect(() => {
    async function getdata() {
      fetch(`http://192.168.0.103:3000/othersprofile/${username}`, { //192.168.0.102
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setPropic(data.profilepic);
        setName(data.name);
      })
    }
    getdata();
  }, []);
  return(
    <View style={styles.container}>
      <View style={styles.tabbar}>
          <AntDesign onPress={() => navigation.goBack() } name="arrowleft" color='#000' size={26} style={{padding: 10}}  />
          {/* <Image source={propic} style={{height: 30, width: 30, borderRadius: 15, marginLeft: 10}}/> */}
          <Text style={{color: '#000', fontSize: 20, paddingLeft: 10 }}>Details</Text>
          <View style={{flex: 1}}></View>
      </View>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
          <Text style={styles.itemss}>Mute Messages</Text>
          <View style={{flex: 1}}></View>
          <Switch value={isSwitchOn} color="#2778e2" onValueChange={onToggleSwitch} />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
          <Text style={styles.itemss}>Mute Video Chats</Text>
          <View style={{flex: 1}}></View>
          <Switch value={isSwitchOn} color="#2778e2" onValueChange={onToggleSwitch} />
        </View>
        <Text style={styles.heading}>Chat Settings</Text>
        <TouchableHighlight activeOpacity={0.6} underlayColor="#dddddd" style={{padding: 10}} onPress={() => console.log("pressed!")}>
          <Text style={styles.itemss}>Theme</Text>
        </TouchableHighlight>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.heading }>Shared</Text>
          <View style={{flex: 1}}></View>
          <Text style={{color: '#2778e2', padding: 10, fontWeight: 'bold' }}>See All</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image source={propic} style={{height: 90, width: 90, borderWidth: 1, borderColor: '#fff'}} />
          <Image source={propic} style={{height: 90, width: 90, borderWidth: 1, borderColor: '#fff'}} />
          <ImageBackground source={propic} style={{height: 90, width: 90, borderWidth: 1, borderColor: '#fff'}}>
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#2c2c2caf'}}>
              <Text style={{color: '#fff'}}>See All</Text>
            </View>
          </ImageBackground>
        </View>
        <Text style={styles.heading}>Members</Text>
        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
          <Image source={{uri: propic}} style={{height: 50, width: 50, borderRadius: 25}} />
          <View style={{flexDirection: 'column', paddingLeft: 10}}>
            <Text style={{fontSize: 15}}>{username}</Text>
            <Text style={{color: '#727272'}}>{name}</Text>
          </View>
          <View style={{flex: 1}}></View>
          <TouchableOpacity style={styles.button} onPress={() => {setModalVisible(true)}}>
            <Text style={{fontWeight: 'bold', }}>Following</Text>
          </TouchableOpacity>
        </View>
        <Divider style={{ backgroundColor: '#cfcfcf', marginTop: 10}} />
        <View>
          <Text style={styles.item}>Restrict</Text>
          <Text style={styles.item}>Report...</Text>
          <Text style={{fontSize: 16, padding: 10, color: '#ff5151'}}>Block</Text>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={propic} style={{height: 100, width: 100, borderRadius: 50}} />
            <Text style={{color: '#aaaaaa', textAlign: 'center', marginTop: 30}}>If you change your mind, you'll have to request to follow <Text style={{fontWeight: 'bold'}}>{username}</Text> again.</Text>
            <TouchableOpacity
            style={{marginTop: 20, borderTopColor: '#e2e2e2', borderTopWidth: 1, padding: 10, width: '100%'}}
              onPress={() => { setModalVisible(!modalVisible); }}
            >
              <Text style={{color: '#2778e2',fontWeight: 'bold', fontSize: 15, alignSelf: 'center'}}>Unfollow</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ borderTopWidth: 1,borderTopColor: '#e2e2e2', padding: 10, width: '100%'}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={{color: '#000', fontSize: 15, alignSelf: 'center'}}>Keep</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ChatDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight,
    backgroundColor: '#fff'
  },
  tabbar: {
    height: 50,
    zIndex: 1,
    backgroundColor: '#fff',
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 35: 0,
    alignItems: 'center'
  },
  heading: {
    fontWeight: 'bold',
    margin: 10,
    fontSize: 17,
    marginBottom: 15,
    marginTop: 15
  },
  item: {
    fontSize: 16,
    padding: 10
  },
  itemss: {
    fontSize: 16,
  },
  button: {
    // backgroundColor: '#2778e2',
    padding: 4,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cfcfcf'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#00000060'
  },
  modalView: {
    width: 270,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 30,
    paddingBottom: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
})