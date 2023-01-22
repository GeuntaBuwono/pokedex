import styled from 'styled-components/native';

type ImageSize = 'lg' | 'md' | 'sm';

const imageSizeMapper: Record<ImageSize, string> = {
  lg: '300px',
  md: '50px',
  sm: '30px',
};

type Props = {
  size?: ImageSize;
};

const StyledImage = styled.Image<Props>`
  width: ${props => imageSizeMapper[props.size || 'md']};
  height: ${props => imageSizeMapper[props.size || 'md']};
`;

export default StyledImage;
