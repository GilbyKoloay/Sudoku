import { Provider } from 'react-redux';
import { ToastProvider } from 'react-native-toast-notifications';

import { text } from './styles';
import Navigation from './navigation';
import { store } from './redux';
import { colors } from './constants';

const App: React.FC = (): React.ReactNode => {
  return (
    <Provider store={store}>
      <ToastProvider
        placement='top'
        duration={4000}
        animationType='slide-in'
        animationDuration={200}
        successColor={colors.green}
        dangerColor={colors.red}
        normalColor={colors.neutral}
        textStyle={text.sm}
        offset={16}
        swipeEnabled={false}
      >
        <Navigation />
      </ToastProvider>
    </Provider>
  );
};

export default App;
