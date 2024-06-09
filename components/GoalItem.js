import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Pressable, Animated, Alert } from 'react-native';

function GoalItem({ goal, onDelete }) {
    const [shouldDelete, setShouldDelete] = useState(false);
    const opacity = useState(new Animated.Value(1))[0];
  
    useEffect(() => {
      if (shouldDelete) {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => onDelete(goal.key));
      }
    }, [shouldDelete]);
  
    return (
      <Pressable onPress={() => {
        Alert.alert(
          'Delete Goal',
          'Are you sure you want to delete this goal?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => setShouldDelete(true),
            },
          ],
          { cancelable: false },
        );
      }}>
        <Animated.View style={{ ...styles.goalItem, opacity: opacity }}>
          <Text style={styles.goalText}>{goal.text}</Text>
        </Animated.View>
      </Pressable>
    );
}

const styles = StyleSheet.create({
    goalItem: {
        padding: 10,
        margin: 5,
        backgroundColor: '#620805',
        borderRadius: 8
    },
    goalText: {
        color: '#FDF3E7'
    }
});

export default GoalItem;