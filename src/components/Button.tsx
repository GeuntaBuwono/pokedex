import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

import Label from './Label';

type Props = {
  children: string;
  onPress: () => void;
};

type ButtonStyle = {
  $bgColor?: string;
};

const StyledButton = styled(TouchableOpacity)<ButtonStyle>`
  padding: 13px 40px;
  border-radius: 14px;
  background-color: ${props =>
    props.$bgColor || props.theme.colors.secondary.yellow};
`;

const Button = ({children, onPress, $bgColor}: Props & ButtonStyle) => (
  <StyledButton onPress={onPress} $bgColor={$bgColor}>
    <Label $textAlign="center" $color="white" $isBold>
      {children}
    </Label>
  </StyledButton>
);

export default Button;
