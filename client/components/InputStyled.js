import * as React from "react";
import { StyleSheet, TextInput, Platform } from "react-native";

export const InputStyled = props => (
  <TextInput
    style={styles.input}
    autoCapitalize="words"
    autoCorrect={true}
    placeholder={props.placeholder}
  />
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderRadius: 24,
    height: 55,
    width: "100%",
    margin: 15,
    textAlign: "center",
    color: "#051d63",
    fontWeight: "500",
    fontFamily: Platform.OS === "ios" ? "Helvetica" : "Roboto",
    fontSize: 15
  }
});
