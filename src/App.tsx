import { Provider } from 'react-redux';

import Navigation from './navigation';
import { store } from './redux';

const App: React.FC = (): React.ReactNode => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
