import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

import Label from './Label';

type Props = {
  children: string;
  onPress: () => void;
  testID?: string;
};

const StyledButton = styled(TouchableOpacity)`
  padding: 13px 40px;
  border-radius: 14px;
  background-color: ${props => props.theme.colors.secondary.yellow};
`;

const Button = ({children, onPress, testID}: Props) => (
  <StyledButton onPress={onPress} testID={testID}>
    <Label $textAlign="center" $color="white" $isBold>
      {children}
    </Label>
  </StyledButton>
);

export default Button;
