import React, { useState } from "react";
import { Text, View } from "react-native";

const Error = (props) => {
  return (
    <View>
      {props.error && (
        <View style={{ width: "100%", backgroundColor: "#ab000d" }}>
          <Text style={{ marginVertical: 8 }}>{props.error}</Text>
        </View>
      )}
    </View>
  );
};
export default Error;
