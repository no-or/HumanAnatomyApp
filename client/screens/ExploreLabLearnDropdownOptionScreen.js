import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  Text, 
  FlatList,
  SectionList,
  ScrollView
} from 'react-native';
import colors from '../assets/colors';

function Item({ content }) {

    return (
        <View style={styles.optionContainer}>
            <ScrollView minimumZoomScale={1} maximumZoomScale={5}>
                <Image
                    style={styles.image}
                    source={{uri: content.image}}
                />
            </ScrollView>
            <Text>{content.title}</Text>
        </View>
    );
}

export default class ExploreLabLearnDropdownOptionScreen extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
        menu: [
            // {
            //   title: "Section",
            //   data: [
            //   {
            //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            //     title: 'Lungs',
            //     image: 'https://static2.bigstockphoto.com/8/5/1/large1500/158296634.jpg',},
            //   {
            //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            //     title: 'Hand',
            //     image: 'https://c1.wallpaperflare.com/preview/661/540/52/skeleton-hand-bones-anatomy.jpg',
            //   }
            //   ],
            // },
            // {
            //   title: "Section2",
            //   data: [
            //   {
            //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            //     title: 'Lungs',
            //     image: 'https://static2.bigstockphoto.com/8/5/1/large1500/158296634.jpg',},
            //   {
            //     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            //     title: 'Hand',
            //     image: 'https://c1.wallpaperflare.com/preview/661/540/52/skeleton-hand-bones-anatomy.jpg',}
            //   ]
            // },
        ]
      }
    }

    componentDidMount() {
      this.apiFetch();
    }

    apiFetch() {
      const {navigation} = this.props; 
      var host = '192.168.0.102'
      return fetch('http://'+host+':8080/explore?region=' + navigation.state.params.title)
      .then((response) => 
      response.status == 404 ? "" : response.json()
      // alert(JSON.stringify(response))
      )
      .then((responseJson) => {
        if(responseJson != "") {
          this.setState({menu: responseJson});
        } else {
          this.setState({menu: [{
            "_id": toString(navigation.state.params.title),
            "image": "https://membershipdrive.com/wp-content/uploads/2014/06/placeholder.png",
            "region": "N/A",
            "title": "Content in Progress"
          }]})
        }
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
    }

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
                  data={this.state.menu}
                  renderItem={({ item }) => <Item content={item}/>}
                  keyExtractor={item => item._id}
              >
              </FlatList>
          </SafeAreaView>
          // <SafeAreaView style={styles.container}>
          //      {/* <FlatList
          //         data={this.state.data}
          //         renderItem={({ item }) => <Item url={item.image} title={item.title}/>}
          //         keyExtractor={item => item._id}
          //     >
          //     </FlatList> */}
          //     <SectionList
          //       sections={this.state.menu}
          //       keyExtractor={(item, index) => item + index}
          //       renderItem={({ item }) => <Item url={item.image} title={item.title}/>}
          //       renderSectionHeader={({ section: { title } }) => (
          //         <Text style={styles.header}>{title}</Text>
          //       )}
          //     />
          // </SafeAreaView>
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
