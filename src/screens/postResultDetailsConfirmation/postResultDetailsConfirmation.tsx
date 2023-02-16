import {DrawerScreenProps} from '@react-navigation/drawer';
import {Button} from '@rneui/themed';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ErrorMessage from '@/src/components/errorMessage';
import Image from '@/src/components/image';
import {StackNavHeader} from '@/src/components/navigation/navHeaders';
import {BackButton} from '@/src/components/navigation/navItems';
import Text from '@/src/components/text';
import colors from '@/src/styles/colors';
import {COLORS} from '@/src/theme/colors';
import {GST} from '@/src/theme/globalStyles';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';
import {PostResultResponse} from '@/src/types/postResult';
import {HTTP_CLIENT} from '@/src/utils/config';
import {PUBLISH_EVENT_URL} from '@/src/utils/urls';

type PostResultDetailsProps = DrawerScreenProps<
  ScreenParamList,
  ScreenNames.PostResultDetailsConfirmation
>;

const PostResultsDetailsConfirmation = ({
  navigation,
  route,
}: PostResultDetailsProps) => {
  const insets = useSafeAreaInsets();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);

  const {postResult} = route.params;

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <StackNavHeader
            title="Publish this result?"
            leftButton={<BackButton color={COLORS.WHITE} />}
          />
        );
      },
    });
  }, [navigation]);

  const onCancelTap = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onConfirmTap = useCallback(async () => {
    try {
      setIsLoading(true);

      const {data: postResultData}: PostResultResponse = await HTTP_CLIENT.post(
        PUBLISH_EVENT_URL,
        postResult,
      );

      setIsLoading(false);
      navigation.navigate(ScreenNames.PostResults);

      console.log(postResultData);
    } catch (e: any) {
      // console.log(e.response.data);
      setErrorMessage(e.response.data?.errors);
      setIsLoading(false);
    }
  }, [postResult, navigation]);

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      <ScrollView>
        <View style={styles.logoWrapper}>
          <Image
            source={require('../../assets/images/megaphone.jpg')}
            style={styles.logo}
          />
        </View>

        {errorMessage.map((itemMsg, i) => {
          return <ErrorMessage errorMessage={itemMsg} key={i} />;
        })}

        <View style={[GST.FLEX_ROW, styles.formField]}>
          <View style={[styles.flex]}>
            <Text style={styles.title}>Score</Text>
          </View>
          <View style={[styles.flex, styles.leftForm]}>
            <Text style={styles.valueTxt}>{postResult.score}</Text>
          </View>
        </View>

        <View style={[GST.FLEX_ROW, styles.formField]}>
          <View style={styles.flex}>
            <Text style={styles.title}>Opponent Score</Text>
          </View>
          <View style={[styles.flex, styles.leftForm]}>
            <Text style={styles.valueTxt}>{postResult.opponent_score}</Text>
          </View>
        </View>

        <View style={[GST.FLEX_ROW, styles.formField]}>
          <View style={styles.flex}>
            <Text style={styles.title}>Outcome</Text>
          </View>
          <View style={[styles.flex, styles.leftForm]}>
            <Text style={styles.valueTxt}>{postResult.outcome}</Text>
          </View>
        </View>

        <View style={[GST.FLEX_ROW, styles.formField]}>
          <View style={styles.flex}>
            <Text style={styles.title}>Front page</Text>
          </View>
          <View style={[styles.flex, styles.leftForm]}>
            <Text style={styles.valueTxt}>
              {postResult.show_front_page ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>

        <View style={[GST.FLEX_ROW, styles.formField]}>
          <View style={styles.flex}>
            <Text style={styles.title}>Title</Text>
          </View>
          <View style={[styles.flex, styles.leftForm]}>
            <Text style={styles.valueTxt}>{postResult.title}</Text>
          </View>
        </View>

        <View style={styles.formField}>
          <Text style={styles.title}>Newsfeed</Text>
          <Text style={styles.valueTxt}>{postResult.story}</Text>
        </View>
      </ScrollView>
      <View style={[GST.FLEX_ROW, styles.buttonWrapper]}>
        <View style={styles.flex}>
          <Button
            title="Cancel"
            buttonStyle={styles.primaryBtn}
            onPress={onCancelTap}
          />
        </View>

        <View style={styles.flex}>
          <Button
            title="Ok"
            buttonStyle={styles.secondaryBtn}
            onPress={onConfirmTap}
            loading={isLoading}
            disabled={isLoading}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  primaryBtn: {
    backgroundColor: '#464E61',
  },
  secondaryBtn: {
    backgroundColor: '#57CFEA',
    marginLeft: 8,
  },
  buttonWrapper: {
    marginTop: 40,
  },
  title: {
    fontWeight: '700',
    fontSize: 17,
    color: colors.white,
  },
  valueTxt: {
    fontWeight: '700',
    fontSize: 17,
    color: '#46D7EA',
  },
  formField: {
    flex: 1,
    borderBottomWidth: 1,
    paddingBottom: 8,
    paddingVertical: 16,
    borderBottomColor: colors.white,
  },
  leftForm: {
    alignItems: 'flex-end',
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 100,
    marginTop: 24,
    marginBottom: 8,
  },
  logoWrapper: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: '#5B75B6',
  },
});

export default PostResultsDetailsConfirmation;
