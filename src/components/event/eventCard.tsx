import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Typography} from '@/src/styles';
import {COLORS} from '@/src/theme/colors';
import {Event} from '@/src/types/event';
import {School} from '@/src/types/school';
import {Team} from '@/src/types/team';

import Card from '../card';
import Text from '../text';

interface EventCardProps {
  event: Event;
  school?: School;
  team?: Team;
}

export const EventCard = ({event, school, team}: EventCardProps) => {
  const result = event.results[0];
  return (
    <TouchableOpacity>
      <Card containerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{school?.name}</Text>
        </View>
        <View style={styles.kindWrapper}>
          <View style={styles.locationWrapper}>
            <Ionicons name="ios-football" style={styles.icon} />
            <Text style={styles.dateTimeText}>{event.kind}</Text>
          </View>
          <View style={styles.locationWrapper}>
            {!!result && (
              <Text style={styles.scoreText}>
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
        <View style={styles.wrapper}>
          <View style={styles.teamWrapper}>
            <Text style={styles.teamName}>{team?.sport_gender_level}</Text>
          </View>
          <View style={styles.vsWrapper}>
            <View style={styles.line} />
            <View style={styles.vsTextWrapper}>
              <Text style={styles.vsText}>VS</Text>
            </View>
            <View style={styles.line} />
          </View>
          <View style={styles.teamWrapper}>
            <Text style={styles.teamName}>{event.opponent}</Text>
          </View>
          <View style={styles.schoolWrapper}>
            <Text style={styles.schoolName}>{event.location}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.dateTime}>
            <AntDesignIcon name="calendar" style={styles.icon} />
            <Text style={styles.dateTimeText}>{event.event_date}</Text>
          </View>
          <View style={styles.dateTime}>
            <AntDesignIcon name="clockcircleo" style={styles.icon} />
            <Text style={styles.dateTimeText}>
              {event.start_time} TO {event.end_time}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  wrapper: {
    padding: 20,
    backgroundColor: COLORS.TW_GRAY,
  },
  dateTimeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTimeText: {
    fontWeight: '500',
    fontSize: 15,
  },
  icon: {
    marginHorizontal: 10,
    fontSize: 18,
    color: COLORS.GREEN_600,
  },
  vsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsTextWrapper: {
    padding: 6,
    backgroundColor: COLORS.GRAY,
    borderRadius: 99,
  },
  vsText: {
    fontWeight: '500',
    fontSize: 14,
    color: COLORS.WHITE,
  },
  teamWrapper: {
    marginVertical: 5,
  },
  teamName: {
    fontWeight: '500',
    fontSize: 16,
    color: COLORS.BLACK,
    textAlign: 'center',
  },
  schoolWrapper: {
    marginTop: 20,
  },
  schoolName: {
    fontWeight: '500',
    fontSize: 15,
    textAlign: 'right',
  },
  line: {
    borderColor: COLORS.TW_GRAY_300,
    borderWidth: 1,
    borderStyle: 'solid',
    width: 40,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.SECONDARY,
  },
  headerTitle: {
    ...Typography.title,
    textAlign: 'center',
  },
  kindWrapper: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: COLORS.WHITE,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
