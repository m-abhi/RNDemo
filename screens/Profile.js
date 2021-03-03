import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from "@react-navigation/native";
import * as React from 'react';
import { Text, View } from 'react-native';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        // alert(this.props)
        this.removeUserID()
    }

    removeUserID = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
        } catch (error) {
            console.log(error)
        } finally {
            // Sign out here using Hooks
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Profile</Text>
            </View>
        );
    }
}

export default Profile;