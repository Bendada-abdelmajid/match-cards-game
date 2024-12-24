import { Dimensions, Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
const { width } = Dimensions.get("screen");
const CardItem = ({ item, index, matched, handleCardPress }) => {
  const active = useSharedValue(0);

  useEffect(() => {
    active.value = withTiming(
      matched.includes(index) ? 2 : item.flipped ? 1 : 0,
      { duration: 300 }
    );
  }, [item.flipped, matched]);
  const activeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${interpolate(
            active.value,
            [0, 1, 2],
            [0, -180, -180]
          )}deg`,
        },
        {
          scale: interpolate(
            active.value,
            [0,.5, 1, 2],
            [1,.8 ,1,1]
          ),
        },
      ],
      backgroundColor: interpolateColor(
        active.value,
        [0, 1, 2],
        ["#d5bff2", "#bb87ff", "#facc15"]
      ), //c4b5fd
    };
  });
  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(active.value, [0, 1, 2], [0.8, 1, 1]),
        },
      ],
      opacity: interpolate(active.value, [0, 0.5, 1, 2], [0, 0, 1, 1]),
    };
  });

  return (
    <Pressable onPress={() => handleCardPress(index)} style={styles.container}>
      <Animated.View
        key={"card" + index}
        entering={FadeIn.duration(300).delay(200 * (1 + index / 2))}
        style={[styles.card, activeStyle]}
      >
        <Animated.View entering={FadeIn}>
          <Animated.Image
            style={[{ width: 50 }, imageStyle]}
            resizeMode="contain"
            source={item.img}
          />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  container: {
    width: (width - 41) / 3,
    padding: 1,
    overflow: "hidden",
  },
  card: {
    backgroundColor: "#d8b4fe",
    borderRadius: 15,
    aspectRatio: 1 / 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  icon: {
    fontSize: 40,
  },
});
