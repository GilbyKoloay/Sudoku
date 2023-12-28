import { Modal, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Button } from '../../components';
import { colors } from '../../constants';
import { text } from '../../styles';
import { ReduxState } from '../../types';

type Props = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

const LostModal: React.FC<Props> = ({
  visible,
  setVisible
}): React.ReactNode => {
  const { primaryColor, secondaryColor } = useSelector(
    (state: ReduxState) => state.app,
  );

  function closeModal(): void {
    setVisible(false);
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType='fade'
      onRequestClose={closeModal}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 32,
        }}
      >
        <View
          style={{
            backgroundColor:
              primaryColor === colors.darkest ? colors.dark : colors.light,
            padding: 32,
            borderRadius: 8,
          }}
        >
          <Text
            style={[text.lg, { color: secondaryColor, textAlign: 'center' }]}
          >
            Ahh sad ...
          </Text>

          <View style={{ marginTop: 16, gap: 8 }}>
            <Text
              style={[text.sm, { color: secondaryColor, textAlign: 'center' }]}
            >
              You can cry in the corner.
            </Text>
          </View>

          <View style={{ marginTop: 32, gap: 8 }}>
            <Button onPress={closeModal} size='md' type='solid'>
              Close
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LostModal;
