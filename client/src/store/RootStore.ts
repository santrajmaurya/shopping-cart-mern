 import { UserStore } from './UserStore';
 import { ShopStore } from './ShopStore';
 import { ProductStore } from './ProductStore';
 import UserApi from '../apis/UserApi';
 import ProductApi from '../apis/ProductApi';

 export class RootStore {
     userStore: UserStore;
     shopStore: ShopStore;
     productStore : ProductStore;
     userApi: UserApi;
     productApi: ProductApi;

    constructor() {
        this.userStore = new UserStore(this);
        this.shopStore = new ShopStore(this);
        this.productStore = new ProductStore(this);
        this.userApi = new UserApi();
        this.productApi = new ProductApi();
    }
}

 