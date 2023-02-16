import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from '@/src/components/button';
import Icon from '@/src/components/icon';
import Image from '@/src/components/image';
import {StackNavHeader} from '@/src/components/navigation/navHeaders';
import {BackButton} from '@/src/components/navigation/navItems';
import TextInput from '@/src/components/textInput';
import {useAppDispatch} from '@/src/hooks/store';
import {
  setCurrentSchool,
  setSelectedSchools,
} from '@/src/store/reducers/schoolsReducer';
import {setSelectedTeams} from '@/src/store/reducers/teamsReducer';
import {setUserInfo} from '@/src/store/reducers/userReducer';
import colors from '@/src/styles/colors';
import {COLORS} from '@/src/theme/colors';
import {GST} from '@/src/theme/globalStyles';
import {IS_LANDSCAPE} from '@/src/theme/responsive';
import {LoginResponse} from '@/src/types/auth';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';
import {SchoolsResponse} from '@/src/types/school';
import {TeamsResponse} from '@/src/types/team';
import {HTTP_CLIENT} from '@/src/utils/config';
import {getCurrentSchoolYear} from '@/src/utils/date';
import {notifyMessage} from '@/src/utils/helpers';
import {LOGIN_API_URL, SCHOOLS_API_URL, TEAMS_API_URL} from '@/src/utils/urls';

type LoginProps = DrawerScreenProps<ScreenParamList, ScreenNames.Login>;

const Login = ({navigation, route}: LoginProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const heightMobileUI = 896;
  const widthMobileUI = 414;

  const dispatch = useAppDispatch();

  const onLogin = useCallback(async () => {
    try {
      setIsLoading(true);
      const {data: loginData}: LoginResponse = await HTTP_CLIENT.post(
        LOGIN_API_URL,
        credentials,
      );
      const {user_id, level, team_ids, school} = loginData;

      // fetch the teams
      const {data: teamsData}: TeamsResponse = await HTTP_CLIENT.get(
        TEAMS_API_URL,
        {
          params: {
            team_id: {
              $in: team_ids,
            },
            subdomain: school,
            year: getCurrentSchoolYear(),
            include_roster: false,
          },
        },
      );

      // fetch the current school
      const {data: schoolsData}: SchoolsResponse = await HTTP_CLIENT.get(
        SCHOOLS_API_URL,
        {
          params: {
            subdomain: school,
          },
        },
      );
      dispatch(setSelectedSchools(schoolsData.objects));
      dispatch(setCurrentSchool(schoolsData.objects?.[0]));
      dispatch(
        setSelectedTeams(
          teamsData.objects?.map(t => ({
            ...t,
            school_id: schoolsData.objects?.[0]?.school_id,
          })),
        ),
      );
      dispatch(
        setUserInfo({
          userId: user_id,
          userType: level,
          isInitialized: true,
        }),
      );
      navigation.reset({
        index: 0,
        routes: [{name: ScreenNames.PostResultStack}],
      });
    } catch (err) {
      notifyMessage('Invalid username/password');
      setIsLoading(false);
    }

    // store to state
  }, [credentials, dispatch, navigation]);

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <StackNavHeader
            title={route.name}
            leftButton={<BackButton color={COLORS.WHITE} />}
          />
        );
      },
    });
  }, [navigation, route]);

  const responsiveWidth = (width: number) => {
    return (Dimensions.get('window').width * width) / widthMobileUI;
  };

  const responsiveHeight = (height: number) => {
    return (Dimensions.get('window').height * height) / heightMobileUI;
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, IS_LANDSCAPE && GST.FLEX_ROW]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={[styles.logoContainer]}>
        <Image
          source={require('../../assets/images/userImage.jpg')}
          style={[
            styles.logo,
            {width: responsiveWidth(88), height: responsiveHeight(88)},
          ]}
        />
      </View>

      <View>
        <Text style={styles.loginText}>
          Please login with your Control Panel {'\n'} username and password
        </Text>

        <View style={styles.loginFormContainer}>
          <TextInput
            placeholder="Username"
            leftIcon={<Icon name={'user'} type="font-awesome" color="#FFF" />}
            style={styles.formInput}
            placeholderTextColor={colors.white}
            textContentType="emailAddress"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            onChangeText={val =>
              setCredentials(state => ({
                ...state,
                username: val,
              }))
            }
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.formInput}
            leftIcon={<Icon name="lock" type="font-awesome" color="#FFF" />}
            placeholderTextColor={colors.white}
            autoCapitalize="none"
            textContentType="password"
            onChangeText={val =>
              setCredentials(state => ({
                ...state,
                password: val,
              }))
            }
          />

          <Button
            title="Login"
            onPress={onLogin}
            disabled={isLoading}
            loading={isLoading}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
    backgroundColor: COLORS.TW_BLUE_900,
  },
  formInput: {
    color: COLORS.WHITE,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    // width: 88,
    // height: 88,
    borderRadius: 100,
    marginTop: 40,
  },
  logoResponsive: {},
  loginText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 16,
    color: COLORS.WHITE,
  },
  loginFormContainer: {
    marginTop: 16,
    // flex: 1,
  },
});

export default Login;
