import React, { useContext } from "react";
import { Observer } from "mobx-react-lite";

import MenuItem from "../menu-item/MenuItem";
import { RootStoreContext } from "../../App";
import { IDirectory } from '../../utils/Types';
import "./Directory.scss";

interface DirectoryProps {
  title?: string;
  imageUrl?: string;
  id?: number;
  linkUrl?: string;
}

const Directory: React.FC<DirectoryProps> = () => {
  const { cartStore } = useContext(RootStoreContext);
  const directoryDataCollection = cartStore.directoryDataCollection;

  return (
    <Observer>
      {() => (
        <div className="directory-menu">
          {directoryDataCollection.map((item: IDirectory) => {
            return (
              <MenuItem
                key={item.id}
                title={item.title}
                imageUrl={item.imageUrl}
                linkUrl={item.linkUrl}
              />
            );
          })}
        </div>
      )}
    </Observer>
  );
};
export default Directory;
