import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./action";
import PhotoItem from "../../components/PhotoItem";
import NavigationArrow from "../../components/NavigationArrow";
import Modal from "../../components/Modal";

const mapStateToProps = (state) => ({ ...state.album });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

function Album({ actions, dataPhoto, loading, album }) {
  let params = useParams();
  const [photos, setPhotos] = useState([]);
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    actions.fetchAlbums(params.albumId);
  }, []);

  useEffect(() => {
    if (dataPhoto) {
      setPhotos(dataPhoto);
    }
  }, [dataPhoto]);

  const handleClick = (item) => {
    setOpen(true);
    setPhoto(item);
  };

  const PhotoList = () => {
    if (loading) {
      return "Loading...";
    }

    if (photos.length === 0) {
      return "No photos";
    }

    return (
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {photos.map((photo) => {
          return (
            <PhotoItem key={photo.id} data={photo} handleClick={handleClick} />
          );
        })}
      </section>
    );
  };

  return (
    <>
      <NavigationArrow title="Album" />
      <div className="bg-white pt-4" style={{ marginTop: 55 }}>
        <p
          className="text-lg mb-4"
          style={{ paddingLeft: 16, paddingRight: 16 }}
        >
          Album <span className="font-bold">{album.title}</span>
        </p>
        <PhotoList />
        {photo && (
          <Modal open={open} onClose={() => setOpen(false)} auto>
            <div className="flex justify-center w-full max-h-96">
              <div className="flex justify-center w-full">
                <img src={photo.url} alt={photo.id} className="h-full" />
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);
