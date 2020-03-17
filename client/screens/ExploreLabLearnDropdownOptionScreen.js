import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  Text, 
  FlatList,
  SectionList,
  ScrollView,
  Platform
} from 'react-native';
import colors from '../assets/colors';
import TabBarIcon from "../components/TabBarIcon";
import {HOST_NAME} from "../constants/Constants"

import offline from "../Offline";

function Item({ content }) {

    return (
        <View style={styles.optionContainer}>
            <ScrollView minimumZoomScale={1} maximumZoomScale={5}>
                <Image
                    style={styles.image}
                    source={{uri: content.imageUrl}}
                />
            </ScrollView>
            <Text style={styles.text}>{content.title}</Text>
        </View>
    );
}

export default class ExploreLabLearnDropdownOptionScreen extends Component {

    constructor(props) {
      super(props);
      this.state = {
        menu: [
        ],
        offline: false,
        region: this.props.navigation.getParam("title", ""),
      }

      this.off = new offline;

      //These nested promises are meant to see if online or offline mode should be used.
      let promise = new Promise((resolve, reject) => {
        resolve(this.off._retrieveData('explore'));
      })

      //depending whether the offline button is toggled on or off, fetch from local or remote, respectively.
      promise.then((data) => {

        this.setState({offline: data[this.state.region]});

        if(this.state.offline){
          let promise2 = new Promise((resolve, reject) => {
            // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
              resolve(this.off.grabData(this.state.region, 'explore'));
          })

          promise2.then((data) => {
            // successMessage is whatever we passed in the resolve(...) function above.
            console.log("offline data");
            this.setState({menu: data});
          });
        }else{
          //else if offline not available
          console.log("online data");
          this.apiFetch();
        }

      });
    }

    componentDidMount() {
      // this.apiFetch();
    }

    apiFetch() {
      const {navigation} = this.props; 
      var host = HOST_NAME
      return fetch(host+'/explore?region=' + navigation.state.params.title)
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
            "imageUrl": "https://membershipdrive.com/wp-content/uploads/2014/06/placeholder.png",
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

    static navigationOptions = ({navigation}) => ({
      title: navigation.state.params.title,
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.primaryText,
      headerTitleStyle: {
          fontWeight: 'bold',
      },
      headerRight: (
        <TabBarIcon
          style={{marginRight: 15}}
          name={Platform.OS === "ios" ? "ios-information-circle" : "ios-information-circle"}
          onPress={() => navigation.navigate('AboutUs')}
        />
      ),
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
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10
    },
    container: {
        justifyContent: "center",
        alignContent: "center",
    },
    optionContainer: {
        margin: 10,
        marginBottom: 20,
    },
    text: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold"
    }
  });
