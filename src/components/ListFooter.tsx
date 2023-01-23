import {TouchableOpacity} from 'react-native';

import Label from './Label';

const ListFooter = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Label $textAlign="center" $isBold>
        Load More ...
      </Label>
    </TouchableOpacity>
  );
};

export default ListFooter;
