import { TodoModel } from 'models';
import TodosStore from 'TodosStore';

export const addTodo = (store: TodosStore, todo: TodoModel) => {
    store.todos.push(todo);
};

export const createBlankTodo = (store: TodosStore) => {
    addTodo(store, new TodoModel());
};

export const getTodos = (store: TodosStore) => {
    return store.todos.filter(todo => !todo.isDeleted);
};

export const getDeletedTodos = (store: TodosStore) => {
    return store.todos.filter(todo => todo.isDeleted);
};
