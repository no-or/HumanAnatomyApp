import React, { Component } from "react";
import { ScrollView, View, SafeAreaView, StyleSheet, Text} from "react-native";

import SwitchToggle from "react-native-switch-toggle";

import offline from "../Offline";



export default class OnlineToggle extends Component {

  constructor(props) {
    super(props);

    this.state = {
        switchOn1: false,
      };

      this.off = new offline;
    
      let promise = new Promise((resolve, reject) => {
        // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
          resolve(this.off.checkButton(this.props.region, this.props.type));
      }) 
      
      promise.then((data) => {
        // successMessage is whatever we passed in the resolve(...) function above.
///
///
///
        //if data == true
          //promise fetch external date(
            //fetch internal date(
              //compare internal and external, if false call popData();
            //))
            ///
            //
            ///

        console.log("toggle class: " + data);
        this.setState({switchOn1: data});
    });
  }

  render() {
        return (
            <View style = {{flexDirection: "row", alignItems: "center"}}>
                <Text style={{fontSize: 12, padding: 10}}>Downloaded </Text>
                <SwitchToggle
                    backgroundColorOn="#00A7E1"
                    backgroundColorOff="#e5e1e0"
                    switchOn={this.state.switchOn1}
                    onPress={this.onPress1}
                    circleColorOff="grey"
                    circleColorOn="#002145"
                    duration={500}
                />
            </View>
        );
  }

  onPress1 = () => {
    temp = !this.state.switchOn1;
    this.setState({ switchOn1: temp });

    console.log(this.props.region);
    this.off.updateButton(temp, this.props.region, this.props.type);

    if(temp)
        this.off.popData(this.props.region, this.props.type);
  };

}