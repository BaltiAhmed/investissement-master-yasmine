import React, { useState } from "react";
import { Text, View } from "react-native";

const Success = (props) => {
  return (
    <View>
      {props.success && (
        <View style={{ width: "100%", backgroundColor: "#087f23" }}>
          <Text style={{ marginVertical: 8 }}>{props.success}</Text>
        </View>
      )}
    </View>
  );
};
export default Success;