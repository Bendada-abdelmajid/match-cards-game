import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Timer = ({ gameOver }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [score, setScore] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const intervalRef = useRef(null);
  const toSeconds = (hours, minutes, seconds) => {
    return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
  };
  const  storeScore = async () => {
    try {
      const totalSeconds1 = toSeconds(
        score.hours,
        score.minutes,
        score.seconds
      );
      const totalSeconds2 = toSeconds(hours, minutes, seconds);
      if (totalSeconds1 > totalSeconds2 || totalSeconds1 === 0) {
        const newScore = { hours, minutes, seconds };
        await AsyncStorage.setItem("score-time", JSON.stringify(newScore));
        setScore(newScore);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const  getTime= async () => {
    try {
      const value = await AsyncStorage.getItem("score-time");
      jsonValue = JSON.parse(value);
      if (jsonValue) {
        setScore(jsonValue);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getTime();
   
    if (!gameOver) {
      intervalRef.current = setInterval(() => {
        if (seconds < 59) {
          setSeconds(seconds + 1);
        } else {
          setSeconds(0);
          if (minutes < 59) {
            setMinutes(minutes + 1);
          } else {
            setMinutes(0);
            setHours(hours + 1);
          }
        }
      }, 1000);
    } else {
      storeScore();
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [hours, minutes, seconds]);
  useEffect(() => {
    if(!gameOver){
      setHours(0)
      setMinutes(0)
      setSeconds(0)
    }
  }, [gameOver])
  

  return (
    <View style={styles.containter}>
      <Text style={[styles.time, {color: "#fbed2b",}]}>
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}
        <Text style={[styles.seconds, {color: "#fbed2b",}]}>.{String(seconds).padStart(2, "0")}</Text>
      </Text>
      <Text style={[styles.time,{color:"#fff", marginTop:-15, fontSize:60, fontWeight:400}]}>
        {String(score.hours).padStart(2, "0")}:{String(score.minutes).padStart(2, "0")}
        <Text style={[styles.seconds, {color:"#fff"}]}>.{String(score.seconds).padStart(2, "0")}</Text>
      </Text>
    </View>
  );
};

export default Timer;
const styles = StyleSheet.create({
  containter: {
    padding: 20,
    marginTop: "auto",
  },
  time: {
    fontWeight: 300,
    fontSize: 40,
    color: "#fbed2b",
  },
  seconds: {
    fontWeight: 300,
    fontSize: 22,
    color: "#fbed2b",
  },
});