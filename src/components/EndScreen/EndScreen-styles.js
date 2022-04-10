import styled from "styled-components/native";
import { colors } from "../../constants";
import { StyleSheet } from "react-native";

export const Title = styled.Text`
  font-size: 25px;
  color: white;
  text-align: center;
  margin-vertical: 20px;
`;
export const Subtitle = styled.Text`
    font-size:25px;
    color:white
    text-align:center;
    margin-vertical:15px;
    font-weight:bold;
`;

export const HeaderContainer = styled.View`
  justify-content: center;
  flex-direction: row;
  margin-bottom: 15px;
`;

export const StatisticsContainer = styled.View`
  align-items: center;
  margin: 12px;
`;

export const StatisticsTitle = styled.Text`
  color: ${colors.lightgrey};
  font-size: 30px;
  font-weight: bold;
`;

export const StatisticsNumbers = styled.Text`
  color: ${colors.lightgrey};
  font-size: 15px;
`;
export const DistributionText = styled.Text`
  color: ${colors.lightgrey};
  padding-left: 5px;
`;

export const DistributionArea = styled.View`
  background-color: ${colors.grey};
  margin: 5px;
  padding: 5px;
`;
export const DistributionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
  margin-top: 10px;
`;

export const Screen = styled.View`
  width: 95%;
  align-items: center;
`;

export const BottomAreaText = styled.Text`
  color: ${colors.lightgrey};
  font-size: 17px;
`;

export const TimeText = styled.Text`
  color: ${colors.lightgrey};
  font-size: 24px;
  font-weight: bold;
`;

export const TimeContainer = styled.View`
  align-items: center;
  flex: 1;
`;

export const BottomArea = styled.View`
  margin-top: 25px;
  flex-direction: row;
  padding: 5px;
`;

export const ShareButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${colors.primary};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const ShareButtonText = styled.Text`
  color: ${colors.lightgrey};
  font-weight: bold;
  font-size: 18px;
`;
