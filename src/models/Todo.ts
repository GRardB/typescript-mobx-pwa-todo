import * as uuid from 'node-uuid';
import { action, observable } from 'mobx';

export class TodoModel {
    id: string;
    timestamp: Number;

    @observable description: string;
    @observable isComplete: boolean;
    @observable isDeleted: boolean;

    constructor({ id = null, description = '', isComplete = false, timestamp = null } = {}) {
        this.id = id ? id : uuid.v4();
        this.timestamp = timestamp ? timestamp : new Date().getTime();

        this.description = description;
        this.isComplete = isComplete;
        this.isDeleted = false;
    }

    @action
    setDescription(description: string) {
        this.description = description;
    }

    @action toggleComplete() {
        this.isComplete = !this.isComplete;
    }

    @action delete() {
        this.isDeleted = true;
    }
}
