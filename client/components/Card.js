import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View
} from "react-native";

export default class Card extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.card} onPress={this.props.callback}>
        <Image style={styles.cardImage} source={{ uri: this.props.uri }} />
        <View style={styles.overlayTint}></View>
        <TouchableOpacity style={styles.textContainer} onPress={this.props.callback}>
          <View style={styles.textView}>
            <Text style={styles.textStyle}>{this.props.cardTitle}</Text>
          </View> 
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    margin: 10,
    // marginLeft: "2%",
    // width: "96%",
    shadowColor: "#000",
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
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderRadius: 10,
    borderWidth: 0
  },
  overlayTint: {
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 10,
    backgroundColor: "#000",
    height: 200,
    width: "100%",
    opacity: 0.3
  },
  textContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: 20,
    flex: 1,
    width: "100%",
    height: "100%",
  },
  textStyle: {
    // backgroundColor: "#FFF",
    // opacity: 0.8,
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 10,
    borderWidth: 0,
    borderRadius: 10,
    // elevation: 1
  },
  textView: {
    backgroundColor: "#FFF",
    opacity: 0.8,
    borderWidth: 1,
    borderRadius: 10,
    elevation: 1
  }
});
