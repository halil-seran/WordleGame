import React from "react";
import { StatusBar } from "expo-status-bar";
import Game from "./src/components/Game/Game";
import { Screen, HeaderTitle } from "./src/components/Game/Game.styles";

export default function App() {
  return (
    <Screen>
      <StatusBar style="light" />
      <HeaderTitle>WORDLE</HeaderTitle>
      <Game />
    </Screen>
  );
}
