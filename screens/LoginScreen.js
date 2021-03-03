import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useContext } from 'react';
import { validateAll } from 'indicative/validator';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Input, } from 'react-native-elements';
import { AuthContext } from '../utils/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [SignUpErrors, setSignUpErrors] = useState({});
  const { signIn } = useContext(AuthContext);

  const saveUserID = async () => {
    try {
      // await AsyncStorage.setItem('user_id', "10");
      await AsyncStorage.setItem('userToken', "10");
    } catch (error) {
      console.log(error)
    } finally {
      // this.props.navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Home' }]
      // });
      signIn({ phone, password });
    }
  }

  const handleSignIn = () => {

    // https://indicative.adonisjs.com
    const rules = {
      phone: 'required|string|min:8',
      password: 'required|string|min:6|max:40'
    };

    const data = {
      phone: phone,
      password: password
    };

    const messages = {
      required: field => `${field} is required`,
      'username.alpha': 'Username contains unallowed characters',
      'phone.min': 'Please enter a valid phone number',
      'password.min': 'Password must contain at-least 6 characters'
    };

    validateAll(data, rules, messages)
      .then(() => {
        showAlert("Success", "Login successful");
        console.log('success sign in');
        saveUserID()
      })
      .catch(err => {
        const formatError = {};
        err.forEach(err => {
          formatError[err.field] = err.message;
          // showAlert("Failed", err.message);
        });
        setSignUpErrors(formatError);
      });
  };

  const showAlert = (title, msg) => {
    Alert.alert(
      title,
      msg,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => console.log("OK Pressed")
        }
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../images/logo.png')}
        style={{ height: 150, width: 150, resizeMode: 'contain', }}
      />
      <Input
        style={styles.textInput}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        placeholder="Phone"
        multiline={false}
        maxLength={12}
        returnKeyType={"next"}
        keyboardType='phone-pad'
        autoCapitalize="none"
        onChangeText={setPhoneNumber}
        value={phone}
        errorStyle={{ color: 'red' }}
        errorMessage={SignUpErrors ? SignUpErrors.phone : null}
      />

      <Input
        style={styles.textInput}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        placeholder="Password"
        multiline={false}
        returnKeyType={"done"}
        keyboardType='default'
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
        errorStyle={{ color: 'red' }}
        errorMessage={SignUpErrors ? SignUpErrors.password : null}
      />

      <View style={{ alignSelf: 'flex-end', marginEnd: 40 }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Forgot Password');
          }}>
          <Text style={{ textAlign: 'right', marginTop: 20 }}> Forgot Password? </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.buttonView}
        onPress={() => {
          handleSignIn()
        }}>
        <Text style={styles.textCaps}> Login </Text>
      </TouchableOpacity>

      <View style={styles.horizontalView}>
        <Text style={styles.textNormal}> Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Signup');
          }}>
          <Text style={styles.textColored}> Signup </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
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
});

export default LoginScreen;