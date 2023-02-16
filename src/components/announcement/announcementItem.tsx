import moment from 'moment';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {useOrientation} from '@/src/hooks/useOrientation';
import {GST} from '@/src/theme/globalStyles';
import {Bulletin} from '@/src/types/Bulletin';

import Card from '../card';
import Text from '../text';

export type AnnouncementItemProps = {
  announcements: Bulletin;
  onPress?: () => void;
};

export const AnnouncementItem = ({
  announcements,
  onPress,
}: AnnouncementItemProps) => {
  const regex = /(<([^>]+)>)/gi;
  const orientation = useOrientation();

  return (
    <TouchableOpacity onPress={onPress}>
      <Card containerStyle={styles.cardWrapper}>
        <View style={[styles.content, GST.FLEX_ROW]}>
          <View>
            <Text style={styles.txtTitle}>{announcements.title}</Text>
            <Text style={styles.txtDate}>
              {moment(announcements.created_at).format('MM/DD/yyyy HH:mm A')}
            </Text>
          </View>

          {orientation === 'LANDSCAPE' ? (
            <View style={styles.landscapeAnnouncements}>
              <Text style={styles.txtDescription}>
                {announcements.body.replace(regex, '')}
              </Text>
            </View>
          ) : (
            <View style={styles.cardFooter}>
              <Text style={styles.txtDescription}>
                {announcements.body.replace(regex, '')}
              </Text>
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    padding: 0,
  },
  landscapeAnnouncements: {
    marginLeft: 40,
  },
  content: {
    margin: 16,
  },
  cardFooter: {
    backgroundColor: '#D2D2D2',
    padding: 16,
  },
  txtTitle: {
    fontWeight: '700',
    fontSize: 17,
    color: '#475294',
  },
  txtDate: {
    fontWeight: '600',
    marginTop: 8,
  },
  txtDescription: {
    fontWeight: '700',
  },
});
