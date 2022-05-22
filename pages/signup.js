import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  Alert,
} from "react-native";
import Card from "../components/card";

const Signup = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [nom, setNom] = useState();
  const [prenom, setPrenom] = useState();
  const [adresse, setAdresse] = useState();
  const [tel, setTel] = useState();
  const [cin, setCin] = useState();
  const [qualification, setQualification] = useState();

  const submit = async () => {
    console.log("sigup promoteur")
    let response = await fetch(
      "http://192.168.1.185:5000/api/utilisateur/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          nom: nom,
          prenom: prenom,
          adresse: adresse,
          telephone: tel,
          cin: cin,
          qualification: qualification,
        }),
      }
    );
    let responsedata = await response.json();
    if (!response.ok) {
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
      throw new Error(responsedata.message);
    }
    Alert.alert("Message", "Votre compte est bien crée", [{ text: "fermer" }]);
  };

  return (
    <Card style={styles.authContainer}>
      <ScrollView>
        <View style={styles.formControl}>
          <Text style={styles.label}>Nom</Text>
          <TextInput
            style={styles.input}
            value={nom}
            onChangeText={(text) => {
              setNom(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="nom"
            placeholderTextColor="dark"
            label="E-mail"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Prenom</Text>
          <TextInput
            style={styles.input}
            value={prenom}
            onChangeText={(text) => {
              setPrenom(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="prenom"
            placeholderTextColor="dark"
            label="E-mail"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Adresse</Text>
          <TextInput
            style={styles.input}
            value={adresse}
            onChangeText={(text) => {
              setAdresse(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="adresse"
            placeholderTextColor="dark"
            label="E-mail"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Tel</Text>
          <TextInput
            style={styles.input}
            value={tel}
            onChangeText={(text) => {
              setTel(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="tel"
            placeholderTextColor="dark"
            label="E-mail"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>CIN</Text>
          <TextInput
            style={styles.input}
            value={cin}
            onChangeText={(text) => {
              setCin(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="cin"
            placeholderTextColor="dark"
            label="E-mail"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Qualification</Text>
          <TextInput
            style={styles.input}
            value={qualification}
            onChangeText={(text) => {
              setQualification(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="qualification"
            placeholderTextColor="dark"
            label="E-mail"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="email"
            placeholderTextColor="dark"
            label="E-mail"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="password"
            placeholderTextColor="dark"
            passwordRules
            label="password"
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Signup" color="#4a148c" onPress={submit} />
        </View>
      </ScrollView>
    </Card>
  );
};

Signup.navigationOptions = {
  headerTitle: "Inscription",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 600,
    padding: 20,
    marginLeft: "10%",
    marginTop: "10%",
  },
  buttonContainer: {
    marginTop: 10,
  },
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default Signup;
