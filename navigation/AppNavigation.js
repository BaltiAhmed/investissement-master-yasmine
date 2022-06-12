import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import AntDesign from "react-native-vector-icons/AntDesign";
import Home from "../pages/home";
import AjoutProjet from "../pages/ajoutProjet";
import Listeprojet from "../pages/liste-projet";
import ListeEquipement from "../pages/listeEquipement";
import AjoutEquipement from "../pages/AjoutEquipement";
import UpdateEquipement from "../pages/updateEquipement";
import ListeProduction from "../pages/liste-production";
import AjoutProduction from "../pages/AjoutProduction";
import UpdateProduction from "../pages/update-production";
import AjoutMarketing from "../pages/marketing/ajout-marketing";
import ListeMarketing from "../pages/marketing/liste-marketing";
import UpdateMarketing from "../pages/marketing/update-marketing";
import ChatScreen from "../pages/chat";
import ChatScreenFinanciere from "../pages/chatFinanciere";
import ListFinanciere from "../pages/list-financiere";
import ListeProjetPlanAffaire from "../pages/planAffaire";
import ListePlanAffaire from "../pages/listPlanAffaire";
import AjoutPPlanAffaire from "../pages/AddPlanAffaire";
import Profile from "../pages/profiles";

const HomeNav = createStackNavigator(
  {
    Home: Home,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#4a148c",
      },
      headerTintColor: "white",
    },
  }
);

const AjoutNav = createStackNavigator(
  {
    Liste: Listeprojet,
    AjoutProjet: AjoutProjet,
    ListeEquipement: ListeEquipement,
    AjoutEquipement: AjoutEquipement,
    UpdateEquipement: UpdateEquipement,
    ListeProduction: ListeProduction,
    AjoutProduction: AjoutProduction,
    UpdateProduction: UpdateProduction,
    ListeMarketing: ListeMarketing,
    AjoutMarketing: AjoutMarketing,
    UpdateMarketing: UpdateMarketing,
    ListeProjetPlanAffaire: ListeProjetPlanAffaire,
    ListePlanAffaire: ListePlanAffaire,
    AjoutPPlanAffaire: AjoutPPlanAffaire,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#4a148c",
      },
      headerTintColor: "white",
    },
  }
);

const ChatNav = createStackNavigator(
  {
    ChatScreen: ChatScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#4a148c",
      },
      headerTintColor: "white",
    },
  }
);

const ChatNavFinanciere = createStackNavigator(
  {
    ListFinanciere: ListFinanciere,
    ChatScreenFinanciere: ChatScreenFinanciere,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#4a148c",
      },
      headerTintColor: "white",
    },
  }
);

const ProfileNav = createStackNavigator(
  {
    Profile: Profile,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#4a148c",
      },
      headerTintColor: "white",
    },
  }
);

const mainNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeNav,
      navigationOptions: {
        drawerLabel: "Home",
      },
      contentOptions: {
        labelStyle: {
          marginTop: 100,
        },
      },
    },
    Ajout: {
      screen: AjoutNav,
      navigationOptions: {
        drawerLabel: "Mes projet",
      },
      contentOptions: {
        labelStyle: {
          marginTop: 100,
        },
      },
    },
    Chat: {
      screen: ChatNav,
      navigationOptions: {
        drawerLabel: "Messages",
      },
      contentOptions: {
        labelStyle: {
          marginTop: 100,
        },
      },
    },
    Financiere: {
      screen: ChatNavFinanciere,
      navigationOptions: {
        drawerLabel: "Fnancières",
      },
      contentOptions: {
        labelStyle: {
          marginTop: 100,
        },
      },
    },
    Profile: {
      screen: ProfileNav,
      navigationOptions: {
        drawerLabel: "Profile",
      },
      contentOptions: {
        labelStyle: {
          marginTop: 100,
        },
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: "#4a148c",
      labelStyle: {
        fontSize: 18,
        marginTop: 50,
      },
    },
  }
);

export default createAppContainer(mainNavigator);
