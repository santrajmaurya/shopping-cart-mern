 import { UserStore } from './UserStore';
 import { CartStore } from './CartStore';
 import { ShopStore } from './ShopStore';
 import UserApi from '../apis/UserApi';

 export class RootStore {
     userStore: UserStore;
     cartStore: CartStore;
     shopStore: ShopStore;
     userApi: UserApi;

    constructor() {
        this.userStore = new UserStore(this);
        this.cartStore = new CartStore(this);
        this.shopStore = new ShopStore(this);
        this.userApi = new UserApi();

    }
}

 