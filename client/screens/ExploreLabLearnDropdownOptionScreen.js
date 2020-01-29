import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  Text, 
  FlatList,
  ScrollView
} from 'react-native';
import colors from '../assets/colors';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Lungs',
      url: 'https://static2.bigstockphoto.com/8/5/1/large1500/158296634.jpg',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Hand',
      url: 'https://c1.wallpaperflare.com/preview/661/540/52/skeleton-hand-bones-anatomy.jpg',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Heart',
      url: 'http://www.aljanh.net/data/archive/img/3085128125.jpeg',
    },
];

function Item({ title, url, hide }) {
    return (
        <View style={styles.optionContainer}>
            <ScrollView minimumZoomScale={1} maximumZoomScale={5}>
                <Image
                    style={styles.image}
                    source={{uri: url}}
                />
            </ScrollView>
            <Text>{title}</Text>
        </View>
    );
}

export default class ExploreLabLearnDropdownOptionScreen extends Component {

  static navigationOptions = ({navigation, screenProps}) => ({
    title: navigation.state.params.title,
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.primaryText,
    headerTitleStyle: {
        fontWeight: 'bold',
    },
  });

  render() {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item url={item.url} title={item.title}/>}
                keyExtractor={item => item.id}
            >
            </FlatList>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 350,
        resizeMode: "cover",
        borderWidth: 2,
        marginBottom: 10
    },
    container: {
        justifyContent: "center",
        alignContent: "center",
        paddingHorizontal: 10
    },
    optionContainer: {
        marginBottom: 20,
        paddingTop: 14
    }
  });