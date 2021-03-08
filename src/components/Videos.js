import React, { Component } from "react";
import VideoConsumer from "../context";
import Video from "./Video";

class Videos extends Component {
  render() {
    return (
      <div className="m-4">
        <h4>Videolar</h4>
        <hr />
        <VideoConsumer>
          {(value) => {
            const { videos } = value;
            return (
              <div className="row">
                {videos.map((video) => {
                  return (
                    <div className="col-lg-3">
                      <Video
                        key={video.id}
                        id={video.id}
                        name={video.name}
                        image={video.image}
                        link={video.link}
                        slug={video.slug}
                        wishlist={video.wishlist}
                      ></Video>
                    </div>
                  );
                })}
              </div>
            );
          }}
        </VideoConsumer>
      </div>
    );
  }
}
export default Videos;
