import { Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { Colors } from '../../constants';
import { globalStyles } from '../../global';
import { RootState } from '../../redux';

type Props = {
  children: string | React.ReactNode;
  onPress: () => void;
  type?: 'solid' | 'outline' | 'none';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
};

const Button: React.FC<Props> = ({
  children,
  onPress,
  size='sm',
  type='none',
  disabled=false
}): React.ReactNode => {
  const { primaryColor, secondaryColor } = useSelector(
    (state: RootState) => state.app
  );

  return (
    <TouchableOpacity
      style={{
        height: (size === 'lg') ? 56 : (size === 'md') ? 40 : 28,
        backgroundColor: (type === 'solid') ? secondaryColor : 'transparent',
        borderWidth: (type === 'none') ? 0 : 1,
        borderRadius: 4,
        borderColor: secondaryColor,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onPress={onPress}
      activeOpacity={(type === 'solid') ? 0.8 : 0.4}
      disabled={disabled}
    >
      {(typeof children === 'string') ? (
        <Text
          style={[
            (size === 'lg') ? globalStyles.textLg : (size === 'md') ? globalStyles.textMd : globalStyles.textSm, {
            color: disabled ? Colors.neutral : (type === 'solid') ? primaryColor : secondaryColor
          }]}
        >
          {children}
        </Text>
      ) : children}
    </TouchableOpacity>
  );
};

export default Button;
