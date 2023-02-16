import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import WebView from 'react-native-webview';

import {StackNavHeader} from '@/src/components/navigation/navHeaders';
import {BackButton} from '@/src/components/navigation/navItems';
import {COLORS} from '@/src/theme/colors';
import {GST} from '@/src/theme/globalStyles';
import {ScreenNames, ScreenParamList} from '@/src/types/navigation';

type AnnouncementProps = DrawerScreenProps<
  ScreenParamList,
  ScreenNames.AnnouncementDetails
>;

const AnnouncementDetails = ({navigation, route}: AnnouncementProps) => {
  const [isLoading, setLoading] = useState(true);

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

  return (
    <View style={GST.FLEX}>
      {isLoading && <ActivityIndicator size="large" />}

      <WebView
        source={{uri: route.params.url}}
        onError={error => {
          console.log(error);
        }}
        onLoadStart={() => {
          setLoading(true);
        }}
        onLoad={() => {
          setLoading(false);
        }}
      />
    </View>
  );
};

export default AnnouncementDetails;
