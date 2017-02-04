import { observable } from 'mobx';

export default class TodosStore {
    @observable todos = [];
}
