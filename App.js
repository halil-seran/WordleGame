import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { colors, CLEAR, ENTER } from "./src/constants";
import Keyboard from "./src/components/Keyboard/";

const NUMBER_OF_TRIES = 6;

const copyArray = (arr) => {
  return [...arr.map((rows) => [...rows])];
};

export default function App() {
  const word = "hello";
  const letters = word.split(""); // ['h','e','l','l','o']

  const [rows, setRows] = useState(
    new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill(""))
  );

  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);

  const onKeyPressed = (key) => {
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
