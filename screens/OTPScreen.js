import * as React from 'react';
import { Image, Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import OTPTextView from 'react-native-otp-textinput';

class OTPScreen extends React.Component {
  constructor(props) {
    super(props);
    this.isValid = this.isValid.bind(this);
  }
  state = {
    otpInput: '',
  }
  isValid = () => {
    if (this.state.otpInput == "") {
      alert('Please enter OTP')
      return false
    } else if (this.state.otpInput.length < 4) {
      alert('Please enter full OTP')
      return false
    } else if (this.state.otpInput != "1234") {
      alert('Invalid OTP')
      return false
    }
    return true
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../images/logo.png')}
          style={{ height: 150, width: 150, resizeMode: 'contain', }}
        />
        <OTPTextView
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          handleTextChange={(text) => this.setState({otpInput: text})}
          inputCount={4}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={styles.buttonView}
          onPress={
            // () => this.login(this.state.email, this.state.password)
            () => {
              if (this.isValid()) {
                // alert('Success')
                this.props.navigation.navigate('Reset Password', {
                  showOldPasswordField: false
                });
              }
            }
          }>
          <Text style={styles.textCaps}> Submit </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F8F8F8'
    // justifyContent: 'center',
  },
  buttonView: {
    marginTop: 20,
    width: '50%',
    backgroundColor: '#0095F1',
    textAlign: 'center',
    borderRadius: 25,
    marginTop: 10,
    padding: 10,
    margin: 10
  },
  textCaps: {
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
  },
  textNormal: {
    textAlign: 'center',
  },
  textColored: {
    textAlign: 'center',
    color: '#0095F1'
  },
  textInput: {
    padding: 10,
    backgroundColor: '#fff',
    width: '80%',
    marginTop: 20,
    borderRadius: 5,
  },
  horizontalView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
});

export default OTPScreen;