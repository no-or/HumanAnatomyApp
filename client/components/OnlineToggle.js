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
        //checkButton is called on the OnlineToggle to see if it should be on or off on render, based on the local storage.
          resolve(this.off.checkButton(this.props.region, this.props.type));
      }) 
      
      promise.then((data) => {

            if(data == true){
              let promise2 = new Promise((resolve, reject) => {
                // If the toggle is on, then it means offline use is enabled. To keep the subregion it represents up to date,
                // grabDate is called to see when it was updated last.
                  resolve(this.off.grabDate(this.props.region, this.props.type));
              }) 
              
              promise2.then((dIn) => {

                dInternal = new Date(dIn);

                let promise3 = new Promise((resolve, reject) => {
                  // Here we grab the external date (API endpoint date) of when it was updated last.
                    resolve(this.off._retrieveDate(this.props.region, this.props.type));
                }) 
                
                promise3.then((dEx) => {
                  dExternal = new Date(dEx);

                  // If the external date is more recent that the one stored, call popData to populate the local storage.
                  if(dExternal.getTime() > dInternal.getTime()){
                    this.off.popData(this.props.region, this.props.type);
                  }
                });
              });
            }

            //set the toggle to whatever the first promise grabbed.
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

  //onpress function changes the visuals of the toggle, calls UpdateButton to update the local storage of the buttons state,
  // and repopulates the subregion sotrage locally if its going to the on state.
  onPress1 = () => {
    temp = !this.state.switchOn1;
    this.setState({ switchOn1: temp });

    this.off.updateButton(temp, this.props.region, this.props.type);

    if(temp)
        this.off.popData(this.props.region, this.props.type);
  };

}