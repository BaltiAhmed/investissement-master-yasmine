import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View, FlatList, AsyncStorage } from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import LandingGrid from "../components/landingGrid";
import {LINKS} from "./data"


const Home = (props) => {
  const [storedData, setstoredData] = useState();
  useEffect(async () => {
    const Data = await AsyncStorage.getItem("userData");
    setstoredData(Data);
  }, []);

  const renderGridItem = (itemData) => {
    return (
      <LandingGrid
      style={{marginTop:'25%'}}
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: itemData.item.link,
          });
        }}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => {
        item.id;
      }}
      data={LINKS}
      renderItem={renderGridItem}
      numColumns={1}
    />
  );
};

Home.navigationOptions = (navData) => {
  return {
    headerTitle: "Home",
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  },
});

export default Home;
