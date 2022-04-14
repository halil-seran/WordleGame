import styled from "styled-components/native";
import { colors } from "../../constants";
import { StyleSheet } from "react-native";
import Animated, { SlideInDown, SlideInRight, ZoomIn } from "react-native-reanimated";

export const Map = styled.ScrollView`
  align-self: stretch;
  margin-top: 20px;
`;
export const Row = styled(Animated.View)`
  flex-direction: row;
  align-self: stretch;
  justify-content: center;
`;
export const Cell = styled.View`
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
export const CellLetter = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 48px;
`;
// white yerine colors.lightgrey olucak
export const Screen = styled.View`
  flex: 1;
  background: ${colors.black};
  align-items: center;
  padding-top: 40px;
`;
export const HeaderTitle = styled.Text`
  color: ${colors.lightgrey};
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 6px;
`;

export default StyleSheet.create({});
