import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

import {COLORS} from '@/src/theme/colors';
import {GST} from '@/src/theme/globalStyles';
import {selectStyle} from '@/src/theme/responsive';
import {SIZING} from '@/src/theme/sizing';
import {Event} from '@/src/types/event';

import Card from '../card';
import Text from '../text';

interface EventItemProps {
  event: Event;
  onPress?: () => void;
}

export const EventItem = memo(({event, onPress}: EventItemProps) => {
  const result = event.results[0];
  return (
    <TouchableOpacity onPress={onPress}>
      <Card containerStyle={styles.container}>
        <View
          style={selectStyle({
            large: lgStyle.wrapper,
            default: styles.wrapper,
          })}>
          <View style={styles.dateTimeWrapper}>
            <View style={styles.dateTime}>
              <AntDesignIcon name="calendar" style={styles.icon} />
              <Text style={styles.dateTimeText}>{event.event_date}</Text>
            </View>
            <View style={styles.dateTime}>
              <AntDesignIcon name="clockcircleo" style={styles.icon} />
              <Text style={styles.dateTimeText}>{event.start_time}</Text>
            </View>
            <View style={styles.dateTime}>
              <AntDesignIcon
                name={event.place === 'H' ? 'home' : 'arrowup'}
                style={styles.icon}
              />
              <Text style={styles.dateTimeText}>
                {event.place === 'H' ? 'Home' : 'Away'}
              </Text>
            </View>
          </View>
          <View
            style={selectStyle({
              large: lgStyle.vsWrapper,
              default: styles.vsWrapper,
            })}>
            <Text style={styles.vsText}>{event.short_name}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.locationWrapper}>
            <Octicons name="location" style={styles.icon} />
            <Text style={styles.footerText}>
              {event.location?.toLocaleUpperCase()}
            </Text>
          </View>
          <View style={styles.locationWrapper}>
            {!!result && (
              <Text style={styles.footerText}>
                {result?.outcome} {result?.score}-{result?.opponent_score}
              </Text>
            )}
            <Ionicons
              name="trophy"
              style={[
                styles.icon,
                {
                  color:
                    result?.outcome === 'W'
                      ? COLORS.ORANGE
                      : result?.outcome === 'T'
                      ? COLORS.GRAY
                      : COLORS.BLACK,
                },
              ]}
            />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  wrapper: {
    padding: 5,
  },
  dateTimeWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateTimeText: {
    fontWeight: '500',
    fontSize: 15,
    marginRight: 5,
  },
  icon: {
    margin: 10,
    fontSize: 18,
    color: COLORS.GREEN_600,
  },
  vsWrapper: {
    marginLeft: 10,
    marginBottom: 5,
  },
  vsText: {
    fontWeight: '500',
    fontSize: 18,
    color: COLORS.DARK_BLUE,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: COLORS.TW_GRAY_300,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const lgStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row-reverse',
    ...GST.p3,
  },
  vsWrapper: {
    marginTop: 8,
    ...SIZING.w50,
  },
});
