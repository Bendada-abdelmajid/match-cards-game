import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  Easing,
  FadeIn,
  FadeInLeft,
  FadeOut,
  interpolate,
  interpolateColor,
  LayoutAnimationConfig,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const word = "MATCHCARDS"
  .split("")
  .map((el, index) => ({ letter: el, id: index }));

const { height, width } = Dimensions.get("window");

const OpenScreen = ({ setOpen }) => {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut.duration(600).easing(Easing.ease)}
      key={"intro"}
      style={styles.container}
    >
      <View style={styles.textWrapper}>
        <View style={styles.lettrsWrapper}>
          {word.slice(0, 5).map((el, i) => (
            <Letter key={el.id} el={el} />
          ))}
        </View>
        <View style={styles.lettrsWrapper}>
          {word.slice(5, 10).map((el, i) => (
            <Letter key={el.id} el={el} />
          ))}
        </View>
      </View>

      <Animated.View
        style={styles.btn}
        entering={FadeIn.delay(200).duration(500).easing(Easing.ease)}
        exiting={FadeOut.duration(500).easing(Easing.ease)}
      >
      
        <Pressable onPress={() => setOpen(true)}>
          <Text style={styles.btnText}>New game</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

export default OpenScreen;

const Letter = ({ el }) => {
  const active = useSharedValue(0);
  //[0, 7, 3, 5, 4, 7, 1, 6];
  const duration = 400;
  useEffect(() => {
    active.value =withRepeat( withSequence(
      withTiming(el.id == 0 ? 1 : 0, { duration, easing: Easing.ease }),
      withTiming([0,7].includes(el.id) ? 1 : 0, { duration, easing: Easing.ease }),
      withDelay(duration/2,withTiming(-1, { duration, easing: Easing.ease })),
      withTiming(0, { duration, easing: Easing.ease }),
      withTiming(el.id == 3 ? 1 : 0, { duration, easing: Easing.ease }),
      withTiming([3,5].includes(el.id) ? 1 : 0, { duration, easing: Easing.ease }),
      withTiming([3,5].includes(el.id) ? 2 : 0, { duration, easing: Easing.ease }),
      withTiming([3,5].includes(el.id)  ? 2 : 0, { duration, easing: Easing.ease }),
      withTiming([3,5].includes(el.id) ? 2 : el.id == 0 ? 1 : 0, { duration, easing: Easing.ease }),
      withTiming([3,5].includes(el.id) ? 2: [0,7].includes(el.id) ? 1 : 0, { duration, easing: Easing.ease }),
      withDelay(duration/2,withTiming([3,5].includes(el.id)?2 : -1, { duration, easing: Easing.ease })),
      withTiming([3,5].includes(el.id)?2 : 0, { duration, easing: Easing.ease }),
      withTiming([3,5].includes(el.id) ? 2: el.id == 1 ? 1 : 0, { duration, easing: Easing.ease }),
      withTiming([1,3,5, 6].includes(el.id)  ? 2 : 0, { duration, easing: Easing.ease }),
      withTiming([1,3,5, 6].includes(el.id)? 2 : 0, { duration, easing: Easing.ease }),
      withTiming(2, { duration, easing: Easing.ease }),
      withDelay(duration/2, withTiming(0, { duration, easing: Easing.ease, })),
      withTiming(0, { duration, easing: Easing.ease, })
    ),  -1);
  }, []);

  const activeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(active.value, [-1, 0, 1, 2], [1, 1, 1.05, 1.05]),
        },
      ],
      color: interpolateColor(
        active.value,
        [-1, 0, 1, 2],
        ["#d5bff2", "#d5bff2", "#bb87ff", "#facc15"]
      ),
      opacity: interpolate(active.value, [-1, 0, 1, 2], [0.3, 0.5, 1, 1]),
    };
  });

  return (
    <Animated.View
      entering={FadeInLeft.delay(200).duration(500).easing(Easing.ease)}
      exiting={FadeOut.duration(500).easing(Easing.ease)}
      key={"letter" + el.id}
      style={[styles.lettrWrapper]}
    >
      <Animated.Text style={[styles.lettrs, activeStyle]}>
        {el.letter}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 20,
  },
  textWrapper: {
    width: height * 0.75,
    height: width,
    justifyContent: "center",
    gap: 2,
    transformOrigin: "left top",
    transform: [
      {
        rotate: "-90deg",
      },
      {
        translateX: -height * 0.77,
      },
    ],
  },
  lettrsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lettrWrapper: {
    alignItems: "center",
    height: (height / 4.5) * 0.8,
  },
  lettrs: {
    alignSelf: "center",
    lineHeight: height / 4.32,
    marginVertical: "auto",
    fontSize: height / 4.5,
    fontWeight: 300,
    fontFamily: "Roboto-Regular",
  },
  btn: {
    marginTop: "auto",
    marginBottom: 30,
    marginHorizontal: 20,
    backgroundColor: "#facc15",

    paddingVertical: 20,
    borderRadius: 20,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 500,
    textAlign: "center",
    fontFamily: "SpaceGrotesk-Light",
    textTransform: "capitalize",
  },
});
// #bb87ff
