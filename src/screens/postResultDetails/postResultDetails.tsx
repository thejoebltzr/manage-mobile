import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import Button from '@/src/components/button';
import Dropdown from '@/src/components/dropdown';
// import ErrorMessage from '@/src/components/errorMessage';
import Image from '@/src/components/image';
import {StackNavHeader} from '@/src/components/navigation/navHeaders';
import {BackButton} from '@/src/components/navigation/navItems';
import Switch from '@/src/components/switch';
import Text from '@/src/components/text';
import TextInput from '@/src/components/textInput';
import {useAppSelector} from '@/src/hooks/store';
import {RootState} from '@/src/store';
import colors from '@/src/styles/colors';
import {COLORS} from '@/src/theme/colors';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';

type PostResultDetailsProps = StackScreenProps<
  ScreenParamList,
  ScreenNames.PostResultDetails
>;

const PostResultDetails = ({navigation, route}: PostResultDetailsProps) => {
  const {userId} = useAppSelector((state: RootState) => {
    return state.user;
  });
  const {currentSchool} = useAppSelector((state: RootState) => {
    return state.schools;
  });
  const {event} = route.params;

  // const [errorMessage, setErrorMessage] = useState([]);

  const [postResult, setPostResult] = useState({
    event_id: event.event_id,
    subdomain: currentSchool?.subdomain,
    score: '',
    opponent_score: '',
    title: '',
    outcome: '',
    show_front_page: false,
    story: '',
    created_by: userId ?? 0,
  });

  const data = [
    {label: 'win', value: 'win'},
    {label: 'lose', value: 'lose'},
    {label: 'tie', value: 'tie'},
    {label: 'n/a', value: 'n/a'},
  ];

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <StackNavHeader
            title="Post Result"
            leftButton={<BackButton color={COLORS.WHITE} />}
          />
        );
      },
    });
  }, [navigation, route]);

  const onPublishTap = useCallback(() => {
    navigation.navigate(ScreenNames.PostResultDetailsConfirmation, {
      postResult: postResult,
    });
  }, [postResult, navigation]);

  return (
    <ScrollView style={styles.mainView}>
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image
            source={require('../../assets/images/megaphone.jpg')}
            style={styles.logo}
          />
        </View>

        {/* {errorMessage.map((itemMsg, i) => {
          return <ErrorMessage errorMessage={itemMsg} key={i} />;
        })} */}

        <View style={[styles.rowWrapper, styles.rowItem]}>
          <View style={[styles.rowItem]}>
            <Text style={styles.txtLabel}>Score*</Text>
          </View>
          <View style={[styles.rowInput]}>
            <TextInput
              selectionColor={colors.white}
              inputStyle={styles.textInput}
              onChangeText={val =>
                setPostResult(state => ({
                  ...state,
                  score: val,
                }))
              }
            />
          </View>
        </View>

        <View style={[styles.rowWrapper, styles.rowItem]}>
          <View style={styles.rowItem}>
            <Text style={styles.txtLabel}>Opponent Score</Text>
          </View>
          <View style={styles.rowInput}>
            <TextInput
              selectionColor={colors.white}
              inputStyle={styles.textInput}
              onChangeText={val =>
                setPostResult(state => ({
                  ...state,
                  opponent_score: val,
                }))
              }
            />
          </View>
        </View>

        <View style={[styles.rowWrapper, styles.rowItem]}>
          <View style={styles.rowItem}>
            <Text style={styles.txtLabel}>Title</Text>
          </View>
          <View style={styles.rowInput}>
            <TextInput
              selectionColor={colors.white}
              inputStyle={styles.textInput}
              // value={title}
              onChangeText={val =>
                setPostResult(state => ({
                  ...state,
                  title: val,
                }))
              }
            />
          </View>
        </View>

        <View style={[styles.rowWrapper, styles.rowItem]}>
          <View style={styles.rowItem}>
            <Text style={styles.txtLabel}>Outcome</Text>
          </View>

          <Dropdown
            data={data}
            style={styles.dropdown}
            onChange={item =>
              setPostResult(state => ({
                ...state,
                outcome: item.value,
              }))
            }
            labelField="label"
            valueField="value"
            value={postResult.outcome}
            iconColor={colors.white}
            placeholderStyle={{color: colors.white}}
            selectedTextStyle={{color: colors.white}}
          />
        </View>

        <View style={[styles.rowWrapper, styles.rowItem]}>
          <View>
            <Text style={styles.txtLabel}>Display on front page</Text>
          </View>
          <View style={styles.rowInput}>
            <Switch
              onValueChange={val =>
                setPostResult(state => ({
                  ...state,
                  show_front_page: val,
                }))
              }
              value={postResult.show_front_page}
              color={colors.white}
            />
          </View>
        </View>

        <View style={styles.rowItem}>
          <Text style={styles.txtLabel}>News feed</Text>
          <TextInput
            selectionColor={colors.white}
            inputStyle={styles.textInput}
            onChangeText={val =>
              setPostResult(state => ({
                ...state,
                story: val,
              }))
            }
          />
        </View>

        <Button
          title="Publish"
          buttonStyle={styles.buttonPubl}
          onPress={onPublishTap}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#5B75B6',
  },
  container: {
    marginHorizontal: 18,
  },
  textInput: {
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    color: colors.white,
  },
  dropdown: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-end',
    marginLeft: 24,
    color: colors.white,
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 100,
    marginTop: 16,
    marginBottom: 8,
  },
  logoWrapper: {
    alignItems: 'center',
  },
  buttonPubl: {
    marginTop: 80,
    backgroundColor: '#55B9AE',
    fontWeight: '700',
  },
  txtLabel: {
    fontWeight: '700',
    fontSize: 18,
    color: '#7ED4E6',
  },
  rowWrapper: {
    flexDirection: 'row',
  },
  rowItem: {
    marginTop: 8,
    flex: 0.8,
  },
  rowInput: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default PostResultDetails;
