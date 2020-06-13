import { action, observable, computed } from "mobx";


import { RootStore } from "./RootStore";
import { ICollections, IShopData } from "../utils/Types";
export class ShopStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable.ref collectionsData: ICollections = {};
  @observable.ref selectedCollection: any = null;

  @action
  updateCollections = async (collectionsMap: ICollections) => {
    return (this.collectionsData = collectionsMap);
  };

  @action
  selectCollection = (collectionUrlParam: string) => {
    this.selectedCollection = this.collectionsData[collectionUrlParam];
  };

  @computed
  get collectionsMapData(): IShopData[] {
    return Object.keys(this.collectionsData).map(
      (key) => this.collectionsData[key]
    );
  }
}
