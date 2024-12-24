import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Game from "./components/game";
import { StyleSheet, View } from "react-native";

import OpenScreen from "./components/open-screen";
import { LayoutAnimationConfig } from "react-native-reanimated";
SplashScreen.preventAutoHideAsync();
export default function App() {
  const [open, setOpen] = useState(false);
  const [loaded, error] = useFonts({
    "SpaceGrotesk-Light": require("./assets/fonts/SpaceGrotesk-Light.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <View style={styles.container}>
      <LayoutAnimationConfig>
        {open ? <Game /> : <OpenScreen setOpen={setOpen} />}
      </LayoutAnimationConfig>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    flex: 1,
    backgroundColor: "#000000",
  },
});
