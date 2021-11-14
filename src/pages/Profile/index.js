import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./action";
import CollectionItem from "../../components/CollectionItem";
import NavigationArrow from "../../components/NavigationArrow";
import ProfileTop from "../../components/ProfileTop";

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
      return "Loading...";
    }

    if (albums.length === 0) {
      return "No albums";
    }

    return (
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {albums.map((album) => {
          return (
            <CollectionItem
              key={album.id}
              data={album}
              handleClick={handleClick}
            />
          );
        })}
      </section>
    );
  };

  const AlbumSection = () => {
    return (
      <section className="mt-10 mb-4">
        <h4
          className="font-bold uppercase mb-4"
          style={{ marginLeft: 16, marginRight: 16 }}
        >
          Albums
        </h4>
        <ListAlbums />
      </section>
    );
  };

  return (
    <>
      <NavigationArrow title={profile.name} />
      <div className="bg-white" style={{ marginTop: 55 }}>
        <ProfileTop data={profile} />
        <AlbumSection />
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
