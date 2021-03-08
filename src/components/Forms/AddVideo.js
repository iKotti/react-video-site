import React, { Component } from "react";
import UserConsumer from "../../context.js";
import axios from "axios";
import alertify from "alertifyjs";
import getYouTubeID from "get-youtube-id";
import shortid from "shortid";

class AddVideo extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      image: "",
      link: "",
    };
  }

  //changeInput
  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  
  //setVideoInfo
  setVideoInfo = () =>{
    const { name, link } = this.state;
    const slugify = require("slugify");
    const newVideo = {
      id: shortid.generate(),
      name,
      image: `https://img.youtube.com/vi/${getYouTubeID(link)}/0.jpg`,
      slug: slugify(name, {
        replacement: "-",
        lower: true,
        strict: true,
      }),
      link: getYouTubeID(link),
      wishlist: false,
    };

    return newVideo;
  }

  //videoControl
  videoControl = async(dispatch) =>{
    const { name, link } = this.state;
    var newVideo = this.setVideoInfo();

    if (link === "" || name === "") {
      alertify.error("Lütfen gerekli alanları doldurunuz.");
    } else if (getYouTubeID(link) == null) {
      alertify.error("Youtube linki geçersiz.");
    } else {
      const response = await axios.post(
        "http://localhost:3000/videos",
        newVideo
      );
      dispatch({ type: "ADD_VIDEO", payload: response.data });
      this.setState({ name: "", link: "" });
      alertify.success("Video başarıyla eklendi");
    }
  }

  //addVideo
  addVideo = async (dispatch, e) => {
    e.preventDefault();
    this.videoControl(dispatch)
  };

  render() {
    const { name, link } = this.state;
    return (
      <UserConsumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="m-4">
              <h4>Video Ekle</h4>
              <hr />
              <div className="row">
                <div className="col-lg-6">
                  <form
                    id="add-video-form"
                    className="form-control border-0"
                    onSubmit={this.addVideo.bind(this, dispatch)}
                  >
                    <div className="form-group">
                      <label htmlFor="name">Video Adı</label>
                      <input
                        name="name"
                        className="form-control"
                        type="text"
                        placeholder="Video adını giriniz..."
                        value={name}
                        onChange={this.changeInput}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="link"> Video Linki (Youtube) </label>
                      <input
                        type="text"
                        name="link"
                        className="form-control"
                        value={link}
                        onChange={this.changeInput}
                        placeholder="Youtube video linkini giriniz..."
                      />
                    </div>

                    <button type="submit" className="btn btn-success btn-block">
                      EKLE
                    </button>
                  </form>
                </div>
              </div>
            </div>
          );
        }}
      </UserConsumer>
    );
  }
}
export default AddVideo;
