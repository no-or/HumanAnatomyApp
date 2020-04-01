import React, { Component } from "react";
import { ScrollView, StyleSheet, SafeAreaView, View, Platform } from "react-native";
import Card from "../components/Card";
import colors from "../assets/colors";
import TabBarIcon from "../components/TabBarIcon";
import {HOST_NAME} from "../constants/Constants";
import Accordion from '../components/Accordion';
import offline from "../Offline.js";

export default class Quizzes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menu: null,
    }

    this.off =  new offline;

        //These nested promises are meant to see if online or offline mode should be used.
      let promise = new Promise((resolve, reject) => {
          resolve(this.off.FetchHierarchy());
      }) 
      
      //depending whether the offline button is toggled on or off, fetch from local or remote, respectively.
      promise.then((data) => {

        console.log(data);
        this.setState({menu: data});

      })
      .catch((error)=> {
        console.error(error);
      });

  };

  componentDidMount() {
    //this.apiFetch();
  }
  
  apiFetch() {
    var host = HOST_NAME;

    // fetch entire region hierarchy from server
    fetch(host+'/hierarchy')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({menu: responseJson[0]});
    })
    .catch((error) => {
      console.log(error);
      console.error(error);
    });
  }

  // Set name and add info button for topbar
  static navigationOptions = ({navigation}) => ({
    title: "Quizzes",
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerTintColor: colors.primaryText,
    headerTitleStyle: {
      fontWeight: "bold"
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
    const items = [];
    if (this.state.menu) {
      this.state.menu.regions.map((item) => {
        items.push(
          <Accordion
              title = {item.region}
              data = {item.subRegions}
              key = {item.region}
              id = {item.region}
              image = {item.imageUrl}
              path = "Quiz"
              navigation = {this.props.navigation}
              type = "quiz"
          />
        );
      })
    }
    return (
      <ScrollView>
        {items}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  wrapper: {
    flex: 1
  },
  content: {
    height: "100%",
    width: "100%"
  }
});
