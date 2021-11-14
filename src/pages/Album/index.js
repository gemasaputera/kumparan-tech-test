import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./action";

const mapStateToProps = (state) => ({ ...state.album });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

function Album({ actions, dataPhoto, loading, album }) {
  let params = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    actions.fetchAlbums(params.albumId);
  }, []);

  useEffect(() => {
    if (dataPhoto) {
      setPhotos(dataPhoto);
    }
  }, [dataPhoto]);

  const PhotoList = () => {
    if (loading) {
      return "Loading nich...";
    }

    if (photos.length === 0) {
      return "No photos";
    }

    return (
      <section className="grid grid-cols-3 gap-4">
        {photos.map((photo) => {
          return (
            <div
              key={photo.id}
              className="p-4 border rounded text-center cursor-pointer hover:bg-gray-100"
            >
              <img src={photo.thumbnailUrl} alt={photo.thumbnailUrl} />
            </div>
          );
        })}
      </section>
    );
  };

  return (
    <div>
      <p>
        Album <span className="font-bold">{album.title}</span>
      </p>
      <PhotoList />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);
