import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./action";

const mapStateToProps = (state) => ({ ...state.profile });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

function Profile({ actions, dataAlbum, profile, loading }) {
  let params = useParams();
  let navigate = useNavigate();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    actions.fetchUserAlbum(params.userId);
  }, []);

  useEffect(() => {
    if (dataAlbum) {
      setAlbums(dataAlbum);
    }
  }, [dataAlbum]);

  const handleClick = (album) => {
    actions.saveAlbum(album);
    navigate(`/album/${album.id}`);
  };

  const ListAlbums = () => {
    if (loading) {
      return "Loading nich...";
    }

    if (albums.length === 0) {
      return "No albums";
    }

    return (
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {albums.map((album) => {
          return (
            <div
              key={album.id}
              className="p-4 border rounded text-center cursor-pointer hover:bg-gray-100"
              onClick={() => handleClick(album)}
            >
              <p>{album.title}</p>
            </div>
          );
        })}
      </section>
    );
  };

  const AlbumSection = () => {
    return (
      <section className="mt-10 mb-4">
        <h4 className="font-bold uppercase">Albums</h4>
        <ListAlbums />
      </section>
    );
  };

  return (
    <div>
      <p className="font-bold text-2xl">{profile.name}</p>
      <span>{profile.username}</span>
      <p>{profile.email}</p>
      <p>{profile.phone}</p>
      <AlbumSection />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
