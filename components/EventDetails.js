import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Modal, Image, Button, Alert, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import Colors from '../constants/colors';
import { loremIpsum } from 'lorem-ipsum';

const windowHeight = Dimensions.get('window').height;
const description = loremIpsum({
  count: 100,
  units: 'words',
});

async function loadFonts() {
  await Font.loadAsync({
    'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-MediumItalic': require('../assets/fonts/Montserrat-MediumItalic.ttf'),
  });
}

loadFonts();

function EventDetails({ selectedEvent, eventModalVisible, onCancel }) {

  const [fontsLoaded] = useFonts({
    'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-MediumItalic': require('../assets/fonts/Montserrat-MediumItalic.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  return (

    

    <Modal
      visible={eventModalVisible}
      animationType="slide"
      onRequestClose={onCancel}
      transparent={true}
    >
      <View style={styles.modalBackground}>
        <BlurView
          intensity={20}
          style={styles.blurView}
        >
          <View style={styles.modalContent}>
            <Image source={require('../assets/images/token.png')} style={{ width: 75, height: 75, marginBottom: 25 }} />
            <View style={styles.container}>
              <Text style={styles.host}>{selectedEvent.host.toUpperCase()}</Text>
              <Text style={styles.eventName}>{selectedEvent.eventName}</Text>
              <Image
                source={{ uri: 'https://modernlifestyle-prod.nyc3.cdn.digitaloceanspaces.com/4365253/158bbf62-5b68-458a-8560-be9480a2a93b/original.gif?v=sd6hb1' }}
                style={styles.image}
              />
              <Text style={styles.detailsText}>{selectedEvent.date.split(',')[0]}: {selectedEvent.time}</Text>
              <Text style={styles.detailsText}>{selectedEvent.neighborhood}, {selectedEvent.metro}</Text>
              <View style={styles.scrollViewContainer}>
                <ScrollView style={styles.scrollView}>
                  <Text style={styles.text}>
                  {description}{selectedEvent.membershipRequired ? '\n\nMembership Required.' : ''}
                  </Text>
                </ScrollView>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.cancelButton}>
                <TouchableOpacity
                  style={{ 
                    flex: 1,
                    backgroundColor: Colors.secondaryButton,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}
                  onPress={onCancel}
                >
                  <Text style={{ color: Colors.primaryButton }}>Cancel</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.submitButton}>
                <TouchableOpacity
                  style={{ 
                    flex: 1,
                    backgroundColor: Colors.primaryButton,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    Alert.alert("Notice", `This action will redirect user to\n${selectedEvent.website.substring(8)}.`);
                  }}
                >
                  <Text style={{ color: 'white' }}>RSVP</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </BlurView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.modalBackground, // Make sure this covers the screen
  },
  blurView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modalContent: {
    width: '80%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxHeight: windowHeight * 0.7,
    marginBottom: 10,
    padding: 10,
    backgroundColor: Colors.eventBackground,
    borderRadius: 10,
    alignItems: 'center',
  },
  host: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: 'Montserrat-Bold',
    letterSpacing: 6,
  },
  eventName: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Montserrat-MediumItalic'
  },
  detailsText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: 'Montserrat-Bold',
  },
  image: {
    width: 125,
    height: 175,
    marginBottom: 10,
    borderRadius: 5
  },
  text: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 5,
    fontFamily: 'Montserrat-Medium',
  },
  scrollViewContainer: {
    height: '45%',
    padding: 5,
    width: '100%',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 10, 
  },
  submitButton: {
    width: '45%',
    height: 40, 
    borderRadius: 10,
  },
  cancelButton: {
    width: '45%',
    height: 40,
    borderRadius: 10,
  }
});

export default EventDetails;
