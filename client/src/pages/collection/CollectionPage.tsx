import React, { useContext } from "react";
import { Observer } from "mobx-react-lite";

import { RootStoreContext } from "../../App";
import CollectionItem from "../../components/collection-item/CollectionItem";
import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer
} from './CollectionPageStyles';

// import "./CollectionPage.scss";

interface CollectionPageProps {
  match: any,
}

const CollectionPage: React.FC<CollectionPageProps> = ({ match }) => {
  const { shopStore } = useContext(RootStoreContext);

  shopStore.selectCollection(match.params.collectionId);

  return (
    <Observer>
      {() => (
        <CollectionPageContainer>
          <CollectionTitle>{shopStore.selectedCollection.title}</CollectionTitle>
          <CollectionItemsContainer>
            {shopStore.selectedCollection.items.map((item: any) => (
              <CollectionItem key={item.id} item={item} />
            ))}
          </CollectionItemsContainer>
        </CollectionPageContainer>
      )}
    </Observer>
  );
};

export default CollectionPage;
