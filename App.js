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
      const initialEvents = [
        {
          eventId: 1,
          host: 'Checkmate', 
          eventName: 'After Work Party',
          date: 'June 6, 2024',
          time: '7:00pm - 1:00am',
          metro: 'NYC', 
          neighborhood: 'Manhattan',
          website: 'https://www.checkmatenyc.com',
          membershipRequired: true
        },
        {
          eventId: 2,
          host: 'Checkmate',
          eventName: 'Erotica Fridays',
          date: 'June 7, 2024',
          time: '10:00pm - 4:00am',
          metro: 'NYC',
          neighborhood: 'Manhattan',
          website: 'https://www.checkmatenyc.com',
          membershipRequired: true
        },
        {
          eventId: 3,
          host: 'Checkmate',
          eventName: 'Lady in Red',
          date: 'June 8, 2024',
          time: '10:00pm - 4:00am',
          metro: 'NYC',
          neighborhood: 'Manhattan',
          rsvp: 'info@checkmatenyc.com',
          website: 'https://www.checkmatenyc.com',
          membershipRequired: true
        },
        {
          eventId: 4,
          host: 'The Loft',
          eventName: 'Freaky Friday',
          date: 'June 7, 2024',
          time: '10:00pm - 4:00am',
          metro: 'NYC',
          neighborhood: 'Brooklyn',
          website: 'https://www.theloftesl.com',
          membershipRequired: true
        },
        {
          eventId: 5,
          host: 'The Loft',
          eventName: 'Latin Party',
          date: 'June 8, 2024',
          time: '10:00pm - 4:00am',
          metro: 'NYC',
          neighborhood: 'Brooklyn',
          website: 'https://www.theloftesl.com',
          membershipRequired: true
        },
        {
          eventId: 6,
          host: 'The Loft',
          eventName: 'Naughty Friday',
          date: 'June 14, 2024',
          time: '10:00pm - 4:00am',
          metro: 'NYC',
          neighborhood: 'Brooklyn',
          website: 'https://www.theloftesl.com',
          membershipRequired: true
        },
        {
          eventId: 7,
          host: 'The Loft',
          eventName: 'Rainbow RAVE',
          date: 'June 15, 2024',
          time: '10:00pm - 4:00am',
          metro: 'NYC',
          neighborhood: 'Manhattan',
          website: 'https://www.theloftesl.com',
          membershipRequired: true
        },
        {
          eventId: 8,
          host: 'Caligula',
          eventName: 'ONE NIGHT STAND Swinger Fling THURSDAYS',
          date: 'June 6, 2024',
          time: '9:00pm - 3:00am',
          metro: 'NYC',
          neighborhood: 'Queens',
          website: 'https://www.caligulany.com',
          membershipRequired: false
        },
        {
          eventId: 9,
          host: 'Caligula',
          eventName: 'FREAKY FRIDAY XXX ‘Bust-a-Nut’ Bash SEXY SUMMER KICKOFF EDITION!',
          date: 'June 7, 2024',
          time: '9:00pm - 4:00am',
          metro: 'NYC',
          neighborhood: 'Queens',
          website: 'https://www.caligulany.com',
          membershipRequired: false
        },
        {
          eventId: 10,
          host: 'Caligula',
          eventName: "SPECIAL EVENT: ‘Reggaeton vs. Reggae’ Round II",
          date: 'June 8, 2024',
          time: '9:00pm - 4:00am',
          metro: 'NYC',
          neighborhood: 'Queens',
          website: 'https://www.caligulany.com',
          membershipRequired: false
        },
        {
          eventId: 11,
          host: 'Caligula',
          eventName: 'Summer Swinger Vibes',
          date: 'June 9, 2024',
          time: '9:00pm - 3:00am',
          metro: 'NYC',
          neighborhood: 'Queens',
          website: 'https://www.caligulany.com',
          membershipRequired: false
        }
      ];

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
        colors={['#800020', '#800020','#333333']} 
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.appContainer}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <Image 
            source={require('./assets/images/token.png')} 
            alt='Red Velvet' 
            style={{width: 40, height: 40, marginRight: 15}}
          />
          <Text style={{marginRight: 10, color: '#FDF3E7', fontSize: 24, fontFamily: 'Montserrat-Medium', letterSpacing: 9}}>RED VELVET</Text>
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
    paddingBottom: 25,
    paddingHorizontal: 10,
    flex: 1
  },
  goalsContainer: {
    flex: 9
  },
  item: {
    backgroundColor: 'rgba(253, 243, 231, 0.65)',
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
