import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeOut,
  LayoutAnimationConfig,
} from "react-native-reanimated";
const Modal = ({ show, reseteGame }) => {

  return (
    <LayoutAnimationConfig skipEntering>
      {show && (
        <View style={styles.containter} key={"modal"}>
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut.duration(500).easing(Easing.ease)}
            style={styles.modalOverlay}
          />
          <View style={styles.wrraper} >
            <Animated.Image resizeMode={"contain"} source={require("../assets/images/fire.png")} key={"icon"}
              entering={FadeInDown.duration(200).easing(Easing.ease)}
              exiting={FadeOut.duration(200).easing(Easing.ease)}
              style={styles.icon}
            />
            <Animated.Text  key={"title"}
              entering={FadeInDown.duration(200).easing(Easing.ease)}
              exiting={FadeOut.duration(200).easing(Easing.ease)}
              style={styles.title}
            >
              You are on Fire
            </Animated.Text>
            <Animated.View  key={"btn"}
              entering={FadeInDown.duration(200).easing(Easing.ease)}
              exiting={FadeOut.duration(200).easing(Easing.ease)}
              style={{ marginTop: 30 }}
            >
              <Pressable onPress={reseteGame} style={styles.btn}>
                <Text style={styles.btnText}>New Game</Text>
              </Pressable>
            </Animated.View>
          </View>
        </View>
      )}
    </LayoutAnimationConfig>
  );
};

export default Modal;
const styles = StyleSheet.create({
    containter:{
        position: "absolute",
        inset: 20,
        // backgroundColor:"red",
        zIndex:20
    },
  modalOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "#facc15",
    borderRadius: 15,
    zIndex: 10,
  
  },
  wrraper:{
    flex:1,
    padding: 20,
    alignContent: "center",
    justifyContent: "center",
    zIndex:20
  },
  icon: {
    marginHorizontal: "auto",
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 35,
    textAlign: "center",
    textTransform: "capitalize",
    marginTop: 20,
  },
  btn: {
    padding: 20,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#000",

    width: "80%",
    marginHorizontal: "auto",
  },
  btnText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 500,
    color: "#000",
  },
});
