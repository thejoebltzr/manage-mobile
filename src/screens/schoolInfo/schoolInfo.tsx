import {ListItem} from '@rneui/themed';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Card from '@/src/components/card';
import Container from '@/src/components/container';
import Text from '@/src/components/text';
import {useAppSelector} from '@/src/hooks/store';
import {RootState} from '@/src/store';
import {COLORS} from '@/src/theme/colors';
import {GST} from '@/src/theme/globalStyles';
import {selectStyle} from '@/src/theme/responsive';
import {goto} from '@/src/utils/linking';

const ICON_SIZE = 24;

const SchoolInfo = () => {
  const {currentSchool: school} = useAppSelector((state: RootState) => {
    return state.schools;
  });

  return (
    <Container shouldScroll>
      <Card containerStyle={GST.p0}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{school?.name}</Text>
        </View>
        <View
          style={selectStyle({large: lgStyles.contentContainer, default: {}})}>
          <View
            style={selectStyle({
              large: {
                ...GST.p2,
                ...GST.w50,
              },
              default: GST.p2,
            })}>
            <ListItem onTouchStart={() => goto(school?.url)}>
              <MaterialCommunityIcon name="web" size={ICON_SIZE} />
              <Text>Home</Text>
            </ListItem>
            <ListItem onTouchStart={() => goto(school?.facebook_url)}>
              <AntDesignIcon name="facebook-square" size={ICON_SIZE} />
              <Text>Facebook</Text>
            </ListItem>
            <ListItem onTouchStart={() => goto(school?.twitter_url)}>
              <AntDesignIcon name="twitter" size={ICON_SIZE} />
              <Text>Twitter</Text>
            </ListItem>
          </View>
          <View
            style={selectStyle({
              large: lgStyles.extraInfoContainer,
              default: styles.extraInfoContainer,
            })}>
            <View style={styles.extraInfo}>
              <Text style={styles.label}>Subdomain: </Text>
              <Text>{school?.subdomain}</Text>
            </View>
            <View style={styles.extraInfo}>
              <Text style={styles.label}>Address: </Text>
              <Text>
                {school?.address}, {school?.city}, {school?.state}
                {school?.zip}
              </Text>
            </View>
            <View style={styles.extraInfo}>
              <Text style={styles.label}>Phone: </Text>
              <Text>{school?.phone}</Text>
            </View>
            <View style={styles.extraInfo}>
              <Text style={styles.label}>Motto: </Text>
              <Text>{school?.motto}</Text>
            </View>
          </View>
        </View>
      </Card>
    </Container>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: '500',
  },
  extraInfoContainer: {
    ...GST.p3,
    backgroundColor: COLORS.TW_GRAY_LIGHT,
  },
  extraInfo: {
    ...GST.mb2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    ...GST.HEADER_TITLE,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  titleWrapper: {
    ...GST.p3,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY,
  },
});

const lgStyles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
  },
  extraInfoContainer: {
    ...GST.w50,
    ...GST.p3,
    backgroundColor: COLORS.TW_GRAY_LIGHT,
  },
});

export default SchoolInfo;
