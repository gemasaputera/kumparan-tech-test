import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./action";

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
            <div
              key={collection.albumId}
              className="cursor-pointer"
              onClick={() => handleClick(collection)}
            >
              <div
                className="bg-white hover:bg-gray-100 flex flex-col border p-5 mb-1"
                style={{ height: 205 }}
              >
                <div className="flex justify-center items-center flex-1 ">
                  <span className="font-bold text-2xl text-center">
                    {collection.title}
                  </span>
                </div>
                <div>
                  <span className="font-bold mr-2 text-sm hover:underline">
                    {collection.name}
                  </span>
                </div>
              </div>
            </div>
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
