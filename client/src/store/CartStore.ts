import { observable, action, computed, toJS, runInAction } from 'mobx';

import { RootStore } from './RootStore';
import DirectoryData from './DirectoryData';

import { addItemToCart, removeItemFromCart } from './CartUtils';
import { ICartItems, IDirectory } from "../utils/Types";
export class CartStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable hidden: boolean = true;
    @observable.ref cartItems: ICartItems[] = [];
    @observable.ref directoryData: IDirectory[] = DirectoryData;
    @observable addCartStatus: string = 'Initial';
    
    

    // @action
    // addToCart = async (item: any ) => {
    //     this.cartItems = await addItemToCart(this.cartItems, item);
    // }

    @action
    addToCart = async (model:any) => {
        try {
            const response = await this.rootStore.cartApi.addCart(model);
            if (response.ok) {
                runInAction(() => {
                    this.addCartStatus = "success";
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
    toggleCartIcon = () => {
        this.hidden = !this.hidden;
    }

    @action
    addItem = async (item: ICartItems ) => {
        this.cartItems = await addItemToCart(this.cartItems, item);
    }

    @action
    clearItemFromCart = async (item: ICartItems) => {
        this.cartItems = await this.cartItems.filter((cartItem: ICartItems) => 
            cartItem.id !== item.id
        );
    }

    @action
    removeItem = async (item: ICartItems) => {
        this.cartItems = await removeItemFromCart(this.cartItems, item);
    }

    @computed
    get directoryDataCollection(): IDirectory[] {
        return toJS(this.directoryData);
    }

    @computed
    get cartItemsData(): ICartItems[] {
        return toJS(this.cartItems);
    }

    @computed
    get itemCount(): number {
        return this.cartItems.reduce((accumalatedQuantity: number, cartItem: any) =>
            accumalatedQuantity + cartItem.quantity, 0
        );
    }

    @computed
    get totalCartCount(): number {
        return this.cartItems.reduce((accumalatedQuantity: number, cartItem: any) =>
            accumalatedQuantity + cartItem.quantity * cartItem.price, 0
        );
    }
}