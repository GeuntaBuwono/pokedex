import {View} from 'react-native';
import styled from 'styled-components/native';

import Label from './Label';

type StyledProps = {
  $bgColor: string;
};

const StyledBadge = styled(View)<StyledProps>`
  background-color: ${
    /* istanbul ignore next */
    props => props.$bgColor || 'red'
  };
  border-radius: 25px;
  min-width: 75px;
  padding: 10px 8px;
`;

type Props = {
  label: string;
};

const Badge = ({$bgColor, label}: Props & StyledProps) => (
  <StyledBadge $bgColor={$bgColor}>
    <Label
      $isBold
      $color="white"
      $size="sm"
      $textAlign="center"
      $textTransform="capitalize">
      {label}
    </Label>
  </StyledBadge>
);

export default Badge;
