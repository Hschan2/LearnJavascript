import { Provider } from 'react-redux';
import store from '../components/Store';
import Redux from './Redux';

const Count = () => {
    return (
        <Provider store={store}>
            <Redux />
        </Provider>
    );
};

export default Count;
