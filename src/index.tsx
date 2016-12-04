import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import { App } from 'components';
import DB from 'DB';

const db = new DB();

db.getStore().then((store) => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app')
    );
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log(`ServiceWorker successfully started: ${registration}`);
    }).catch((error) => {
        console.error(error);
    });
}
