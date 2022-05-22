import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Button,Alert } from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { Item, Input, Textarea } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Authcontext } from "../context/authContext";

const AjoutPPlanAffaire = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date.toString());
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  const [date, setDate] = useState();
  const [titre, setTitre] = useState();
  const [description, setDescription] = useState();

  const auth = useContext(Authcontext);
  const id = props.navigation.getParam("id");
  console.log(description)
  const submit = async () => {
    let response = await fetch("http://192.168.1.185:5000/api/planAffaire/ajout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: date.toString(),
        description: description,
        IdProjet: id,
      }),
    });
    let responsedata = await response.json();
    if (!response.ok) {
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
      throw new Error(responsedata.message);
    }

    Alert.alert(
      "Message",
      "Votre demande est enregistrer.",
      [{ text: "fermer" }]
    );
  };

  return (
    <View>
      
      <Item regular>
        <Input
          placeholder="Date"
          value={date}
          style={{ marginTop: "5%" }}
        />
      </Item>
      <Button title="Choisir une date" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Textarea
        rowSpan={5}
        bordered
        placeholder="description"
        style={{ marginTop: "5%" }}
        value={description}
        onChangeText={(text) => {
          setDescription(text);
        }}
      />

      <Button
        title="Envoyer"
        color="#0086c3"
        onPress={() => {
          submit();
        }}
      />
    </View>
  );
};

AjoutPPlanAffaire.navigationOptions = (navData) => {
  return {
    headerTitle: "Ajout plan d'affaire"
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

export default AjoutPPlanAffaire;
