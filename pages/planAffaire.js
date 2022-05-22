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

const ListeProjetPlanAffaire = (props) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.185:5000/api/projet/utilisateur/${auth.userId}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.projet);
    };
    sendRequest();
  }, []);

  const [list, setList] = useState([]);

  const auth = useContext(Authcontext);
  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.1.185:5000/api/projet/utilisateur/${auth.userId}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.projet);
    };
    sendRequest();
  }, []);

  return (
    <View>
      

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {list &&
          list.map((item, index) => (
            <ListItem avatar>
              <Body>
                <View style={{ marginTop: 10 }} >
                  <Text onPress={() => {
                    props.navigation.navigate({
                      routeName: "ListePlanAffaire",
                      params: {
                        id: item._id,
                      },
                    });
                  }} style={{ marginTop: 20 }}>{item.titre}</Text>
                  <Text style={{ marginTop: 20 }} note>{item.descreption}</Text>
                  <Text style={{ marginTop: 20 }} note>{item.datelancement}</Text>
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

ListeProjetPlanAffaire.navigationOptions = (navData) => {
  return {
    headerTitle: "Mes projet",
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

export default ListeProjetPlanAffaire;
