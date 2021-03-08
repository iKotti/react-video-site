import React, { Component } from "react";
import axios from "axios";
import VideoConsumer from "../context";
import Video from "./Video";
import AddComment from "./Forms/AddComment";
import Comment from "./Comment";

class VideoDetail extends Component {
  state = {
    id:"",
    name: "",
    link: "",
  };

  componentDidUpdate = async(prevState) => {
    const { slug } = this.props.match.params;
    if (slug !== prevState.match.params.slug) {
      const { slug } = this.props.match.params;
      const response = await axios.get(
        `http://localhost:3000/videos?slug=${slug}`
      );
  
      const { id, name, link } = response.data[0];
  
      this.setState({
        id,
        name,
        link,
      });
    }
  }

  componentDidMount = async () => {
    const { slug } = this.props.match.params;
    const response = await axios.get(
      `http://localhost:3000/videos?slug=${slug}`
    );

    const { id, name, link } = response.data[0];

    this.setState({
      id,
      name,
      link,
    });
  };

  render() {
    const { id, name, link } = this.state;

    return (
      <div className="m-4">
        <h4>{name}</h4>
        <hr />
        <iframe
          title={name}
          width="100%"
          height="700"
          src={`https://www.youtube.com/embed/${link}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="mt-4"
        ></iframe>
        <div className="row mt-4">
          <div className="col-lg-9">
            <AddComment id={id} />

            <div className="mt-4">
              <h3>Yorumlar</h3>
              <hr />

              <VideoConsumer>
                {(value) => {
                  const { comments } = value;
                  return (
                    <div className="row">
                      {comments.map((comment) => {
                        return (
                          comment.videoID === id ?
                          <div className="col-lg-12">
                            <Comment
                              key={id}
                              id = {comment.id}
                              name = {comment.name}
                              comment = {comment.comment}
                              time = {comment.time}
                            ></Comment>
                          </div>:
                          null
                        );
                      })}
                    </div>
                  );
                }}
              </VideoConsumer>
            </div>
          </div>
          <VideoConsumer>
            {(value) => {
              const { videos } = value;
              return (
                <div className="col-lg-3">
                  <h3>Diğer Videolar</h3>
                  <hr />
                  {videos.map((video) => {
                    return (
                      video.id !== id?
                      <Video
                        key={video.id}
                        id={video.id}
                        name={video.name}
                        image={video.image}
                        link={video.link}
                        slug={video.slug}
                        wishlist={video.wishlist}
                      ></Video>:
                      null
                    );
                  })}
                </div>
              );
            }}
          </VideoConsumer>
        </div>
      </div>
    );
  }
}
export default VideoDetail;
