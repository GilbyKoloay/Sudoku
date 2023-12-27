import { TextInput as RNTextInput } from 'react-native';
import { useSelector } from 'react-redux';

import { colors } from '../../constants';
import { text } from '../../styles';
import { ReduxState } from '../../types';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
};

const TextInput: React.FC<Props> = ({
  value = '',
  onChange,
  placeholder = '',
  readOnly = false,
}): React.ReactNode => {
  const { secondaryColor } = useSelector((state: ReduxState) => state.app);

  return (
    <RNTextInput
      style={[
        text.sm,
        {
          height: 40,
          borderWidth: 1,
          borderRadius: 4,
          borderColor: secondaryColor,
          color: secondaryColor,
          textAlign: 'center',
        },
      ]}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor={colors.neutral}
      readOnly={readOnly}
    />
  );
};

export default TextInput;
