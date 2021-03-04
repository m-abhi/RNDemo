import * as React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const bgColor = [
    'black',
    'red',
    'orange',
    'green',
    'blue',
]

class Notifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        this.getMoviesFromApi()
    }

    getMoviesFromApi = async () => {
        try {
            const response = await fetch('https://reactnative.dev/movies.json');
            const json = await response.json();
            this.setState({
                data: json.movies
            });
        } catch (error) {
            console.error(error);
            alert(error)
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={renderItem}
                />
            </View>
        );
    }
}

const renderItem = ({ item }) => (
    <Item
        title={item.title}
        description={item.releaseYear}
        randomColor={_getRandomColor()} />
);

const _getRandomColor = () => {
    var item = bgColor[Math.floor(Math.random() * bgColor.length)];
    return item
}

const Item = ({ title, description, randomColor }) => (
    <TouchableOpacity style={styles.cardStyle} onPress={() => {
        // alert('You clicked: ' + title)
    }}>
        <View style={{ width: 3, height: '100%', backgroundColor: randomColor }} />
        <View style={styles.item}>
            <View style={{ flexDirection: 'column', flex: 1.5 }}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>Release Year: <Text style={{ fontWeight: 'bold' }}>{description}</Text></Text>
            </View>
            <View style={{ width: 40, height: 40, backgroundColor: randomColor, marginRight: 20, borderRadius: 2 }} />
            {/* <Image
                source={require('../images/logo.png')}
                style={{ height: 40, width: 40, resizeMode: 'contain', flex: 1 }} /> */}
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dcdcdc',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    cardStyle: {
        flexDirection: 'row',
        overflow: 'hidden',
        height: 70,
        margin: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    item: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    title: {
        fontWeight: 'bold',
        padding: 5,
        marginLeft: 10,
        fontSize: 13,
    },
    description: {
        // alignSelf: 'center',
        padding: 5,
        marginLeft: 10,
        fontSize: 12,
    },
});

export default Notifications;