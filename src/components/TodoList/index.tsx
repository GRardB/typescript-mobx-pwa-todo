import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as classNames from 'classnames';

import TodosStore from 'TodosStore';
import { getTodos } from 'store-accessors';
import { Todo } from 'components';

const styles = require('./todo-list.scss');

export interface TodoListProps {
    store?: TodosStore;
}

@inject('store')
@observer
export class TodoList extends React.Component<TodoListProps, {}> {
    render() {
        return (
            <div className={classNames(styles.container, styles.flexCol)}>
                {
                    getTodos(this.props.store).map(todo => (
                        <Todo
                        key={todo.id}
                        todo={todo} />
                    ))
                }
            </div>
        );
    }
}
