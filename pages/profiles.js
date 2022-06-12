import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import Card from "../components/card";
import { Authcontext } from "../context/authContext";
import AntDesign from "react-native-vector-icons/AntDesign";

const Profile = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [nom, setNom] = useState();
  const [CIN, SetCIN] = useState();
  const [adresse, setAdresse] = useState();
  const [tel, setTel] = useState();
  const [dep, setDep] = useState();
  const [el, setEl] = useState();

  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date.toString());
    hideDatePicker();
  };

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.185:5000/api/utilisateur/${auth.userId}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setNom(responseData.existingUtilisateur.nom + " " + responseData.existingUtilisateur.prenom);
      setEmail(responseData.existingUtilisateur.email);
      SetCIN(responseData.existingUtilisateur.cin);
      setAdresse(responseData.existingUtilisateur.adresse);
      setTel(responseData.existingUtilisateur.telephone);
      setDep(responseData.existingUtilisateur.qualification);
      setEl(responseData.existingUtilisateur);
    };
    sendRequest();
  }, []);

  const auth = useContext(Authcontext);

  console.log(el)

  return (
    <Card style={styles.authContainer}>
      <TouchableOpacity
        style={{
          marginTop: "5%",
          borderRadius: 10,
          borderColor: "#be0000",
          paddingTop: "2.5%",
        }}
        onPress={()=> auth.logout()}
      >
        <View style={{ alignSelf: "center", flexDirection: "row" }}>
          <AntDesign name="logout" size={30} color={"#be0000"} />
          <Text
            style={{
              fontSize: 18,
              marginTop: "1%",
              marginLeft: "4%",
              color: "#be0000",
            }}
          >
            Déconnextion
          </Text>
        </View>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.formControl}>
          <Text style={styles.label}>Nom</Text>
          <TextInput
            style={styles.input}
            value={nom && nom}
            onChangeText={(text) => {
              setNom(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="nom"
            placeholderTextColor="dark"
            label="E-mail"
            editable={false}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>CIN</Text>
          <TextInput
            style={styles.input}
            value={CIN}
            onChangeText={(text) => {
              SetCIN(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="CIN"
            placeholderTextColor="dark"
            label="E-mail"
            editable={false}
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
            editable={false}
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
            placeholder="Adresse"
            placeholderTextColor="dark"
            label="E-mail"
            editable={false}
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
            keyboardType="numeric"
            autoCapitalize="none"
            placeholder="tel"
            placeholderTextColor="dark"
            label="E-mail"
            editable={false}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Qualification</Text>
          <TextInput
            style={styles.input}
            value={dep}
            onChangeText={(text) => {
              setDep(text);
            }}
            keyboardAppearance="light"
            autoCapitalize="none"
            placeholder="Départeent"
            placeholderTextColor="dark"
            label="E-mail"
            editable={false}
          />
        </View>
      </ScrollView>
    </Card>
  );
};

Profile.navigationOptions = {
  headerTitle: "Profile",
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
    width: "90%",
    maxWidth: 400,
    maxHeight: 600,
    padding: 20,
    marginLeft: "5%",
    marginTop: "10%",
  },
  buttonContainer: {
    marginTop: 20,
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

export default Profile;
