import { observable, runInAction, action, computed } from 'mobx';

import { RootStore } from './RootStore';

interface UserType { 
    user: any
}

export class UserStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable.ref user: any = [];
    @observable signInStatus: string = "initial";
    @observable signUpStatus: string = "initial";
    @observable addCartStatus: string = 'Initial';
    @observable status: string = 'Initial';
    @observable checkIfSignIn: boolean = false;
    @observable userId: any = '';
    @observable token: any = '';
    @observable.ref userCart: any = [];
    

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
                    this.token = response.token;
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
    getUserDetails = async (userId: any) => {
        try {
            const response = await this.rootStore.userApi.getUser(userId);
            if (response) {
                runInAction(() => {
                    this.status = "success";
                    this.user = response.user;
                    this.userCart = response.user.carts;
                    this.checkIfSignIn = true;
                })
            } else {
                this.status = "error";
            }
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };

    @action
    signOut = () => {
        this.checkIfSignIn = false;
        this.userCart = [];
    }

    @action
    addToCart = async (model:any) => {
        try {
            const response = await this.rootStore.userApi.addCart(model);
            if (response.user) {
                runInAction(() => {
                    this.addCartStatus = "success";
                     this.user = response.user;
                     this.userCart = response.user.carts;
                })
            } else {
                this.addCartStatus = "error";
            }
        } catch (error) {
            runInAction(() => {
                this.addCartStatus = "error";
            });
        }
    };

    @action
    removeItem = async (productId:any, userId: any) => {
        try {
            const response = await this.rootStore.userApi.removeItemFromCart(productId, userId);
            if (response.user) {
                runInAction(() => {
                    this.status = "success";
                     this.user = response.user;
                     this.userCart = response.user.carts;
                })
            } else {
                this.status = "error";
            }
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };

    @action
    decreaseItem = async (productId: any, userId: any) => {
        try {
            const response = await this.rootStore.userApi.decreaseItemInCart(productId, userId);
            if (response.user) {
                runInAction(() => {
                    this.status = "success";
                     this.user = response.user;
                     this.userCart = response.user.carts;
                })
            } else {
                this.status = "error";
            }
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };

    @computed
    get itemCount(): number {
        return this.userCart.reduce((accumalatedQuantity: number, cartItem: any) =>
            accumalatedQuantity + cartItem.quantity, 0
        );
    }

    @computed
    get totalCartCount(): number {
        return this.userCart.reduce((accumalatedQuantity: number, cartItem: any) =>
            accumalatedQuantity + cartItem.quantity * cartItem.price, 0
        );
    }
}