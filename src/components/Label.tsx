import {Text} from 'react-native';
import styled from 'styled-components/native';

type LabelSize = 'xl' | 'lg' | 'md' | 'sm' | 'xm';

type Props = {
  children: string | Array<string> | number | Array<number>;
  $size?: LabelSize;
  $isBold?: boolean;
  $color?: string;
  $textTransform?: 'capitalize' | 'uppercase';
  $textAlign?: 'left' | 'center';
};

const fontsizeMapper: Record<LabelSize, string> = {
  xl: '36px',
  lg: '28px',
  md: '20px',
  sm: '16px',
  xm: '14px',
};

const LabelStyled = styled(Text)<Props>`
  font-family: 'Poppins-Regular';
  font-size: ${props => fontsizeMapper[props.$size || 'md']};
  color: ${props => props.$color || props.theme.colors.netural[500]};
  text-transform: ${props => props.$textTransform || 'none'};
  font-weight: ${props => (props.$isBold ? 'bold' : 'normal')};
  text-align: ${props => props.$textAlign || 'left'};
`;

const Label = ({
  children,
  $color,
  $size,
  $isBold,
  $textTransform,
  $textAlign,
}: Props) => {
  return (
    <LabelStyled
      $color={$color}
      $size={$size}
      $isBold={$isBold}
      $textAlign={$textAlign}
      $textTransform={$textTransform}>
      {children}
    </LabelStyled>
  );
};

export default Label;
