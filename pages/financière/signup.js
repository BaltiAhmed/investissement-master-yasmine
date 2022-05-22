import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  Alert,
  Image
} from "react-native";
import Card from "../../components/card";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import mime from "mime";
import IconAntDesign from "react-native-vector-icons/AntDesign";

const SignupFinanciere = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [nom, setNom] = useState();
  const [prenom, setPrenom] = useState();
  const [adresse, setAdresse] = useState();
  const [tel, setTel] = useState();
  const [cin, setCin] = useState();
  const [budget, setbudget] = useState();
  const [domaine, setdomaine] = useState();
  const [profile, setprofile] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImage = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image1 = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setprofile(image1);
    //props.onImageTaken(image1.uri);
  };

  const submit = async () => {
    const url = "http://192.168.137.1:5000/api/financiere/signup";
    const fileUri = profile.uri;
    const newImageUri = "file:///" + fileUri.split("file:/").join("");
    const formData = new FormData();
    formData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });
    formData.append("email", email);
    formData.append("password", password);
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("adresse", adresse);
    formData.append("telephone", tel);
    formData.append("cin", cin);
    formData.append("budget", budget);
    formData.append("domaine", domaine);
    const options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    console.log(formData);

    let response = await fetch(url, options);

    if (!response.ok) {
      let responsedata = await response.json();
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
      throw new Error(responsedata.message);
    }
    let responsedata = await response.json();
    Alert.alert("Message", "Votre compte est bien crée", [{ text: "fermer" }]);
  };

  return (
    <Card style={styles.authContainer}>
      <ScrollView>
        <View style={styles.formControl}>
          <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
              {!profile ? (
                <Text>image de profile.</Text>
              ) : (
                <Image style={styles.image} source={{ uri: profile && profile.uri.toString() }} />
              )}
            </View>
            <IconAntDesign
              name="upload"
              size={30}
              color="#2196f3"
              onPress={takeImage}
            />
          </View>

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
            value={budget}
            onChangeText={(text) => {
              setbudget(text);
            }}
            keyboardAppearance="light"
            keyboardType="numeric"
            autoCapitalize="none"
            placeholder="qualification"
            placeholderTextColor="dark"
            label="E-mail"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Qualification</Text>
          <TextInput
            style={styles.input}
            value={domaine}
            onChangeText={(text) => {
              setdomaine(text);
            }}
            keyboardAppearance="light"
            keyboardType="numeric"
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

SignupFinanciere.navigationOptions = {
  headerTitle: "Inscription",
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
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
  imagePreview: {
    width: "80%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default SignupFinanciere;
