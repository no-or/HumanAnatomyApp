import React, { Component } from "react";
import { ScrollView, View, SafeAreaView, Image, StyleSheet, TouchableOpacity, Text, Dimensions, Platform, Alert } from "react-native";
import colors from "../assets/colors";
import Flashcard from "../components/Flashcard";
import normalize from 'react-native-normalize';
import TabBarIcon from "../components/TabBarIcon";
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Modal from 'react-native-modal';
import ImageZoom from 'react-native-image-pan-zoom';

import offline from "../Offline";
import { cloneWithoutLoc } from "@babel/types";

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height

export default class FlashStack extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      // data: [{
      //   "id": "1",
      //   "answer": "data1"
      // }, {
      //   "id": "2",
      //   "answer": "data2"
      // }],
      right: 0,
      region: this.props.navigation.getParam("title", "brain"),
      offline: false,
      swiped: 0,
      isModalVisible:false
    };


    this.off = new offline;

    //These nested promises are meant to see if online or offline mode should be used.
      let promise = new Promise((resolve, reject) => {
          resolve(this.off._retrieveData('flashcard'));
      }) 
      
      //depending whether the offline button is toggled on or off, fetch from local or remote, respectively.
      promise.then((data) => {

        this.setState({offline: data[this.state.region]});

        if(this.state.offline){
          let promise2 = new Promise((resolve, reject) => {
            // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
              resolve(this.off.grabData(this.state.region, 'flashcard'));
          }) 
          
          promise2.then((data) => {
            // successMessage is whatever we passed in the resolve(...) function above.
            this.setState({data: data});
          });
        }else{
          //else if offline not available
          this.apiFetch();
        }

      });

  }


  componentDidMount(){
      //run this function if you want to connect to DB and not run demo JSON
      //this.apiFetch();
      //this.off.popData('Heart', 'flashcard');
      //this.setState({data: this.off.grabData('Heart', 'flashcard')});

  }

  //populates state.data with flashcards
  apiFetch(){
    return fetch('http://137.82.155.92:8090/flashcard?region=' + this.state.region)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({data: responseJson});
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
      Alert.alert("You are offline, or there was an issue with the server!");
    });
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam("title", "Flashcards"),
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

  handleSwipe(val) {
    this.setState({ right: this.state.right + val });
    this.setState({ swiped: this.state.swiped + 1});
  };

  openModal = () =>{
    this.setState({
    isModalVisible:true
    })
    }

  toggleModal = () =>{
    this.setState({
    isModalVisible:!this.state.isModalVisible
    })
    }

  closeModal = () =>{
    this.setState({
    isModalVisible:false
    })
    }


  render() {

    var stack = [];
    var totalSwiped = 0;
    var uris = [];

    console.log(this.state.data[this.state.total - this.state.swiped]);

    if(this.state.data != null){

    this.state.data.forEach(function (tmp) {
        stack.push(
          <Flashcard
          uri = {tmp.imageUrl}
          cardTitle="Respiratory System"
          answer={tmp.answer}
          key={totalSwiped}
          handleSwipe={this.handleSwipe.bind(this)}
          />
        );
        totalSwiped += 1;
        uris.push(tmp.imageUrl);
    }.bind(this));
  }else{
    Alert.alert("You are offline, but have no data saved for this section!");
  }

    return (
        //<TouchableOpacity onPress={alert("dsf")}> 
        <View style={{flex: 1, flexDirection: 'column', backgroundColor: totalSwiped == this.state.swiped ? colors.primary : "white"}}>
          

            <View style={styles.resultView}><View style={styles.scoreNumberContainer}>
              <View style={styles.scoreHeaderContainer}>
                <Text style={styles.finalScoreHeader}>FINAL SCORE</Text>
              </View>
                <Text style={styles.scoreNumber}>{"Correct: " + this.state.right}</Text>
                <Text style={styles.scoreNumber}>{"Swiped: " + totalSwiped}</Text>
                <Text style={styles.scoreNumber}>{"Percentage: " + Math.round(this.state.right/totalSwiped*100) + "%"}</Text>
              </View>
            </View>

            <TouchableOpacity onPress={()=>this.openModal()}>
              <Text style={{textAlign:'center', fontSize: deviceWidth*.1, color: colors.primary, fontWeight: "900"}}>ZOOM</Text>
            </TouchableOpacity>

            <View
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
            >

                {stack}

            </View>

            <View style={{position:'relative', alignItems:'center', paddingBottom: normalize(10)}}>
              <Text style={{fontWeight:'bold'}}>What is the highlighted region?</Text>
            </View>

            <View style={{position:'relative', alignItems:'center', paddingBottom: normalize(10)}}>
             <ProgressBarAnimated
                width={deviceWidth*0.8}
                value={Math.round(this.state.swiped/totalSwiped*100)}
                backgroundColorOnComplete="#6CC644"
              />
            </View>

            <Modal animationIn="slideInUp" animationOut="slideOutDown" onBackdropPress={()=>this.closeModal()} onSwipeComplete={()=>this.closeModal()} swipeDirection="right" isVisible={this.state.isModalVisible} style={{backgroundColor:'white', top: 20, maxHeight:Dimensions.get('window').height / 2}}>
              <View style={{ flex: 1,justifyContent:'center', overflow:"hidden"}}>
              <ImageZoom 
                cropWidth={Dimensions.get('window').width}
                cropHeight={styles.image.height}
                imageWidth={Dimensions.get('window').width}
                imageHeight={styles.image.height}
              >
                <Image
                  style={styles.image}
                  source={{uri: uris[totalSwiped - this.state.swiped - 1]}}
                />
              </ImageZoom>
              </View>
              <View style={{ flex: 1,justifyContent:'center',position:'absolute',bottom:0}}>
              <View style={{flexDirection:'row',}}>
                <TouchableOpacity style={{backgroundColor:'red',width:"100%"}} onPress={()=>this.closeModal()}>
                  <Text style={{color:'white',textAlign:'center',padding:10}}>Cancel</Text>
                </TouchableOpacity>
              </View>
              </View>
            </Modal>

        </View>
        //</TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: deviceHeight*0.02,
    alignItems: "center",
    flexDirection: 'column',
  },
  resultView: {
    marginTop: deviceHeight*0.1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: deviceWidth,
    height: deviceWidth * 1.04,
  },
  finalScoreHeader: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white"
  },
  scoreHeaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  scoreStyle: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    // flex: 1,
    // width: "100%",
    height: "100%",
    backgroundColor: colors.primary
  },
  scoreNumberContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
  },
  scoreNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primaryText
  },
  image: {
    width: "100%",
    height: 350,
    resizeMode: "contain",
},
});
