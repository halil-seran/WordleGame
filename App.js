import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Alert } from "react-native";
import styled from "styled-components/native";
import { colors, CLEAR, ENTER, colorsToEmoji } from "./src/constants";
import Keyboard from "./src/components/Keyboard/";
import * as Clipboard from "expo-clipboard";

const NUMBER_OF_TRIES = 6;

const copyArray = (arr) => {
  return [...arr.map((rows) => [...rows])];
};

const getDayOfTheYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day;
};

const dayOfTheYear = getDayOfTheYear();

const words = ["hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker","hello", "world", "baker",];

export default function App() {
  const word = words[dayOfTheYear];
  const letters = word.split(""); // ['h','e','l','l','o']

  const [rows, setRows] = useState(
    new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill(""))
  );

  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);
  const [gameState, setGameState] = useState("playing"); //lost , won , playing

  useEffect(() => {
    if (curRow > 0) {
      checkGameState();
    }
  }, [curRow]);

  const checkGameState = () => {
    if (checkIfWon() && gameState !== "won") {
      Alert.alert("Congilasinn", "You Won!", [
        { text: "Share", onPress: shareScore },
      ]);
      setGameState("won" && gameState !== "lost");
    } else if (checkIfLost()) {
      Alert.alert("Bum", "You Lost!");
      setGameState("lost");
    }
  };

  const shareScore = () => {
    const textMap = rows
      .map(
        (row, i) =>
          row.map((cell, j) => colorsToEmoji[getCellBGColor(i, j)]).join("") //it may be just a space
      )
      .filter((row) => row)
      .join("\n");
    const textToShare = `Wordle \n ${textMap}`;
    Clipboard.setString(textToShare);
    Alert.alert("Your Score Copied!", "Share Your Score");
  };

  const checkIfWon = () => {
    const row = rows[curRow - 1];
    return row.every((letter, i) => letter === letters[i]);
  };

  const checkIfLost = () => {
    return !checkIfWon() && curRow === rows.length;
  };

  const onKeyPressed = (key) => {
    if (gameState !== "playing") {
      return;
    }
    const updatedRows = copyArray(rows);

    if (key === CLEAR) {
      const prevCol = curCol - 1;
      if (prevCol >= 0) {
        updatedRows[curRow][curCol] = "";
        setRows(updatedRows);
        setCurCol(prevCol);
      }
      return;
    }

    if (key === ENTER) {
      if (curCol === rows[0].length) {
        setCurRow(curRow + 1);
        setCurCol(0);
      }

      return;
    }

    if (curCol < rows[0].length) {
      updatedRows[curRow][curCol] = key;
      setRows(updatedRows);
      setCurCol(curCol + 1);
    }
  };
  const isCellActive = (row, col) => {
    return row === curRow && col === curCol;
  };
  const getCellBGColor = (row, col) => {
    const letter = rows[row][col];
    if (row >= curRow) {
      return colors.black;
    }
    if (letter === letters[col]) {
      return colors.primary;
    }
    if (letters.includes(letter)) {
      return colors.secondary;
    }
    return colors.darkgrey;
  };

  const getAllLettersWithColor = (color) => {
    return rows.flatMap((row, i) =>
      row.filter((cell, j) => getCellBGColor(i, j) === color)
    );
  };

  const greenCaps = getAllLettersWithColor(colors.primary);
  const yellowCaps = getAllLettersWithColor(colors.secondary);
  const greyCaps = getAllLettersWithColor(colors.darkgrey);

  return (
    <Screen>
      <StatusBar style="light" />
      <HeaderTitle>WORDLE</HeaderTitle>
      <Map>
        {rows.map((row, i) => (
          <Row key={`row-${i}`}>
            {row.map((letter, j) => (
              <Cell
                key={`cell-${i}-${j}`}
                style={{
                  borderColor: isCellActive(i, j)
                    ? colors.grey
                    : colors.darkgrey,
                  backgroundColor: getCellBGColor(i, j),
                }}
              >
                <CellLetter>{letter.toUpperCase()}</CellLetter>
              </Cell>
            ))}
          </Row>
        ))}
      </Map>
      <Keyboard
        onKeyPressed={onKeyPressed}
        greenCaps={greenCaps}
        yellowCaps={yellowCaps}
        greyCaps={greyCaps}
      />
    </Screen>
  );
}

const Map = styled.ScrollView`
  align-self: stretch;
  margin-top: 20px;
`;
const Row = styled.View`
  flex-direction: row;
  align-self: stretch;
  justify-content: center;
`;
const Cell = styled.View`
  border-width:2px;
  margin:5px;
  height:30px;
  aspect-ratio:1;
  flex:1
  max-width:70px;
  align-items: center;
  justify-content: center;
`;
// white yerine colors.darkgrey olucak
const CellLetter = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 48px;
`;
// white yerine colors.lightgrey olucak
const Screen = styled.View`
  flex: 1;
  background: ${colors.black};
  align-items: center;
  padding-top: 40px;
`;
const HeaderTitle = styled.Text`
  color: ${colors.lightgrey};
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 6px;
`;

const styles = StyleSheet.create({
  map: {},
});
