import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { Item, Input, Textarea } from "native-base";

const UpdateProduction = (props) => {
  const [type, setType] = useState();

  const [marchet, setMarchet] = useState();

  const id = props.navigation.getParam("id");


  const submit = async () => {
    let response = await fetch(
      `http://192.168.1.185:5000/api/production/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: type,
          marche: marchet,
        }),
      }
    );
    let responsedata = await response.json();
    if (!response.ok) {
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
      throw new Error(responsedata.message);
    }

    Alert.alert("Message", "Votre demande est enregistrer", [
      { text: "fermer" },
    ]);
  };

  return (
    <View>
      <Item regular>
        <Input
          placeholder="Type"
          style={{ marginTop: "10%" }}
          value={type}
          onChangeText={(text) => {
            setType(text);
          }}
        />
      </Item>

      <Item regular>
        <Input
          placeholder="Marchet"
          style={{ marginTop: "10%" }}
          value={marchet}
          onChangeText={(text) => {
            setMarchet(text);
          }}
        />
      </Item>

      <Button
        style={{ marginTop: 20 }}
        title="Envoyer"
        color="#0086c3"
        onPress={() => {
          submit();
        }}
      />
    </View>
  );
};

UpdateProduction.navigationOptions = (navData) => {
  return {
    headerTitle: "Update production",
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UpdateProduction;
