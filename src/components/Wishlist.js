import React, { Component } from "react";
import VideoConsumer from "../context";
import Video from "./Video";

export default class Wishlist extends Component {
  render() {
    return (
      <div className="m-4">
        <h4>Beğendiklerim</h4>
        <hr />
        <VideoConsumer>
          {(value) => {
            const { videos } = value;
            return (
              <div className="row">
                {videos.map((video) => {
                  return (
                    video.wishlist === true ?
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
                    </div>:
                   null
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
