import React, { useContext, useState, useEffect, useCallback } from "react";
import { ListItem, Body, Right, Text } from "native-base";
import { Authcontext } from "../context/authContext";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import { View, RefreshControl, ScrollView } from "react-native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ListeProjet = (props) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const id = props.navigation.getParam("id");
  console.log(id)
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.185:5000/api/planAffaire/projet/${id}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.PlanAffaire);
    };
    sendRequest();
  }, []);

  const [list, setList] = useState([]);

  const auth = useContext(Authcontext);
  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.185:5000/api/planAffaire/projet/${id}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.PlanAffaire);
    };
    sendRequest();
  }, []);

  return (
    <View>
      <View style={{ marginLeft: "8%", marginTop: 30 }}>
        <IconEntypo
          name="add-to-list"
          size={50}
          color="#1976d2"
          onPress={() => {
            props.navigation.navigate({
              routeName: "AjoutPPlanAffaire",
              params: {
                id: id,
              },
            });
          }}
        />
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {list &&
          list.map((item, index) => (
            <ListItem avatar>
              <Body>
                <View style={{ marginTop: 10 }}>
                  
                  <Text style={{ marginTop: 20 }} note>{item.description}</Text>
                  <Text style={{ marginTop: 20 }} note>{item.date}</Text>
                </View>
              </Body>
              <Right>
               
              </Right>
            </ListItem>
          ))}
      </ScrollView>
    </View>
  );
};

ListeProjet.navigationOptions = (navData) => {
  return {
    headerTitle: "Mes plans d'affaires",
    headerLeft: (
      <IconAntDesign
        name="menuunfold"
        size={30}
        color="#ff6f00"
        onPress={() => {
          navData.navigation.toggleDrawer();
        }}
      />
    ),
  };
};

export default ListeProjet;
