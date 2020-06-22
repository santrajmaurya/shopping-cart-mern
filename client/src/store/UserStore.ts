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
    @observable signInStatus: string = "initial";
    @observable signUpStatus: string = "initial";
    @observable isLogin: boolean = false;
    @observable userId: string = '';

    @action
    signUp = async (model:any) => {
        try {
            const response = await this.rootStore.userApi.signUp(model);
            if (response.status === 201) {
                runInAction(() => {
                    this.signUpStatus = "success";
                })
            } else {
                 this.signUpStatus = "error";
            }
        } catch (error) {
            runInAction(() => {
                this.signUpStatus = "error";
            });
        }
    };
   
    @action
    login = async (model:any) => {
        try {
            const response = await this.rootStore.userApi.login(model);
            if (response) {
                runInAction(() => {
                    this.signInStatus = "success";
                    this.userId = response.user.id;
                    this.isLogin = true;
                })
            } else {
                this.signInStatus = "error";
            }
        } catch (error) {
            runInAction(() => {
                this.signInStatus = "error";
            });
        }
    };

    @action
    signOut = async () => {
        this.isLogin = false;
    }
}