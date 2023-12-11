import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux';

type Props = TouchableOpacityProps & {
  children: React.ReactNode,
  onPress: () => void,
  type?: 'solid' | 'outline',
  useFullWidth?: boolean,
  disabled?: boolean
}

const Button: React.FC<Props> = ({
  children,
  onPress,
  type='solid',
  useFullWidth=true,
  disabled=false
}): React.JSX.Element => {
  const { primaryColor, secondaryColor } = useSelector((state: RootState) => state.app);

  return (
    <TouchableOpacity
      style={{
        width: (useFullWidth) ? '100%' : 'auto',
        backgroundColor: (type === 'solid') ? secondaryColor : primaryColor,
        borderWidth: 1,
        borderColor: secondaryColor,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4
      }}
      onPress={onPress}
      activeOpacity={0.4}
      disabled={disabled}
    >
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 16,
          color: (type === 'solid') ? primaryColor : secondaryColor,
          textAlign: 'center'
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
