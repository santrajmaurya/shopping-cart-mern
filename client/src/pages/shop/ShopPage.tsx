import React, { useEffect, useContext, useState } from "react";
import { Route } from "react-router-dom";
import { Observer } from "mobx-react-lite";

import CollectionsOverview from "../../components/collections-overview/CollectionsOverview";
import CollectionPage from "../../pages/collection/CollectionPage";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { RootStoreContext } from "../../App";
import WithSpinner from "../../components/with-spinner/WithSpinner";

interface ShopPageProps {
  match: any;
}

const CollectionOverwiewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage: React.FC<ShopPageProps> = ({ match }) => {
  const { shopStore } = useContext(RootStoreContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collectionRef = firestore.collection("collections");
    collectionRef.onSnapshot(async (snapshot: any) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      shopStore.updateCollections(collectionsMap);
      setLoading(false);
    });
  }, [shopStore]);

  return (
    <Observer>
      {() => (
        <div style={{margin: '0 10px'}}>
          <Route
            exact
            path={`${match.path}`}
            render={(props) => (
              <CollectionOverwiewWithSpinner isLoading={loading} {...props} />
            )}
          />
          <Route
            path={`${match.path}/:collectionId`}
            render={(props) => (
              <CollectionPageWithSpinner isLoading={loading} {...props} />
            )}
          />
        </div>
      )}
    </Observer>
  );
};
export default ShopPage;
