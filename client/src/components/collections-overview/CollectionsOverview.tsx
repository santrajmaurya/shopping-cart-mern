import React, { useContext } from "react";
import { Observer } from "mobx-react-lite";

import { RootStoreContext } from "../../App";
import CollectionPreview from './../../components/collection-preview/CollectionPreview';
import { IItem } from '../../utils/Types';

import "./CollectionsOverview.scss";
interface IShopData {
  id: number | string;
  items: IItem[];
  routeName: string;
  title: string;
}
const CollectionsOverview: React.FC = () => {
  const { shopStore } = useContext(RootStoreContext);

  return (
    <Observer>
      {() => (
        <div className="collections-overview">
          {shopStore.collectionsMapData.map((item: IShopData) => {
            return (
              <CollectionPreview
                key={item.id}
                id={item.id}
                title={item.title}
                routeName={item.routeName}
                items={item.items}
              />
            );
          })}
        </div>
      )}
    </Observer>
  );
};

export default CollectionsOverview;
