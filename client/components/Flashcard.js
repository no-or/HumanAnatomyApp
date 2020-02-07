import React, { Component } from "react";
import { Image, StyleSheet, Text, Dimensions, Platform, Animated, PanResponder, View} from "react-native";
import normalize from 'react-native-normalize';

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
          movement: false
        };
          
      this._val = { x:0, y:0 }
      this.state.pan.addListener((value) => this._val = value);
  
      this.panResponder = PanResponder.create({
          onMoveShouldSetPanResponder : (e, gesture) => {
          const {dx, dy} = gesture;
          //if(Math.abs(gesture.dx) + Math.abs(gesture.dy) < normalize(50))
            //  return false;
          return  true ;//Math.abs(dy) > normalize(25);
      },
          onPanResponderGrant: (e, gesture) => {
            this.state.pan.setOffset({
              x: this._val.x,
              y: this._val.y
            })
            //this.state.pan.setValue({ x:0, y:0})
            //this.changeColour(gesture, 0);
          },
          onPanResponderMove: (evt, gesture) => {
            if((Math.abs(gesture.dx) + Math.abs(gesture.dy) > normalize(10)) || this.state.movement){
              //this.changeColour(gesture, 1);
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

                  //this.setState({isFlipped: true});
                }else{
                  Animated.timing(this.state.flipDegrees, {
                    toValue: 0,
                    duration: 500
                  }).start(() =>
                  this.setState({
                    isFlipped: false
                  }));

                  //his.setState({isFlipped: false});
                }
            } else{
                  //else, if the card wasn't dragged into the target zone, spring it back into it's original place 
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

  //is the area where the top card is dragged far enough to remove the card from the deck?
  isDropArea(gesture) {
    if(gesture.moveX < deviceWidth*.1)
      this.props.handleSwipe(0);
    else if(gesture.moveX > deviceWidth*.9)
      this.props.handleSwipe(1);
    return gesture.moveX < deviceWidth*.1 || gesture.moveX > deviceWidth*.9;
  }

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
      //backgroundColor: color,
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

      if (this.state.showDraggable && !this.state.isFlipped) {
        return (
          
            <View style={{ position: "absolute" }}>
            <Animated.View
              {...this.panResponder.panHandlers}
              style={[panStyle, cardStyle(this.state.bgcolor), {opacity:this.state.opacity}]}
            >
                <Image 
                source={{uri: 'http://www.aljanh.net/data/archive/img/3085128125.jpeg'}}
                style={styles.cardImage}>
                </Image>
            </Animated.View>
          </View>
        );
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
    width: deviceWidth*0.65,
    height: deviceWidth*0.65,
    resizeMode: "cover",
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
  }
});