import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { Header, TodoList } from 'components';

@inject('store')
@observer
export class App extends React.Component<any, {}> {
    render() {
        return (
            <div>
                <Header />
                <TodoList />
            </div>
        );
    }
}
