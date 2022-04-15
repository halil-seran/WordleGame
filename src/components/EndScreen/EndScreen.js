import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colorsToEmoji } from "../../constants";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Title,
  Subtitle,
  HeaderContainer,
  StatisticsTitle,
  StatisticsNumbers,
  StatisticsContainer,
  DistributionText,
  DistributionArea,
  DistributionContainer,
  Screen,
  BottomAreaText,
  TimeText,
  TimeContainer,
  BottomArea,
  ShareButton,
  ShareButtonText,
} from "./EndScreen-styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Number = ({ number, label }) => {
  return (
    <StatisticsContainer>
      <StatisticsTitle>{number}</StatisticsTitle>
      <StatisticsNumbers>{label}</StatisticsNumbers>
    </StatisticsContainer>
  );
};

const GuessDistributionLine = ({ position, amount, percentage }) => {
  return (
    <DistributionContainer>
      <DistributionText>{position}</DistributionText>
      <DistributionArea style={{ width: `${percentage}%` }}>
        <DistributionText>{amount}</DistributionText>
      </DistributionArea>
    </DistributionContainer>
  );
};

const GuessDistribution = ({ distribution }) => {
  if (!distribution) {
    return null;
  }
  const sum = distribution.reduce((total, dist) => (dist + total), 0);
  return (
    <>
      <Subtitle>GUESS THE DISTRIBUTION</Subtitle>
      {distribution.map((dist, index) => (
        <GuessDistributionLine
          key={index}
          position={index}
          amount={dist}
          percentage={7 + (90 * dist / sum)}
        />
      ))}
    </>
  );
};

const EndScreen = ({ won = false, rows, getCellBGColor }) => {
  const [secondsTillTomorrow, setSecondsTillTomorrow] = useState(0);
  const [played, setPlayed] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [curStreak, setCurStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [distribution, setDistribution] = useState(null);

  useEffect(() => {
    readState();
  }, []);
  const share = () => {
    const textMap = rows
      .map(
        (row, i) =>
          row.map((cell, j) => colorsToEmoji[getCellBGColor(i, j)]).join("") //it may be just a space
      )
      .filter((row) => row)
      .join("\n");
    const textToShare = `Wordle \n ${textMap}`;
    const url =
      "https://twitter.com/intent/tweet?text=" + `Wordle  \n${textMap}`;
    Linking.openURL(url);
    Clipboard.setString(textToShare);
    ToastAndroid.show("Copied!", ToastAndroid.LONG);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );
      setSecondsTillTomorrow((tomorrow - now) / 1000);
    };
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const readState = async () => {
    const dataString = await AsyncStorage.getItem("@game");
    let data;
    try {
      data = JSON.parse(dataString);
    } catch (e) {
      console.log("couldn't parse state", e);
    }
    const keys = Object.keys(data);
    const values = Object.values(data);
    setPlayed(keys.length);
    const numberOfWins = values.filter(
      (game) => game.gameState === "won"
    ).length;
    setWinRate(Math.floor((100 * numberOfWins) / keys.length));

    let curStreakCount = 0;
    let maxStreakCount = 0;
    let prevDay = 0;
    keys.forEach((key) => {
      const day = parseInt(key.split("-"[1]));
      if (data[key].gameState === "won" && curStreakCount === 0) {
        curStreakCount += 1;
      } else if (data[key].gameState === "won" && prevDay + 1 === day) {
        curStreakCount += 1;
      } else {
        if (curStreakCount > maxStreakCount) {
          maxStreakCount = curStreakCount;
        }
        curStreakCount = data[key].gameState === "won" ? 1 : 0;
      }
      prevDay = day;
    });
    setCurStreak(curStreakCount);
    setMaxStreak(maxStreakCount);

    //guess distribution

    const dist = [0, 0, 0, 0, 0, 0, 0];

    values.map((game) => {
      if (game.gameState === "won") {
        const tries = game.rows.filter((row) => row[0]).length;
        dist[tries] = dist[tries] + 1;
      }
    });
    setDistribution(dist);
  };

  const formatSeconds = () => {
    const hours = Math.floor(secondsTillTomorrow / (60 * 60));
    const minutes = Math.floor((secondsTillTomorrow % (60 * 60)) / 60);
    const seconds = Math.floor(secondsTillTomorrow % 60);
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Screen>
      <Title>{won ? "Congratulations!" : "Try Again Tomorrow"}</Title>
      <Subtitle>STATISTICS</Subtitle>
      <HeaderContainer>
        <Number number={played} label={"Played"} />
        <Number number={winRate + "%"} label={"Win \nRate"} />
        <Number number={curStreak} label={"Current \nStreak"} />
        <Number number={maxStreak} label={"Max \nStreak"} />
      </HeaderContainer>
      <GuessDistribution distribution={distribution} />
      <BottomArea>
        <TimeContainer>
          <BottomAreaText>NEXT WORDLE</BottomAreaText>
          <TimeText>{formatSeconds()}</TimeText>
        </TimeContainer>
        <ShareButton onPress={share}>
          <ShareButtonText>
            SHARE <FontAwesome5 name={"share-alt"} solid size={16} />
          </ShareButtonText>
        </ShareButton>
      </BottomArea>
    </Screen>
  );
};

export default EndScreen;
