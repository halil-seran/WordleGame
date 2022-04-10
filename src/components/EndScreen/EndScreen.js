import { View, Text, TouchableOpacity, Alert, Linking } from "react-native";
import React, { useState, useEffect } from "react";
import { colorsToEmoji } from "../../constants";
import * as Clipboard from "expo-clipboard";
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

const GuessDistribution = () => {
  return (
    <>
      <Subtitle>GUESS THE DISTRIBUTION</Subtitle>
      <GuessDistributionLine position={1} amount={0} percentage={8} />
      <GuessDistributionLine position={2} amount={0} percentage={8} />
      <GuessDistributionLine position={3} amount={2} percentage={24} />
      <GuessDistributionLine position={4} amount={4} percentage={48} />
      <GuessDistributionLine position={5} amount={8} percentage={95} />
      <GuessDistributionLine position={6} amount={1} percentage={12} />
    </>
  );
};

const EndScreen = ({ won = false, rows, getCellBGColor }) => {
  const [secondsTillTomorrow, setSecondsTillTomorrow] = useState(0);

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
    Alert.alert("Your Score Copied!", "Share Your Score");
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
        <Number number={15} label={"Played"} />
        <Number number={"100%"} label={"Win \nRate"} />
        <Number number={3} label={"Current \nStreak"} />
        <Number number={5} label={"Max \nStreak"} />
      </HeaderContainer>
      <GuessDistribution />
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
