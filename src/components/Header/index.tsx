import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as classNames from 'classnames';

import TodosStore from 'TodosStore';
import { createBlankTodo } from 'store-accessors';

const styles = require('./header.scss');

export interface HeaderProps {
    store?: TodosStore;
}

@inject('store')
@observer
export class Header extends React.Component<HeaderProps, {}> {
    render() {
        return (
            <div className={classNames(styles.header)}>
                <div className={classNames(
                    styles.container,
                    styles.flex
                )}>
                    <h1 className={
                        classNames(styles.flex1, styles.brand)
                    }>
                        TypeScript Todo List
                    </h1>
                    <button onClick={this.createNewTodo}
                        className={classNames(
                            styles.bold,
                            styles.block,
                            styles.addTodoIcon
                        )}
                        title='Add todo item'>
                            +
                    </button>
                </div>
            </div>
        );
    }

    createNewTodo = () => {
        createBlankTodo(this.props.store);
    }
}
