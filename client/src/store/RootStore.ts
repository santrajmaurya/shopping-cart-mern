 import { UserStore } from './UserStore';
 import { CartStore } from './CartStore';
 import { ShopStore } from './ShopStore';

 export class RootStore {
     userStore: UserStore;
     cartStore: CartStore;
     shopStore: ShopStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.cartStore = new CartStore(this);
        this.shopStore = new ShopStore(this);
    }
}

 