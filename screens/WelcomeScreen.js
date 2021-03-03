import * as React from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';

class WelcomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../images/logo.png')}
          style={{ height: '50%', width: '50%', resizeMode: 'contain', }}
        />
        <View style={{ width: '50%', margin: 10 }}>
          <Button
            title="Signup"
            onPress={() => {
              /* 1. Navigate to the Login route with params */
              this.props.navigation.navigate('Signup');
            }}
          />
        </View>
        <View style={{ width: '50%', margin: 10 }}>
          <Button
            title="Login"
            onPress={() => {
              /* 1. Navigate to the Login route with params */
              this.props.navigation.navigate('Login');
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    width: '50%',
    marginTop: 10,
    padding: 10,
    margin: 10
  },
  text: {
    textAlign: 'center'
  },
});

export default WelcomeScreen;