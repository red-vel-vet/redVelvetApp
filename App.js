import React, { useState, useEffect } from 'react';
import { 
  StyleSheet,
  Text, 
  View, 
  FlatList, 
  TouchableOpacity,
  Image
} from 'react-native';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import EventDetails from './components/EventDetails';
import Colors from './constants/colors';
import initialEvents from './constants/events';

async function loadFonts() {
  await Font.loadAsync({
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-MediumItalic': require('./assets/fonts/Montserrat-MediumItalic.ttf'),
  });
}

loadFonts();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-MediumItalic': require('./assets/fonts/Montserrat-MediumItalic.ttf'),
    // include other font styles if needed
  });

  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (fontsLoaded) {
      

      initialEvents.sort((a, b) => {
        const dateTimeA = moment(`${a.date} ${a.time.split(' - ')[0]}`, 'MMMM D, YYYY h:mm A');
        const dateTimeB = moment(`${b.date} ${b.time.split(' - ')[0]}`, 'MMMM D, YYYY h:mm A');
      
        if (dateTimeA.isBefore(dateTimeB)) {
          return -1;
        } else if (dateTimeA.isAfter(dateTimeB)) {
          return 1;
        } else {
          return a.host.localeCompare(b.host, 'en-US');
        }
      });

      setEvents(initialEvents);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // or some loading screen
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient 
        colors={[Colors.primary, Colors.primary, Colors.accent]} 
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.appContainer}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <Image 
            source={require('./assets/images/token.png')} 
            alt='Red Velvet icon' 
            style={{width: 40, height: 40, marginRight: 15}}
          />
          <Text style={{marginRight: 10, color: Colors.title, fontSize: 24, fontFamily: 'Montserrat-Medium', letterSpacing: 9}}>RED VELVET</Text>
        </View>
        
        <View style={styles.goalsContainer}>
          <FlatList 
            style={{paddingHorizontal: 5}}
            data={events} 
            keyExtractor={(event) => event.eventId.toString()}
            renderItem={eventData => (
              <TouchableOpacity 
                style={styles.item}
                onPress={() => {
                  setEventModalVisible(true);
                  setSelectedEvent(eventData.item);
                }}
              >
                <View style={{flex: 3, justifyContent: 'center'}}>
                  <Text style={{...styles.text, fontFamily: 'Montserrat-Bold'}}>
                    {eventData.item.host.toUpperCase()} {eventData.item.membershipRequired ? '(M)' : ''}
                  </Text>
                  <Text 
                    style={{...styles.text, fontFamily: 'Montserrat-MediumItalic'}} 
                    numberOfLines={1} 
                    ellipsizeMode='tail'>
                      {eventData.item.eventName}
                    </Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{...styles.text, fontFamily: 'Montserrat-Bold'}}>{eventData.item.date.split(',')[0]}</Text>
                  <Text style={styles.text}>{eventData.item.time.split(' ')[0]}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        {selectedEvent && (
          <EventDetails 
            eventModalVisible={eventModalVisible}
            selectedEvent={selectedEvent}
            onCancel={() => setEventModalVisible(false)}
          />
        )}
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 10,
    flex: 1
  },
  goalsContainer: {
    flex: 9
  },
  item: {
    backgroundColor: Colors.itemBackground,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 8,
    flexDirection: 'row'  
  },
  text: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    paddingVertical: 2
  }
});
