/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


// React
// Utils
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect, useMemo, useReducer } from 'react';
import 'react-native-gesture-handler';
import { initialState, reducer } from './reducer';
// Screens
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import OTPScreen from "./screens/OTPScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import SignupScreen from "./screens/SignupScreen";
import SplashScreen from "./screens/SplashScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { AuthContext } from './utils/AuthContext';
import { stateConditionString } from './utils/helpers';



const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator name="Auth" mode="modal" initialRouteName="Welcome" screenOptions={{
      headerTitleAlign: 'center'
    }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="Reset Password" component={ResetPasswordScreen} />
    </Stack.Navigator>
  )
}

const HomeStack = () => {
  const { signOut } = useContext(AuthContext);
  return (
    <Stack.Navigator name="Home" mode="modal" initialRouteName="HomeScreen" screenOptions={{
      headerTitleAlign: 'center'
    }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerLeft: null
        }}
      // initialParams={{ signOut: signOut }}
      />
    </Stack.Navigator>
  )
}

export default App = ({ navigation }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {

    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      } finally {
        setTimeout(() => {
          if (userToken != null && userToken != "") {
            dispatch({ type: 'SIGN_IN', token: userToken });
          } else {
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
          }
        }, 2000);
      }

      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.


      // dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    bootstrapAsync();
  }, []);

  /* In a production app, we need to send some data (usually username, password) to server and get a token
  We will also need to handle errors if sign in failed
  After getting token, we need to persist the token using `AsyncStorage` */
  const authContextValue = useMemo(
    () => ({
      signIn: async (data) => {
        if (
          data &&
          data.phone !== undefined &&
          data.password !== undefined
        ) {
          dispatch({ type: 'SIGN_IN', token: 'Token-For-Now' });
        } else {
          dispatch({ type: 'TO_SIGNIN_PAGE' });
        }
      },
      signOut: async (data) => {
        dispatch({ type: 'SIGN_OUT' });
      },

      signUp: async (data) => {
        if (
          data &&
          data.phone !== undefined &&
          data.password !== undefined
        ) {
          dispatch({ type: 'SIGNED_UP', token: 'dummy-auth-token' });
        } else {
          dispatch({ type: 'TO_SIGNUP_PAGE' });
        }
      },
    }),
    [],
  );

  const chooseScreen = (state) => {
    let navigateTo = stateConditionString(state);
    let arr = [];

    switch (navigateTo) {
      case 'LOAD_APP':
        arr.push(<Stack.Screen name="Splash" component={SplashScreen} options={{
          headerShown: false
        }} />);
        break;

      case 'LOAD_SIGNUP':
        arr.push(
          <Stack.Screen
            name="SignUp"
            component={SignupScreen}
            options={{
              title: 'Sign Up',
              headerTitleAlign: 'center',
              animationTypeForReplace: state.isSignout ? 'pop' : 'push',
            }}
          />,
        );
        break;
      case 'LOAD_SIGNIN':
        arr.push(<Stack.Screen name="Login" component={LoginScreen} options={{
          headerTitleAlign: 'center'
        }} />);
        break;

      case 'LOAD_HOME':
        arr.push(
          <Stack.Screen
            name="Home"
            component={HomeStack}
            options={{
              title: 'Home Screen',
              headerStyle: { backgroundColor: 'black' },
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerShown: false
            }}
          />,
        );
        break;
      default:
        arr.push(<Stack.Screen name="Auth" component={AuthStack} options={{
          headerShown: false
        }} />);
        break;
    }
    return arr[0];
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        <Stack.Navigator>{chooseScreen(state)}</Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

// export default App;