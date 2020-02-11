import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View,
  Linking
} from "react-native";

export default class VideoCard extends Component {

  loadInBrowser = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };
  
  render() {
    return (
      <TouchableOpacity style={styles.card} onPress={this.loadInBrowser.bind(this, this.props.url)}>
        <Image style={styles.cardImage} source={{ uri: this.props.uri }}/>
        <View style={styles.cardText}>
            <Text style={styles.cardDescription}>{this.props.cardTitle}</Text>
            <Text style={styles.cardDescription}>{this.props.cardViews}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    flexDirection: "row",
    shadowColor: "#000",
    margin: 10,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  cardImage: {
    width: "40%",
    height: 100,
    resizeMode: "cover",
    borderWidth: 1,
    borderRadius: 10
  },
  cardText: {
    width: "60%",
    padding: 10,
    paddingLeft: 20,
    justifyContent: "space-between", 
  },
  cardDescription: {
    color: "#002145",
    fontSize: 16,
    fontFamily: Platform.OS === "ios" ? "Helvetica" : "Roboto",
  }
});
