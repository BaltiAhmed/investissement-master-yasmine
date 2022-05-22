import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
} from "native-base";
import { Authcontext } from "../../context/authContext";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import { View, RefreshControl, ScrollView } from "react-native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = (props) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(`http://192.168.137.1:5000/api/projet/`);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.existingProjet);
    };
    sendRequest();
  }, []);

  const [list, setList] = useState([]);

  const auth = useContext(Authcontext);
  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(`http://192.168.137.1:5000/api/projet/`);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.existingProjet);
    };
    sendRequest();
  }, []);

  const [categorie, setCategorie] = useState("");

  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Item regular>
          <Input
            placeholder="Recherche"
            value={categorie}
            onChangeText={(text) => {
              setCategorie(text);
            }}
          />
        </Item>
        {list &&
          list
            .filter((val) => {
              if (categorie == "") {
                return val;
              } else if (val.titre.includes(categorie)) {
                return val;
              }
            })
            .map((item, index) => (
              <ListItem avatar>
                <Body>
                  <View style={{ marginTop: 10 }}>
                    <Text style={{ marginTop: 20 }}>{item.titre}</Text>
                    <Text style={{ marginTop: 20 }} note>
                      {item.descreption}
                    </Text>
                    <Text style={{ marginTop: 20 }} note>
                      {item.datelancement}
                    </Text>
                  </View>
                </Body>
                <Right>
                  <IconEntypo
                    name="tools"
                    size={25}
                    color="#0288d1"
                    onPress={() => {
                      props.navigation.navigate({
                        routeName: "ListeEquipement",
                        params: {
                          id: item._id,
                        },
                      });
                    }}
                  />

                  <IconFontAwesome
                    name="product-hunt"
                    size={25}
                    color="#0288d1"
                    style={{ marginTop: 20 }}
                    onPress={() => {
                      props.navigation.navigate({
                        routeName: "ListeProduction",
                        params: {
                          id: item._id,
                        },
                      });
                    }}
                  />

                  <IconMaterialIcons
                    name="public"
                    size={25}
                    color="#0288d1"
                    style={{ marginTop: 20 }}
                    onPress={() => {
                      props.navigation.navigate({
                        routeName: "ListeMarketing",
                        params: {
                          id: item._id,
                        },
                      });
                    }}
                  />
                </Right>
              </ListItem>
            ))}
      </ScrollView>
    </View>
  );
};

Home.navigationOptions = (navData) => {
  return {
    headerTitle: "Acceuil",
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

export default Home;
