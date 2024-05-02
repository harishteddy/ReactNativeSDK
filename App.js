/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, TouchableOpacity, Alert } from 'react-native';
import { Colors, Header, LearnMoreLinks } from 'react-native/Libraries/NewAppScreen';
import SmartechReact, { SmartechPushReact, SmartechAppInboxReact, SmartechBaseReact } from 'smartech-base-react-native';

const App: React.FC = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const handleDeeplinkWithPayload = (smartechData) => {
      console.log('Smartech Data :: ', smartechData);
      console.log('Smartech Deeplink :: ', smartechData.smtDeeplink);
      console.log('Smartech CustomPayload:: ', smartechData.smtCustomPayload);
   };
 

    // Deeplink callback for Push Notification, InappMessage and AppInbox
    SmartechReact.addListener(SmartechReact.SmartechDeeplink, handleDeeplinkWithPayload);
    

    

    // Remove listener on cleanup
    return function cleanup() {
      SmartechReact.removeListener(SmartechReact.SmartechDeeplink);
    };
  }, []);

  const appinboxdata = () => {
    SmartechBaseReact.login("harish@gmail.com");

    SmartechAppInboxReact.getAppInboxCategoryList((error: any, categoryList: any) => {
      if (error) {
        console.error('Error fetching category list:', error);
        return;
      }
      console.log('App Inbox Category List:', categoryList);
    });

    SmartechAppInboxReact.getAppInboxMessagesByApiCall(10, 1, ["harish"], (error: any, appInboxMessages: any) => {
      if (error) {
        console.error('Error fetching app inbox messages:', error);
        return;
      }
      console.log('App Inbox Messages:', appInboxMessages);
    });

    SmartechAppInboxReact.getAppInboxMessageCount(3, (error: any, count: any) => {
      if (error) {
        console.error('Error fetching app inbox message count:', error);
        return;
      }
      console.log('App Inbox Message Count:', count);
    });

    SmartechAppInboxReact.getAppInboxMessages(0, (error: any, appInboxMessages: any) => {
      if (error) {
        console.error('Error fetching app inbox messages:', error);
        return;
      }
      console.log('App Inbox Messages:', appInboxMessages);
    });

    SmartechAppInboxReact.getAppInboxMessagesWithCategory(["harish"], (error: any, appInboxMessages: any) => {
      if (error) {
        console.error('Error fetching app inbox messages with category:', error);
        return;
      }
      console.log('App Inbox Messages with Category:', appInboxMessages);
      Alert.alert(JSON.stringify(appInboxMessages));
    });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={appinboxdata}
          >
            <Text style={styles.buttonTextStyle}>AppInbox</Text>
          </TouchableOpacity>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  buttonTextStyle: {
    fontSize: 18,
  },
});

export default App;
