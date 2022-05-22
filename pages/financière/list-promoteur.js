import React, { useContext, useState, useEffect, useCallback } from "react";
import { ListItem, Body, Right, Text } from "native-base";
import { Authcontext } from "../../context/authContext";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconEntypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, RefreshControl, ScrollView } from "react-native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ListPromoteur = (props) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const EId = props.navigation.getParam("id");
  const auth = useContext(Authcontext);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(`http://192.168.137.1:5000/api/utilisateur`);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.existingUtilisateur);
    };
    sendRequest();
  }, []);

  const [list, setList] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(`http://192.168.137.1:5000/api/utilisateur`);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.existingUtilisateur);
    };
    sendRequest();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        {list &&
          list.map((item, index) => (
            <ListItem avatar>
              <Body>
                <View style={{ marginTop: 20 }}>
                  <Text>{item.nom}</Text>
                  <Text note>{item.prenom}</Text>
                  <Text note>{item.domaine}</Text>
                </View>
              </Body>

              <Right>
                <MaterialCommunityIcons
                  name="send-circle"
                  size={25}
                  color="#00e676"
                  onPress={() => {
                    props.navigation.navigate({
                      routeName: "ChatScreen",
                      params: {
                        id: item._id,
                      },
                    });
                  }}
                />
              </Right>
            </ListItem>
          ))}
      </View>
    </ScrollView>
  );
};

ListPromoteur.navigationOptions = (navData) => {
  return {
    headerTitle: "Liste Promoteur",
  };
};

export default ListPromoteur;
