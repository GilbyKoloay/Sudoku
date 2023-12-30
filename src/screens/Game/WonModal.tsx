import { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { useSelector } from 'react-redux';

import { Button } from '../../components';
import { colors } from '../../constants';
import { supabaseClient } from '../../helpers';
import { text } from '../../styles';
import { ReduxState } from '../../types';
import TextInput from './TextInput';

type Props = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  time: number;
  handleGoToLeaderboardOnPress: () => void;
};

const WonModal: React.FC<Props> = ({
  visible,
  setVisible,
  time,
  handleGoToLeaderboardOnPress,
}): React.ReactNode => {
  const { primaryColor, secondaryColor, gameMode } = useSelector(
    (state: ReduxState) => state.app,
  );
  const toast = useToast();
  const [username, setUsername] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  async function handleSubmitOnPress(): Promise<void> {
    setIsSubmitting(true);
    const submitToast = toast.show('Submitting ...', {duration: 8000});

    const res = await supabaseClient.from(`${gameMode}Leaderboard`).insert([
      {
        createdAt: new Date(),
        username: username ? username : null,
        time,
        note: note ? note : null,
      },
    ]);

    if (res) setIsSubmitting(false);

    if (res.status >= 200 && res.status <= 299) {
      setIsSubmitted(true);
      toast.update(submitToast, 'Submitting succeed', { type: 'success' });
    } else toast.update(submitToast, 'Submitting failed', { type: 'danger' });
  }

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
            Congratulations!
          </Text>

          <View style={{ marginTop: 16, gap: 8 }}>
            <Text
              style={[text.sm, { color: secondaryColor, textAlign: 'center' }]}
            >
              Enter your username and note to be shown in leaderboard.
            </Text>
            <View>
              <TextInput
                value={username}
                onChange={setUsername}
                placeholder='username'
                readOnly={isSubmitting || isSubmitted}
              />
            </View>
            <View>
              <TextInput
                value={note}
                onChange={setNote}
                placeholder='note'
                readOnly={isSubmitting || isSubmitted}
              />
            </View>
          </View>

          <View style={{ marginTop: 32, gap: 8 }}>
            {!isSubmitted ? (
              <Button
                onPress={handleSubmitOnPress}
                type='solid'
                size='md'
                disabled={!username || isSubmitting}
              >
                Submit
              </Button>
            ) : (
              <Button
                onPress={handleGoToLeaderboardOnPress}
                type='solid'
                size='md'
                disabled={isSubmitting}
              >
                Go to Leaderboard
              </Button>
            )}
            <Button onPress={closeModal} size='md' disabled={isSubmitting}>
              Close
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WonModal;
