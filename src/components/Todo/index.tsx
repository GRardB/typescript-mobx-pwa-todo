import * as React from 'react';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as classNames from 'classnames';

import { TodoModel } from 'models';

const styles = require('./todo.scss');

export interface TodoProps {
    todo: TodoModel;
}

@observer
export class Todo extends React.Component<TodoProps, {}> {
    @observable isEditing = true;

    componentWillMount() {
        const { description } = this.props.todo;

        if (description.length > 0) {
            this.disableEditing();
        }
    }

    render() {
        const {
            description,
            isComplete,
        } = this.props.todo;

        return (
            <div className={classNames(
                styles.flex,
                styles.todoItem
            )}>
                <Checkbox
                    description={description}
                    isComplete={isComplete}
                    onChange={this.toggleTodo} />
                {
                    this.isEditing ?
                        <input
                            autoFocus={true}
                            defaultValue={description}
                            onBlur={this.onBlurInput}
                            onKeyDown={this.onEditTodoDescription}
                            type='text' />
                    :
                        <TodoDescription
                            description={description}
                            isComplete={isComplete}
                            onClick={this.enableEditing} />
                }
                <DeleteButton onClick={this.deleteTodo} />
            </div>
        );
    }

    toggleTodo = () => {
        this.props.todo.toggleComplete();
    }

    onEditTodoDescription = ({ currentTarget: { value }, key }) => {
        if (key === 'Enter') this.updateTodoDescription(value);
    }

    onBlurInput = ({ currentTarget: { value } }) => {
        this.updateTodoDescription(value);
    }

    @action
    enableEditing = () => {
        this.isEditing = true;
    }

    @action
    disableEditing = () => {
        this.isEditing = false;
    }

    @action
    updateTodoDescription = (description: string) => {
        description = description.trim();

        if (description.length === 0) {
            this.props.todo.delete();
        } else {
            this.props.todo.setDescription(description);
            this.isEditing = false;
        }
    }

    deleteTodo = () => {
        this.props.todo.delete();
    }
}

const Checkbox = ({
    description,
    isComplete = false,
    onChange,
}) => (
    <label className={isComplete && styles.complete}>
        <span className={styles.srOnly}>
            Mark {description} complete
        </span>
        <input
            checked={isComplete}
            onChange={onChange}
            type='checkbox' />
    </label>
);

const TodoDescription = ({
    description,
    isComplete,
    onClick,
}) => (
    <span className={classNames(
        styles.flex1,
        styles.ellipsis,
        styles.description
    )} onClick={onClick}>
        {isComplete ? <del>{description}</del> : description}
    </span>
);

const DeleteButton = ({
    onClick
}) => (
    <button className={styles.deleteButton} onClick={onClick}>
        &times;
    </button>
);
