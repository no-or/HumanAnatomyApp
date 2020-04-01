import React, { Component } from "react";
import { ScrollView, View, SafeAreaView, StyleSheet, Platform } from "react-native";
import * as FileSystem from 'expo-file-system';

import colors from "../assets/colors";
import Card from "../components/Card";
import OnlineToggle from "../components/OnlineToggle";
import offline from "../Offline.js";
import TabBarIcon from "../components/TabBarIcon"
import {HOST_NAME} from "../constants/Constants"
import Accordion from '../components/Accordion'

export default class FlashcardsScreen extends Component {

  constructor(props) {
    super(props);

    this.state= {
      menu: null,
    }

    this.off =  new offline;

        //These nested promises are meant to see if online or offline mode should be used.
      let promise = new Promise((resolve, reject) => {
          resolve(this.off.FetchHierarchy());
      }) 
      
      //depending whether the offline button is toggled on or off, fetch from local or remote, respectively.
      promise.then((data) => {
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
      var host = HOST_NAME
  
      fetch(host+'/hierarchy')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({menu: responseJson[0]});
        // alert(JSON.stringify(this.state.menu))
        // alert(JSON.stringify(responseJson[0].regions));
      })
      .catch((error) => {
        console.error(error);
      });
    }

  static navigationOptions = ({navigation}) => ({
    title: "Flashcards",
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
    //return (
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
                    path = "FlashStack"
                    navigation = {this.props.navigation}
                    type = "flashcard"
                />
            );
      })
    }
    return (
      <ScrollView>
      {items}
      </ScrollView>
    );
      // <SafeAreaView style={styles.wrapper}>
      //   <View style={styles.content}>
      //     <ScrollView
      //       style={styles.container}
      //       contentContainerStyle={styles.contentContainer}
      //     >
      //       <Card
      //         uri={FileSystem.documentDirectory + 'kittycat.jpg'}
      //         cardTitle="Heart"
      //         callback={() => this.props.navigation.navigate("FlashStack", {region: "Larynx"})}
      //       ></Card><OnlineToggle region="Larynx"></OnlineToggle>
      //       <Card
      //         uri="https://www.simtics.com/media/28745/mlla.jpg"
      //         cardTitle="Trunk"
      //         callback={() => this.props.navigation.navigate("FlashStack", {region: "Trunk"})}
      //       /><OnlineToggle region="Trunk"></OnlineToggle>
      //       <Card
      //         uri="http://www.interactive-biology.com/wp-content/uploads/2012/10/Hand-and-arm-bone-1280x640.jpg"
      //         cardTitle="Upper Limb"
      //         callback={() => this.props.navigation.navigate("FlashStack", {region: "Upper Limb"})}
      //       /><OnlineToggle region="UpperLimbs"></OnlineToggle>
      //       <Card
      //         uri="https://st.depositphotos.com/2363887/2564/i/950/depositphotos_25640047-stock-photo-man-anatomy-thorax-cutaway-with.jpg"
      //         cardTitle="Lower Limb"
      //         callback={() => this.props.navigation.navigate("FlashStack", {region: "Lower Limb"})}
      //       /><OnlineToggle region="LowerLimbs"></OnlineToggle>
      //     </ScrollView>
      //   </View>
      // </SafeAreaView>
    //);
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
