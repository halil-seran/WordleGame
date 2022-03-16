import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { colors } from "./src/constants";
import Keyboard from "./src/components/Keyboard/";

const NUMBER_OF_TRIES = 6;

export default function App() {
  const word = "hello";
  const letters = word.split(""); // ['h','e','l','l','o']

  const rows = new Array(NUMBER_OF_TRIES).fill(
    new Array(letters.length).fill("a")
  );

  return (
    <Screen>
      <StatusBar style="light" />
      <HeaderTitle>WORDLE</HeaderTitle>
      <Map>
        {rows.map((row) => (
          <Row>
            {row.map((cell) => (
              <Cell>
                <CellLetter>{cell.toUpperCase()}</CellLetter>
              </Cell>
            ))}
          </Row>
        ))}
      </Map>
      <Keyboard />
    </Screen>
  );
}

const Map = styled.View`
  align-self: stretch;
  height: 100px;
`;
const Row = styled.View`
  flex-direction: row;
  align-self: stretch;
  justify-content: center;
`;
const Cell = styled.View`
  border-width:2px;
  border-color:white;
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
  font-weight:bold;
  font-size:28;
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
