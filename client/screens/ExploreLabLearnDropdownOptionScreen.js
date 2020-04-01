import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  View,
  Text,
  FlatList,
  ScrollView,
  Platform
} from 'react-native';
import colors from '../assets/colors';
import TabBarIcon from "../components/TabBarIcon";
import {HOST_NAME} from "../constants/Constants"
import ImageZoom from 'react-native-image-pan-zoom';

import offline from "../Offline";

function Item({ content }) {

    return (
        <View style={styles.optionContainer}>
          <View style={styles.imageContainer}>
            <ScrollView minimumZoomScale={1} maximumZoomScale={4}>
            {Platform.OS === "ios" ? (
              <Image
                style={styles.image}
                source={{uri: content.imageUrl}}
              />
            ) : (
              <ImageZoom 
                cropWidth={Dimensions.get('window').width}
                cropHeight={styles.image.height}
                imageWidth={Dimensions.get('window').width}
                imageHeight={styles.image.height}
              >
                <Image
                  style={styles.image}
                  source={{uri: content.imageUrl}}
                />
              </ImageZoom>
            )}
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
        firstTime: true,
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
            <FlatList
                data={this.state.menu}
                renderItem={({ item }) => <Item content={item}/>}
                keyExtractor={item => item._id}
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
        resizeMode: "contain",
    },
    imageContainer: {
      flex: 3,
      overflow: "hidden",
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 10,
      width: "95%",
    },
    container: {
        justifyContent: "center",
        alignContent: "center",
    },
    optionContainer: {
        margin: 10,
        marginBottom: 20,
        alignContent: "center",
        alignItems: 'center',
        justifyContent: "center",
    },
    text: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold"
    }
  });
