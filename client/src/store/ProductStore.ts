import { observable, runInAction, action, toJS, computed } from 'mobx';

import { RootStore } from './RootStore';

export class ProductStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable products: any = [];
    @observable status: string = "initial";
    

    @action
    addProduct = async (model:any) => {
        try {
            const response = await this.rootStore.productApi.addProduct(model);
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
    getAdminProducts = async () => {
        debugger
        try {
            const response = await this.rootStore.productApi.getAdminProducts();
            console.log('res', toJS(response.products));
            if (response) {
                runInAction(() => {
                    this.status = "success";
                    this.products = toJS(response.products);
                })
            } 
           ;
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };

    @action
    deleteAdminProducts = async (id: any) => {
        debugger
        try {
            const response = await this.rootStore.productApi.deleteProduct(id);
            if (response) {
                runInAction(() => {
                    this.status = "success";
                })
            } 
           ;
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };

    @action
    editAdminProducts = async (id: any) => {
        debugger
        try {
            const response = await this.rootStore.productApi.editProduct(id);
            if (response) {
                runInAction(() => {
                    this.status = "success";
                })
            } 
           ;
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };

    @computed
    get productsList(): any {
        return toJS(this.products);
    }

}