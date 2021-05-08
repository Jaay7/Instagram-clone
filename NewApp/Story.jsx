import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet,Text, TextInput, View, ScrollView, Dimensions, PanResponder, Animated, TouchableOpacity, ImageBackground, Image, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { Modal } from 'react-native';
import { Divider, Slider } from 'react-native-elements';
import { BottomSheet } from 'react-native-btr';
import { FlatList } from 'react-native';
import { Input } from 'react-native-elements';
import * as MediaLibrary from 'expo-media-library';
import { Snackbar } from 'react-native-paper';

const fontFamilys = [
  "Ramabhadra-Regular",
  "Teko-Regular",
  "Parisienne-Regular",
  "CourierPrime-Bold"
]

const StoryScreen = ({route, navigation}) => {
  const { photo } = route.params;
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const toogleSnackBar = () => {
    setSnackBarVisible(true);
  }
  const dismissSnackBar = () => {
    setSnackBarVisible(false);
  }
  const saveImage = async () => {
    console.log('uri', photo.uri);
    const asset = await MediaLibrary.createAssetAsync(photo.uri);
    MediaLibrary.createAlbumAsync('Expo-Instagram', asset)
      .then(() => {
        console.log('Album created!');
        toogleSnackBar();
      })
      .catch(error => {
        console.log(error);
      })
  }
  const [modalVisible, setModalVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [fonts, setFontsVisible] = useState(false);
  const [colors, setColorsVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(20);
  const [createText, setCreateText] = useState('');
  const [alignmentIcon, setAlignmentIcon] = useState('format-align-center');
  const [alignment, setAlignment] = useState('center');
  const [search, setSearch] = useState('');
  const [fontFamilyIdx, setFontFamilyIdx] = useState(0);

  //dragging text using PanResponder
  const pan  = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => Math.abs(gestureState.dy) > 5,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {dx: pan.x, dy: pan.y}
        ]
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;
  const [bSheetVisible, setBSheetVisible] = useState(false);
  const toggleBottomNavigationView = () => {
      //Toggling the visibility state of the bottom sheet
      setBSheetVisible(!bSheetVisible);
  };

  const stickers = [
    {color: 'powderblue'},
    {color: 'skyblue'},
    {color: 'steelblue'},
  ]

  return(
    <View style={styles.container}>
      <ImageBackground source={{uri: photo.uri}} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height - 130, marginTop: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight}} >
        <View style={styles.tabbar}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', flex: 1}}>
            <AntDesign onPress={() => {setModalVisible(true)}} name="close" color='#fff' size={30} style={{ alignSelf: 'center'}}  />
            <SimpleLineIcons name="emotsmile" color='#fff' size={28} style={{ alignSelf: 'center'}} />
            <Feather name="link-2" color='#fff' size={28} style={{ alignSelf: 'center'}} />
            <AntDesign name="download" onPress={saveImage} color='#fff' size={26} style={{ alignSelf: 'center'}}  />
            <MaterialComunityIcons onPress={toggleBottomNavigationView } name="sticker-emoji" color='#fff' size={30} style={{ alignSelf: 'center'}} />
            <MaterialComunityIcons name="draw" color='#fff' size={30} style={{ alignSelf: 'center'}} />
            <MaterialComunityIcons onPress={() => { createVisible === false ? setCreateVisible(true): setCreateVisible(false)}} name="format-letter-case" color='#fff' size={34} style={{ alignSelf: 'center'}} />
          </View>
        </View>
        {createVisible ? (
          <TouchableOpacity style={{flex: 1}} onPress={() => { createVisible === true ? setCreateVisible(false): setCreateVisible(true)}}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <MaterialComunityIcons 
                onPress={() => { 
                  setAlignmentIcon(
                    alignmentIcon === 'format-align-center' ? 'format-align-left'
                    : alignmentIcon === 'format-align-left' ? 'format-align-right'
                    : 'format-align-center'
                  );
                  setAlignment(
                    alignment === 'center' ? 'left'
                    : alignment === 'left' ? 'right'
                    : 'center'
                  )
                }} name={alignmentIcon} color='#fff' size={28} style={{ padding: 10}} />
              <MaterialComunityIcons onPress={() => { 
                if(fonts === false) { setFontsVisible(true); setColorsVisible(false)} else{ setFontsVisible(false)}
                }} name="format-textbox" color='#fff' size={28} style={{ padding: 10}} />
              <MaterialComunityIcons onPress={() => { 
                if(colors === false) { setColorsVisible(true); setFontsVisible(false)} else{ setColorsVisible(false)}
                }} name="format-color-fill" color='#fff' size={28} style={{ padding: 10}} />
            </View>
            <View>
              {fonts ? (
                <View style={{flexDirection: 'row', justifyContent: 'center', display: 'flex'}}>
                  <CustomPicker
                    data={fontFamilys}
                    currentIndex={fontFamilyIdx}
                    onSelected={setFontFamilyIdx}
                  />
                  
                  
                  {/* <MaterialComunityIcons
                    name="format-letter-case"
                    color='#000' size={28}
                    style={{ alignSelf: 'center', backgroundColor: '#fff', borderRadius: 19, left: 6}}
                  /> */}
                </View>
              ) : (
                <View></View>
              )}
            </View>
            <View>
              {colors ? (
                <View>
                  <MaterialComunityIcons name="format-color-highlight" color='#fff' size={28} style={{ alignSelf: 'center'}} />
                </View>
              ) : (
                <View></View>
              )}
            </View>
            <Slider 
            value={sliderValue}
            onValueChange={(value) => setSliderValue(value)}
            maximumValue={40}
            minimumValue={13}
            minimumTrackTintColor="#fff"
            trackStyle={{backgroundColor: '#dadada80', height: 0, width: 0, borderTopWidth: 8, borderTopColor: 'transparent', borderRightWidth: Dimensions.get('window').width - 120, borderBottomWidth: 8, borderBottomColor: 'transparent', borderRightColor: '#dadada80'}}
            thumbStyle={{backgroundColor: '#fff', height: 20, width: 20}}
            style={{width: Dimensions.get('window').width -120, alignSelf: 'center'}}
          />
        <View style={{  flex: 1, justifyContent: 'center'}}>
          <TextInput 
            autoFocus={true}
            // placeholder="Type Something"
            style={{color: '#fff', fontFamily: fontFamilys[fontFamilyIdx],
            fontSize: sliderValue, textAlign: alignment}}
            value={createText}
            onChangeText={text => {setCreateText(text)}}
          />
        </View>
          </TouchableOpacity>
        ) : (
          <View onPress={() => { createVisible === false ? setCreateVisible(true): setCreateVisible(false)}} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Animated.View
              style={{
                transform: [{translateX: pan.x}, {translateY: pan.y}]
              }}
              {...panResponder.panHandlers}
            >
              <Text style={{color: '#fff', fontSize: sliderValue, fontFamily: fontFamilys[fontFamilyIdx]}}>{createText}</Text>
            </Animated.View>
            
            </View>
        )}
        
      </ImageBackground>
      <BottomSheet
        visible={bSheetVisible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}>
          <View style={styles.bsheet}>
            <View style={styles.bar}></View>
            <Input
              value={search}
              onChangeText={(text) => setSearch(text)}
              placeholder='Search'
              placeholderTextColor="#e2e2e2"
              inputContainerStyle={{borderColor: '#e2e2e2', marginTop: 15, width: Dimensions.get('window').width - 30, alignSelf: 'center'}}
              style={{color: '#fff', fontSize: 18}}
                leftIcon={
                  <AntDesign name="search1" color='#e2e2e2' size={24} style={{paddingLeft: 5, paddingRight: 15}}  />
                }
            />
            <ScrollView>
              <View style={styles.stickerItems}>
              {stickers.map((index) => {
                return(
                  <View style={{width: Dimensions.get('window').width / 3 - 10, height: Dimensions.get('window').width / 3, backgroundColor: index.color}} />
                )
              })}
              </View>
            </ScrollView>
            
          </View>
      </BottomSheet>
      <View style={styles.bottombar}>
        <View style={{flexDirection: 'row', marginTop: 7}}>
          <View style={{flexDirection: 'column', paddingTop: 7, paddingLeft: 10}}>
            <Image style={{height: 26, width: 26, borderRadius: 13, alignSelf: 'center', borderColor: '#fff', borderWidth: 2}} source={require('./assets/reelbg.jpg')}/>
            <Text style={{color: '#fff', fontSize: 13, paddingTop: 4}}>Your Story</Text>
          </View>
          <View style={{flexDirection: 'column', paddingTop: 7, paddingLeft: 17}}>
            <Image style={{height: 26, width: 26, borderRadius: 13, alignSelf: 'center', borderColor: '#fff', borderWidth: 2}} source={require('./assets/reelbg.jpg')}/>
            <Text style={{color: '#fff', fontSize: 13, paddingTop: 4}}>Close Friends</Text>
          </View>
          <View style={{flex: 1}}></View>
          <TouchableOpacity style={styles.sendbtn}>
          <Text>Send to</Text>
          <MaterialIcons name="keyboard-arrow-right" size={23} style={{paddingLeft: 2}}  />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Discard Photo?</Text>
            <Text style={{color: '#aaaaaa', textAlign: 'center'}}>If you go back now, you will lose your photo.</Text>
            <TouchableOpacity
            style={{marginTop: 20, borderTopColor: '#e2e2e2', borderTopWidth: 1, padding: 10, width: '100%'}}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.goBack();
              }}
            >
              <Text style={{color: '#ff5151',fontWeight: 'bold', fontSize: 15, alignSelf: 'center'}}>Discard</Text>
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
      <Snackbar
        visible={snackBarVisible}
        onDismiss={dismissSnackBar}
        style={styles.snackbar}
      >
        Photo Saved
      </Snackbar>
    </View>
  )
}

export default StoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  bottombar: {
    backgroundColor: '#000000',
    height: 100,
  },
  sendbtn: {
    backgroundColor: '#fff',
    height: 45,
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    marginRight: 20,
    alignSelf: 'center'
  },
  tabbar: {
    flexDirection: 'row',
    height: 50,
    zIndex: 1,
    backgroundColor: '#00000000',
    // marginTop: 50
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18
  },
  bsheet: {
    backgroundColor: '#ffffff60',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: Dimensions.get('window').height - 150
  },
  bar: {
    height: 5,
    width: 45,
    backgroundColor: '#e2e2e2',
    alignSelf: 'center',
    marginTop: 12,
    borderRadius: 3
  },
  stickerItems: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  snackbar: {
    marginBottom: 120,
    width: 120,
    height: 40,
    alignSelf: 'center',
    backgroundColor: '#000000dc',
    borderRadius: 10
  }
})

const CustomPicker = ({data ,currentIndex, onSelected}) => {
  return(
    <>
    <FlatList 
      bounces
      horizontal
      data={data}
      keyExtractor={(item, idx) => String(item)}
      renderItem = {({item, index}) => {
        const selected = index === currentIndex;
        return(
          <MaterialComunityIcons
            name="format-letter-case"
            color='#000' size={28}
            onPress={() => onSelected(index)}
            style={{ alignSelf: 'center', backgroundColor: '#fff', borderRadius: 19, marginLeft: 8}}
          />
        )
      }}
    />
    </>
  )
}