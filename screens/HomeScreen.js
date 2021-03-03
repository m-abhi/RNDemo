import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Notifications from "./Notifications";
import Notifiers from "./Notifiers";
import Search from "./Search";
import Profile from "./Profile";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

class HomeScreen extends React.Component {
  render() {
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Notifications') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Notifiers') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      >
        <Tab.Screen name="Notifications" component={Notifications} />
        <Tab.Screen name="Notifiers" component={Notifiers} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }
}

export default HomeScreen;