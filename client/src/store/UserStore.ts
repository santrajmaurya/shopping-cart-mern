import { observable, runInAction, action } from 'mobx';

import { RootStore } from './RootStore';

interface UserType { 
    user: any
}

export class UserStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable user: any = [];
    @observable status: string = "initial";
    @observable isLogin: boolean = false;

    @action
    signUp = async (model:any) => {
        try {
            const response = await this.rootStore.userApi.signUp(model);
            if (response.status === 201) {
                runInAction(() => {
                    this.status = "success";
                })
            } 
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };

    @action
    login = async (model:any) => {
        try {
            const response = await this.rootStore.userApi.login(model);
            if (response.status === 201) {
                runInAction(() => {
                    this.status = "success";
                    this.isLogin = true;
                })
            } 
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };

    @action
    signOut = async () => {
        this.isLogin = false;
    }
}