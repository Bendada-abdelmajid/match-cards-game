import { Pressable, StyleSheet, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import CardItem from "./CardItem";
import React, { useEffect, useRef, useState } from "react";
import Modal from "./modal";
import { Audio } from "expo-av";
import Timer from "./timer";
import Animated, { Easing, FadeIn, FadeOut } from "react-native-reanimated";

const list = [
  { img: require("../assets/images/alien.png"), value: "alien" },
  { img: require("../assets/images/clown.png"), value: "clown" },
  { img: require("../assets/images/demon.png"), value: "demon" },
  { img: require("../assets/images/ghost.png"), value: "ghost" },
  { img: require("../assets/images/pumpkin.png"), value: "pumpkin" },
  { img: require("../assets/images/robot.png"), value: "robot" },
];
const shuffleCards = () => {
  const array = [...list, ...list].map((item, index) => ({
    img: item.img,
    value: item.value,
    id: index,
    flipped: false,
  }));

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};
const Game = () => {
  const flipSoundRef = useRef(null);
  const matchSoundRef = useRef(null);
  const successSoundRef = useRef(null);

  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [cards, setCards] = useState(shuffleCards());
  const [mute, setMute] = useState(false); 

  useEffect(() => {
    shuffleCards();
    preloadSounds();
    return () => {
      flipSoundRef.current && flipSoundRef.current.unloadAsync();
      matchSoundRef.current && matchSoundRef.current.unloadAsync();
      successSoundRef.current && matchSoundRef.current.unloadAsync();
    };
  }, []);
  const preloadSounds = async () => {
    flipSoundRef.current = new Audio.Sound();
    matchSoundRef.current = new Audio.Sound();
    successSoundRef.current = new Audio.Sound();

    await flipSoundRef.current.loadAsync(require("../assets/flip.mp3"));
    await matchSoundRef.current.loadAsync(require("../assets/matched.mp3"));
    await successSoundRef.current.loadAsync(require("../assets/success.mp3"));
  };


  const playFlipSound = async () => {
    if (!mute && flipSoundRef.current) {
      await flipSoundRef.current.replayAsync();
    }
  };

  const playMatchSound = async () => {
    if (!mute && matchSoundRef.current) {
      await matchSoundRef.current.replayAsync();
    }
  };

  const playSuccessSound = async () => {
    if (!mute && successSoundRef.current) {
      await successSoundRef.current.replayAsync();
    }
  };

  const toggleMute = () => {
    setMute(!mute);  // Toggle mute on button press
  };

  const handleCardPress = (index) => {
    playFlipSound();
    if (
      selected.length === 2 ||
      matched.includes(index) ||
      selected.some((item) => item.index === index)
    )
      return;

    const newCards = [...cards];
    
    newCards[index].flipped = true;
 
    setCards(newCards);

    const newSelected = [...selected, { index, value: newCards[index].value }];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      checkMatch(newSelected);
    }
  };

  const checkMatch = (pair) => {
    if (pair[0].value === pair[1].value) {
      setMatched([...matched, pair[0].index, pair[1].index]);
      playMatchSound();

      setSelected([]);
      if (matched.length + 2 === cards.length) {
        setTimeout(() => {
          setGameOver(true);
          playSuccessSound();
        }, 200);
        // Set game over when all cards are matched
      }
    } else {
      setTimeout(() => {
        const newCards = [...cards];
        newCards[pair[0].index].flipped = false;
        newCards[pair[1].index].flipped = false;
        setCards(newCards);
        setSelected([]);
      }, 1000);
    }
  };
  const reseteGame = () => {
    setMatched([]);
    setSelected([]);
    setCards(shuffleCards());
    setGameOver(false);
  };
  return (
    <Animated.View entering={FadeIn.duration(500).easing(Easing.ease)} exiting={FadeOut} key={"game"} style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>Match</Text>
          <Text style={[styles.logo]}>Cards</Text>
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable style={styles.btn}>
            <Feather name="music" size={20} color="#fff" />
          </Pressable>
          <Pressable onPress={toggleMute} style={styles.btn}>
            <Feather name={mute ? "volume-x":"volume-2"} size={20} color="#fff" />
          </Pressable>
        </View>
      </View>
      <Timer gameOver={gameOver} />

      <View style={styles.cards}>
        <Modal show={gameOver} reseteGame={reseteGame} />
        {cards.map((el, index) => (
          <CardItem
            key={el.id}
            index={index}
            item={el}
            matched={matched}
            handleCardPress={handleCardPress}
          />
        ))}
      </View>
    </Animated.View>
  );
};
export default Game;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    color: "#faf5ff",
    lineHeight: 16,
    fontFamily: "SpaceGrotesk-Light",
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: 300,
    letterSpacing: 2,
  },
  btn: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "rgba(555, 555, 555, .5)",
    borderWidth: 1,
    borderRadius: 5,
  },
  cards: {
    marginTop: "auto",
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "end",
  },
});
