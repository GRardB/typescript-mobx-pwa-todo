import { observable, useStrict } from 'mobx';

useStrict(true);

export default class TodosStore {
    @observable todos = [];
}
