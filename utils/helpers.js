import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { red, orange, blue, lightPurp, pink, white } from './colors'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions';



const NOTIFICATION_KEY = 'MobileFlashCards:notifications'

export async function clearLocalNotification() {
  await AsyncStorage.removeItem(NOTIFICATION_KEY);
  Notifications.cancelAllScheduledNotificationsAsync();
}

function createNotification () {
  return {
    title: 'Decks are waiting!',
    body: "👋 don't forget to quiz some decks for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(async (data) => {
      if (data === null) {
        const {status} = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
        );
        if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync();

          let tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(20);
          tomorrow.setMinutes(0);

          Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              {
                time: tomorrow,
                repeat: 'day',
              }
          );

          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
        }
      }
    })
}
