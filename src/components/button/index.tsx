import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux';
import { globalStyles } from '../../global';

type Props = TouchableOpacityProps & {
  children: React.ReactNode;
  onPress: () => void;
  type?: 'solid' | 'outline' | 'none';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
};

const Button: React.FC<Props> = ({
  children,
  onPress,
  type = 'none',
  size = 'sm',
  disabled = false,
}): React.JSX.Element => {
  const { primaryColor, secondaryColor } = useSelector(
    (state: RootState) => state.app,
  );

  return (
    <TouchableOpacity
      style={{
        height: size === 'lg' ? 56 : size === 'md' ? 40 : 28,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: type === 'solid' ? secondaryColor : primaryColor,
        borderWidth: type !== 'none' ? 1 : 0,
        borderColor: secondaryColor,
        borderRadius: 4,
      }}
      onPress={onPress}
      activeOpacity={0.4}
      disabled={disabled}
    >
      <Text
        style={[
          size === 'lg'
            ? globalStyles.textLg
            : size === 'md'
            ? globalStyles.textMd
            : globalStyles.textSm,
          {
            color: type === 'solid' ? primaryColor : secondaryColor,
          },
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
