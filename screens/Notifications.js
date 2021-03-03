import * as React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-elements';

class Notifications extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {/* <FlatList
                    data={DATA}
                    renderItem={renderItem}
                /> */}
                <Card>
                    {/* <Card.Title>CARD WITH DIVIDER</Card.Title> */}
                    {/* <Card.Divider /> */}
                    {
                        DATA.map((u, i) => {
                            return (
                                <TouchableOpacity key={i} style={styles.item} onPress={() => {
                                    alert('You clicked: ' + u.title)
                                }}>
                                    <Image
                                        source={require('../images/logo.png')}
                                        style={{ height: 50, width: 50, resizeMode: 'contain', }}
                                    />
                                    <Text style={styles.title}>{u.title}</Text>
                                    <Text style={styles.title}>{u.description}</Text>
                                </TouchableOpacity>
                            );
                        })
                    }
                </Card>
            </View>
        );
    }
}

const renderItem = ({ item }) => (
    <Item
        title={item.title}
        description={item.description}
        photo={item.photo} />
);

const Item = ({ title, description, photo }) => (
    <Card>
        <Card.Title>CARD WITH DIVIDER</Card.Title>
        <Card.Divider />
        {
            DATA.map((u, i) => {
                return (
                    <View key={i} style={styles.item}>
                        <Image
                            source={require('../images/logo.png')}
                            style={{ height: 50, width: 50, resizeMode: 'contain', }} />
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.title}>{description}</Text>
                        </View>
                    </View>
                );
            })
        }
    </Card>
);

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
        description: "1ST ITEM DESCRIPTION",
        photo: '../images/logo.png',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
        description: "2ND ITEM DESCRIPTION",
        photo: '../images/logo.png',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
        description: "3RD ITEM DESCRIPTION",
        photo: '../images/logo.png',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Fourth Item',
        description: "4TH ITEM DESCRIPTION",
        photo: '../images/logo.png',
    },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        fontSize: 18,
    },
    title: {
        alignSelf: 'center',
        padding: 5,
        marginLeft: 10,
        fontSize: 12,
    },
});

export default Notifications;