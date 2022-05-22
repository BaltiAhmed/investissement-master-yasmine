import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Button,Alert } from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { Item, Input, Textarea } from "native-base";


const AjoutEquipement = (props) => {
  const[nom,setNom]=useState()
  const[type,setType]=useState()
  const[prix,setPrix]=useState()
  const[quantite,setQuantite]=useState()

  const EId = props.navigation.getParam('id')

  console.log(EId+" Ajout equipement")

  const submit = async () => {
    let response = await fetch("http://192.168.137.1:5000/api/equipement/ajout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom:nom,
        type:type,
        prix:prix,
        quantite:quantite,
        idProjet:EId
        
      }),
    });
    let responsedata = await response.json();
    if (!response.ok) {
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
      throw new Error(responsedata.message);
    }

    Alert.alert(
      "Message",
      "Votre demande est enregistrer",
      [{ text: "fermer" }]
    );
  };

 

  return (
    <View>
      <Item regular>
        <Input
          placeholder="Nom"
          style={{ marginTop: "10%" }}
          value={nom}
          onChangeText={(text) => {
            setNom(text);
          }}
        />
      </Item>

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
          placeholder="Prix"
          keyboardType="numeric"
          style={{ marginTop: "10%" }}
          value={prix}
          onChangeText={(text) => {
            setPrix(text);
          }}
        />
      </Item>

      <Item regular>
        <Input
          placeholder="Qunatitée"
          keyboardType="numeric"
          style={{ marginTop: "10%" }}
          value={quantite}
          onChangeText={(text) => {
            setQuantite(text);
          }}
        />
      </Item>
      
      

      <Button
      style={{marginTop:20}}
        title="Envoyer"
        color="#0086c3"
        onPress={() => {
          submit();
        }}
      />
    </View>
  );
};

AjoutEquipement.navigationOptions = (navData) => {
  return {
    headerTitle: "Ajout équipement"
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

export default AjoutEquipement;
