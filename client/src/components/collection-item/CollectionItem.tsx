import React, { useContext } from "react";
import { Observer } from "mobx-react-lite";

import { RootStoreContext } from "../../App";
import { IItem } from '../../utils/Types';
import "./CollectionItem.scss";
interface CollectionItemProps {
  item: IItem;
}

const CollectionItem: React.FC<CollectionItemProps> = ({ item }) => {
  const { cartStore } = useContext(RootStoreContext);

  const { name, price, imageUrl } = item;

  return (
    <Observer>
      {() => (
        <div className="collection-item">
          <div
            className="image"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="collection-footer">
            <span className="name">{name}</span>
            <span className="price">&#8377;{price}</span>
          </div>
          <button
            onClick={() => cartStore.addItem(item)}
            className="custom-button"
            type="submit"
          >
            Add to cart
          </button>
        </div>
      )}
    </Observer>
  );
};

export default CollectionItem;
