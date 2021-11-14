import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./action";
import CollectionItem from "../../components/CollectionItem";

const mapStateToProps = (state) => ({ ...state.collection });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

function Collection({ actions, dataCollection, dataUser, loading }) {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    actions.fetchCollection();
    actions.fetchUsers();
  }, []);

  useEffect(() => {
    if (dataCollection && dataUser) {
      let filtered = [];
      filtered = dataCollection.map((album) => {
        let equalUserId = (user) => user.id === album.userId;
        let userWithId = dataUser.find(equalUserId);
        return Object.assign({}, album, userWithId, { albumId: album.id });
      });
      setCollections(filtered);
    }
  }, [dataCollection, dataUser]);

  const handleClick = (item) => {
    console.log(`item`, item);
  };

  const ListCollection = () => {
    if (collections.length === 0) {
      return `No data collections`;
    }

    return (
      <div>
        {collections.map((collection) => {
          return (
            <CollectionItem
              key={collection.albumId}
              data={collection}
              handleClick={handleClick}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <ListCollection />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
