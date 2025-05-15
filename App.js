/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView, ScrollView, StatusBar, StyleSheet,
  Text, useColorScheme, View, TouchableOpacity, Alert,
} from 'react-native';
import { Colors, Header, LearnMoreLinks } from 'react-native/Libraries/NewAppScreen';
import SmartechReact from 'smartech-base-react-native';
const SmartechAppInboxReact = require('smartech-appinbox-react-native');

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

    SmartechReact.addListener(SmartechReact.SmartechDeeplink, handleDeeplinkWithPayload);

    return () => {
      SmartechReact.removeListener(SmartechReact.SmartechDeeplink);
    };
  }, []);

  const appinboxdata = () => {
    // Ensure login is done first
    SmartechReact.login("harish@gmail.com");

    // Delay API calls to ensure login is processed
    setTimeout(() => {
      SmartechAppInboxReact.getAppInboxCategoryList((error, categoryList) => {
        
        console.log('App Inbox Category List:', categoryList);
      });

      SmartechAppInboxReact.getAppInboxMessagesByApiCall(10, 1, ["harish"], (error, appInboxMessages) => {
        
      console.log('App Inbox Messages:', appInboxMessages);
      });

      SmartechAppInboxReact.getAppInboxMessageCount(3, (error, count) => {
       
        console.log('App Inbox Message Count:', count);
      });

      SmartechAppInboxReact.getAppInboxMessages(1, (error, appInboxMessages) => {
    
        console.log('App Inbox Messages:', appInboxMessages);
      });

      SmartechAppInboxReact.getAppInboxMessagesWithCategory(["harish"], (error, appInboxMessages) => {
        
        console.log('App Inbox Messages with Category:', appInboxMessages);
        Alert.alert("Inbox", JSON.stringify(appInboxMessages));
      });
    }, 1500); // wait for login to complete
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <Header />
        <View style={{ backgroundColor: isDarkMode ? Colors.black : Colors.white }}>
          <TouchableOpacity style={styles.buttonStyle} onPress={appinboxdata}>
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
