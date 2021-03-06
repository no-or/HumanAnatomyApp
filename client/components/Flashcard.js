import React, { Component } from "react";
import { Image, StyleSheet, TouchableOpacity, Text, Dimensions, Platform, Animated, PanResponder, View} from "react-native";
import normalize from 'react-native-normalize';
import Modal from 'react-native-modal';
import colors from "../assets/colors";

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height

export default class Flashcard extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          showDraggable: true,
          dropAreaValues: null,
          pan: new Animated.ValueXY(),
          opacity: new Animated.Value(1),
          flipDegrees: new Animated.Value(0),
          isFlipped: false,
          bgcolor: new Animated.Value(0.5),//'white',
          movement: false,
          isModalVisible:false
        };
          
      this._val = { x:0, y:0 }
      this.state.pan.addListener((value) => this._val = value);
  
      // The majority of the panResponder stuff done here is standard. Look up documentation for it.
      this.panResponder = PanResponder.create({
          onMoveShouldSetPanResponder : (e, gesture) => {
          const {dx, dy} = gesture;

          return  true;
      },
          onPanResponderGrant: (e, gesture) => {
            this.state.pan.setOffset({
              x: this._val.x,
              y: this._val.y
            })

          },
          onPanResponderMove: (evt, gesture) => {
            if((Math.abs(gesture.dx) + Math.abs(gesture.dy) > normalize(10)) || this.state.movement){

              this.state.pan.x.setValue(gesture.dx);
              this.state.pan.y.setValue(gesture.dy);
              this.state.movement = true;

              this.changeColor(gesture);
            }
          },
          onPanResponderRelease: (e, gesture) => {
            if (this.isDropArea(gesture)) {
              Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 500
              }).start(() =>
                this.setState({
                  showDraggable: false
                })
              );
            }else if(Math.abs(gesture.dx) + Math.abs(gesture.dy) < normalize(10)){
                //normalize(10) is the tolerance for clicks, seems like about the right number
                //checks if the card has been flipped or not. If it has, change the direction of the animation of the flip
                if(!this.state.isFlipped){
                  Animated.timing(this.state.flipDegrees, {
                    toValue: 180,
                    duration: 500
                  }).start(() =>
                  this.setState({
                    isFlipped: true
                  }));
                }else{
                  Animated.timing(this.state.flipDegrees, {
                    toValue: 0,
                    duration: 500
                  }).start(() =>
                  this.setState({
                    isFlipped: false
                  }));
                }
            } else{
                  //else, if the card was dragged not clicked, and wasn't dragged into the target zone, spring it back into it's original place 
                  Animated.spring(this.state.pan, {
                      toValue: { x: 0, y: 0 },
                      friction: 6
                    }).start();
                    this.setState({movement: false});
              }
              this.state.bgcolor.setValue(0.5);
          }
        });
      }

//render the card within the view
  render() {
    return (
        <View style={{ width: "25%", alignItems: "center" }}>
        {this.renderDraggable()}
        </View>
    );
  }

  //Is the area where the top card is dragged far enough to remove the card from the deck?
  isDropArea(gesture) {
    if(gesture.moveX < deviceWidth*.1)
      this.props.handleSwipe(0);
    else if(gesture.moveX > deviceWidth*.9)
      this.props.handleSwipe(1);
    return gesture.moveX < deviceWidth*.1 || gesture.moveX > deviceWidth*.9;
  }

  //Change the colour of the card proportionally with the amount dragged. Theres a bug that the touch is relative to the center,
  //which gives the full colour if you start the drag on the edge. Didn't have time to fix, look into event.Location in panResponder.
  changeColor(gesture){
    if(gesture.moveX > deviceWidth*0.5){
      this.state.bgcolor.setValue(0.5 + (0.5 - (deviceWidth*0.85 - gesture.moveX)/(deviceWidth*0.85 - deviceWidth*0.5)/2));
    }else if(gesture.moveX < deviceWidth*0.5){
      this.state.bgcolor.setValue(0.5 - (deviceWidth*0.5 - gesture.moveX)/(deviceWidth*0.5 - deviceWidth*0.15)/2);
    }
  }

  //render the card here
  renderDraggable() {
    const cardStyle = function(color) {
     return {
      backgroundColor: color.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['red', 'white', 'green']
    }),
      width: RADIUS,
      height: RADIUS * 1.3,
      borderRadius: RADIUS * 0.1,
      borderWidth: 2
     }
   }
   //the style for the panResponder animated View of the card
      const panStyle = {
        transform: [
            {translateX: this.state.pan.x},
            {translateY: this.state.pan.y},
            {rotateY: this.state.flipDegrees.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg']  // 0 : 150, 0.5 : 75, 1 : 0
              })},
        ],
        justifyContent: 'center',
        alignItems: 'center'
      }
      //If the card is not flipped, render this
      if (this.state.showDraggable && !this.state.isFlipped) {
        return (
            <View style={{ position: "absolute" }}>
            <Animated.View
              {...this.panResponder.panHandlers}
              style={[panStyle, cardStyle(this.state.bgcolor), {opacity:this.state.opacity}]}
            >
                <Image 
                source={{uri: this.props.uri}}
                style={styles.cardImage}>
                </Image>

            </Animated.View>

          </View>

        );//If the card is flipped, render this instead. PanStyle creates the flip animation. Not perfect, but whatever. It's Capstone.
      }else if (this.state.showDraggable && this.state.isFlipped) {
        return (
          
            <View style={{ position: "absolute" }}>
            <Animated.View
              {...this.panResponder.panHandlers}
              style={[panStyle, cardStyle(this.state.bgcolor), {opacity:this.state.opacity}]}
            >
                <Text 
                style={styles.cardText}>
                  {this.props.answer}
                </Text>
            </Animated.View>
          </View>
        );
      }
    }
}

let RADIUS = deviceWidth*.8;

const styles = StyleSheet.create({
  cardImage: {
    width: "90%",
    height: deviceWidth*0.65,
    resizeMode: "contain",
    borderWidth: 2
  },
  cardText: {
    padding: 10,
    fontSize: 16,
    backgroundColor: "#002145",
    color: "white",
    fontFamily: Platform.OS === "ios" ? "Helvetica" : "Roboto",
    transform: [
      {rotateY: '180deg'},
  ],
  },
  image: {
    width: "100%",
    height: 350,
    resizeMode: "contain",
},

});
