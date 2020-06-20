import { observable, runInAction, action, toJS, computed } from 'mobx';

import { RootStore } from './RootStore';

export class ProductStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable products: any = [];
    @observable status: string = "initial";
    @observable editStatus: string = "initial";
    @observable addProductStatus: string = "initial";
    @observable deleteProductStatus: string = "initial";
    
    

    @action
    addProduct = async (model:any) => {
        try {
            const response = await this.rootStore.productApi.addProduct(model);
            if (response.ok) {
                runInAction(() => {
                    this.addProductStatus = "success";
                })
            } else {
                this.addProductStatus = "error";
            }
        } catch (error) {
            runInAction(() => {
                this.addProductStatus = "error";
            });
        }
    };

    @action
    getAdminProducts = async () => {
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
            if (response.ok) {
                runInAction(() => {
                    return this.deleteProductStatus = "success";
                })
            } else {
                this.deleteProductStatus = "error";
            }
        } catch (error) {
            runInAction(() => {
                this.deleteProductStatus = "error";
            });
        }
    };

    @action
    editAdminProducts = async (model: any, productId: string) => {
        debugger
        try {
            const response = await this.rootStore.productApi.editProduct(model, productId);
            if (response.status === 200) {
                runInAction(() => {
                    this.editStatus = "success";
                })
            } 
           ;
        } catch (error) {
            runInAction(() => {
                this.editStatus = "error";
            });
        }
    };

    @computed
    get productsList(): any {
        return toJS(this.products);
    }

}