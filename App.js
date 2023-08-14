import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import * as Constants from "expo-constants";

import { Button, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();
const useProxy = Platform.select({ web: false, default: true });

const client_id = 179093708495793;
const redirect_uri ="https://www.gday.vn/";
const scope = "user_profile,user_media";
const site = "https://api.instagram.com/oauth/authorize?client_id=" + client_id + "&redirect_uri=" + redirect_uri + "&scope=" + scope + "&response_type=code&state=1";
  const discovery = { authorizationEndpoint: site }

export default function App() {


  const [request, response, promptAsync] = useAuthRequest({
    redirectUri: makeRedirectUri({
      useProxy,
      native: redirect_uri
    }),
    scopes: [scope],
    clientId: client_id
  }, discovery);
  console.log("🚀 ~ file: App.js:33 ~ App ~ response:", response)



  React.useEffect(() => {
    console.log("🚀 ~ file: App.js:29 ~ App ~ response:", response)
    console.log("🚀 ~ file: App.js:29 ~ App ~ request:", request)
  }, [request, response]);


  React.useEffect(() => {
    console.log("HHHHUUUUUUHHHH: ", response?.type)
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log("code : ", code);
    }
  }, [response]);

  console.log("🚀 ~ file: App.js:48 ~ App ~ Constants.default.null:", Constants.default.null)

  return (<>
    <View><Button  title='test'></Button>
    <TouchableOpacity onPress={ () => promptAsync({useProxy,windowFeatures: { width: 700, height: 600 }}) }>
      <Text>Connect Your Instagram</Text>
    </TouchableOpacity>
  </View>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
