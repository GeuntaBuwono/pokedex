import {View} from 'react-native';
import styled from 'styled-components/native';

import Label from './Label';

type Size = 'lg' | 'md' | 'sm';

type StyledProps = {
  $bgColor: string;
  $size?: Size;
};

const sizeMapper: Record<Size, string> = {
  lg: '12px 8px',
  md: '10px 8px',
  sm: '5px 10px',
};

const StyledBadge = styled(View)<StyledProps>`
  background-color: ${
    /* istanbul ignore next */
    props => props.$bgColor || 'red'
  };
  border-radius: 25px;
  min-width: 75px;
  padding: ${props => sizeMapper[props.$size || 'md']};
`;

type Props = {
  label: string;
};

const Badge = ({$bgColor, label, $size}: Props & StyledProps) => (
  <StyledBadge $bgColor={$bgColor} $size={$size}>
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
