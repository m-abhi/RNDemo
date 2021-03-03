import React from 'react';
import { Image, View } from 'react-native';

class SplashScreen extends React.Component {

  constructor(props) {
    super(props);
    // alert('Splash')
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
          source={require("../android/app/src/main/res/drawable/launch_screen.jpg")}
        ></Image>
      </View>
    );
  }
}

export default SplashScreen;