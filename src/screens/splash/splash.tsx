import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import Card from '@/src/components/card';
import Image from '@/src/components/image';
import Text from '@/src/components/text';
import {useAppDispatch} from '@/src/hooks/store';
import {setUserType} from '@/src/store/reducers/userReducer';
import {Colors} from '@/src/styles';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';

type SplashProps = NativeStackScreenProps<ScreenParamList, ScreenNames.Splash>;

const Splash = ({navigation}: SplashProps) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.parentCoach}>
        <Card containerStyle={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => {
              dispatch(setUserType('parent'));
              navigation.navigate(ScreenNames.AllSchools);
            }}
            testID="parent-button">
            <Image
              source={require('../../assets/images/userImage.jpg')}
              style={styles.logo}
            />
            <Text style={styles.title}>Parent</Text>
          </TouchableOpacity>
        </Card>
        <Card containerStyle={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNames.Login);
            }}
            testID="coach-button">
            <Image
              source={require('../../assets/images/userImage.jpg')}
              style={styles.logo}
            />
            <Text style={styles.title}>Coach</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.lightPrimary,
    borderWidth: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    marginTop: 8,
    color: Colors.white,
  },
  logo: {
    width: 104,
    height: 104,
    borderRadius: 100,
  },
  parentCoach: {
    flexDirection: 'row',
  },
  parentCoachItem: {
    marginHorizontal: 18,
  },
});

export default Splash;
