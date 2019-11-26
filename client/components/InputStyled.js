import * as React from "react";
import { StyleSheet, TextInput } from "react-native";

export const InputStyled = props => (
  <TextInput style={styles.input} placeholder={props.placeholder} />
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderRadius: 24,
    height: 55,
    width: "100%",
    margin: 15,
    textAlign: "center"
  }
});
