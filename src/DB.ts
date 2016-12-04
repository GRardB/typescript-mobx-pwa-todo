import Dexie from 'dexie';
import { action, autorun, intercept } from 'mobx';

import TodosStore from 'TodosStore';
import { TodoModel } from 'models';
import { getDeletedTodos, getTodos} from 'store-accessors';

const TODO_FIELDS = [
    '&id',
    'description',
    'isComplete',
    'timestamp',
].join(',');


export default class DB {
    private dataLoaded: Promise<any>;
    private db = new Dexie('TodosDatabase');
    private store = new TodosStore();

    constructor() {
        this.db.version(1).stores({
            todos: TODO_FIELDS,
        });

        this.dataLoaded = this.db.table('todos')
                                 .orderBy('timestamp')
                                 .toArray()
                                 .then(this.buildStore);

        autorun(() => {
            this.deleteDeletedTodos().putTodos();
        });
    }

    @action
    private buildStore = (todos) => {
        this.store.todos = todos.map(this.buildTodoModel);
    }

    private buildTodoModel = (todo) => new TodoModel(todo);

    private deleteDeletedTodos() {
        this.db.table('todos').bulkDelete(
            getDeletedTodos(this.store).map(todo => todo.id)
        );

        return this;
    }

    private putTodos() {
        this.db.table('todos').bulkPut(
            getTodos(this.store)
        );

        return this;
    }

    getStore() {
        return this.dataLoaded.then(() => this.store);
    }
}
