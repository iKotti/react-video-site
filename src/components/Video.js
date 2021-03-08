import axios from "axios";
import React, { Component } from "react";
import VideoConsumer from "../context";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";

//Max video name limit
const MAX_LENGTH = 30;

class Video extends Component {
  state = {
    id: "",
    name: "",
    link: "",
    image: "",
    wishlist: "",
    slug: "",
  };

  //Change Wish List
  changeWishList = async (dispatch, e) => {
    e.preventDefault();
    const { id } = this.props;
    console.log(id)
    const video = await axios.get(`http://localhost:3000/videos/${id}`);
    const wishlist = !video.data.wishlist;

    const wishlistVideo = {
      id: video.data.id,
      name: video.data.name,
      link: video.data.link,
      image: video.data.image,
      slug: video.data.slug,
      wishlist: wishlist,
    };

    const response = await axios.put(
      `http://localhost:3000/videos/${id}`,
      wishlistVideo
    );
    dispatch({ type: "CHANGE_WISHLIST", payload: response.data });

    wishlist === true
      ? alertify.success("Video Beğenildi")
      : alertify.error("Beğeniden Çıkarıldı");
  };

  //onDeleteVideo
  onDeleteVideo = async (dispatch,id, e) => {
    const videoID = id.id;
    
    await axios.delete(`http://localhost:3000/videos/${videoID}`)

    dispatch({ type: "DELETE_VIDEO", payload: videoID });
    alertify.success("Video silindi.")
  };

  render() {
    const { id,name, image, slug, wishlist } = this.props;
    return (
      <VideoConsumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div>
              <div className="card mb-4">
                <Link to={`/${slug}`} alt={name}>
                  <img className="card-img-top" src={image} alt="Card" />
                </Link>
                <div className="card-body p-2 mt-2">
                  <div className="row">
                    <Link to={`${slug}`} alt={name}>
                      <div className="pl-3 pr-3 card-text float-left">
                        {name.length > MAX_LENGTH ? (
                          <div>{`${name.substring(0, MAX_LENGTH)}...`}</div>
                        ) : (
                          <div>{name}</div>
                        )}
                      </div>
                    </Link>
                  </div>
                  <div className="interaction">
                    <div className="float-right ml-2 mt-2">
                      <a href="/#">
                        <i
                          className="fa fa-trash mr-3"
                          data-toggle="modal"
                          data-target={`#${id}`}
                        ></i>
                      </a>
                      <a
                        href="/#"
                        name="wishList"
                        onClick={this.changeWishList.bind(this, dispatch)}
                      >
                        {wishlist !== true ? (
                          <i className="far fa-heart"></i>
                        ) : (
                          <i className="fa fa-heart"></i>
                        )}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              
              <div
                className="modal fade"
                id={id}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="deleteModal"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Emin misin?
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      Video silinecek. Bu işlem geri alınamaz.
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        İptal
                      </button>
                      <button
                        type="button"
                        id={id}
                        className="btn btn-danger"
                        data-dismiss="modal"
                        name="delete"
                        onClick={this.onDeleteVideo.bind(this, dispatch,{id})}
                      >
                        <i className="fa fa-trash mr-2"></i>Sil
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </VideoConsumer>
    );
  }
}

export default Video;
