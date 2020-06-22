 import { UserStore } from './UserStore';
 import { CartStore } from './CartStore';
 import { ShopStore } from './ShopStore';
 import { ProductStore } from './ProductStore';
 import UserApi from '../apis/UserApi';
 import ProductApi from '../apis/ProductApi';
 import CartApi from '../apis/CartApi';

 export class RootStore {
     userStore: UserStore;
     cartStore: CartStore;
     shopStore: ShopStore;
     productStore : ProductStore;
     userApi: UserApi;
     productApi: ProductApi;
     cartApi: CartApi;

    constructor() {
        this.userStore = new UserStore(this);
        this.cartStore = new CartStore(this);
        this.shopStore = new ShopStore(this);
        this.productStore = new ProductStore(this);
        this.userApi = new UserApi();
        this.productApi = new ProductApi();
        this.cartApi = new CartApi();
    }
}

 