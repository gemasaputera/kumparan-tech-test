import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
    actions.saveAlbum(item);
    navigate(`/album/${item.albumId}`);
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
