import { observable, action } from 'mobx';

import { RootStore } from './RootStore';

interface UserType { 
    user: any
}

export class UserStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable currentUser: any = null;

    @action
    setCurrentUser = async (user: any) => {
         this.currentUser = await user;
    }
}