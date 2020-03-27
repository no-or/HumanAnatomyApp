import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  ScrollView,
  Platform
} from 'react-native';
import colors from '../assets/colors';
import TabBarIcon from "../components/TabBarIcon";
import {HOST_NAME} from "../constants/Constants"
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

import offline from "../Offline";

function Item({ content }) {

    return (
        <View style={styles.optionContainer}>
            <View style={styles.imageContainer}>
              {/* <ReactNativeZoomableView
                  maxZoom={2.5}
                  minZoom={1.0}
                  zoomStep={0.1}
                  initialZoom={1.0}
                  style={styles.zoomableView}
                >
                <Image
                  style={styles.image}
                  source={{uri: content.imageUrl}}
                />
              </ReactNativeZoomableView> */}
              <ScrollView minimumZoomScale={1} maximumZoomScale={5} scrollEnabled={true}>
                <Image
                  style={styles.image}
                  source={{uri: content.imageUrl}}
                />
              </ScrollView>
            </View>
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

      let promise = new Promise((resolve, reject) => {
        resolve(this.off._retrieveData('explore'));
      })

      promise.then((data) => {

        this.setState({offline: data[this.state.region]});

        if(this.state.offline){
          let promise2 = new Promise((resolve, reject) => {
              resolve(this.off.grabData(this.state.region, 'explore'));
          })

          promise2.then((data) => {
            this.setState({menu: data});
          });
        }else{
          this.apiFetch();
        }

      });
    }

    apiFetch() {
      const {navigation} = this.props; 
      var host = HOST_NAME
      return fetch(host+'/explore?region=' + navigation.state.params.title)
      .then((response) => 
      response.status == 404 ? "" : response.json()
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
            <ScrollView>
              <FlatList
                  data={this.state.menu}
                  renderItem={({ item }) => <Item content={item}/>}
                  keyExtractor={item => item._id}
              >
              </FlatList>
            </ScrollView>
          </SafeAreaView>
      );
    }
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 350,
        resizeMode: "contain",
    },
    // zoomableView: {
    //   alignContent: "center",
    //   alignItems: 'center',
    // },
    imageContainer: {
      flex: 3,
      overflow: "hidden",
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 10,
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
