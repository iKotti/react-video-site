import React, { Component } from "react";
import axios from "axios";

const VideoContext = React.createContext();

//Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_VIDEO":
      return {
        ...state,
        videos: [...state.videos, action.payload],
      };

    case "CHANGE_WISHLIST":
      return {
        ...state,
        videos: state.videos.map((video) =>
          video.id === action.payload.id ? action.payload : video
        ),
      };
    case "DELETE_VIDEO":
      return {
        ...state,
        videos: state.videos.filter((video) => action.payload !== video.id),
      };
    case "ADD_COMMENT":
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case "DELETE_COMMENT":
      return{
        ...state,
        comments: state.comments.filter((comment=> action.payload !== comment.id))
      }

    default:
      return state;
  }
};

//VideoProvider
export class VideoProvider extends Component {
  //Blank state and dispatch
  state = {
    videos: [],
    comments: [],
    dispatch: (action) => {
      this.setState((state) => reducer(state, action));
    },
  };

  //API
  componentDidMount = async () => {
    const response = await axios.get("http://localhost:3000/videos");
    this.setState({ videos: response.data });

    const responseComment = await axios.get("http://localhost:3000/comments");
    this.setState({ comments: responseComment.data });
  };

  render() {
    const { children } = this.props;
    return (
      <VideoContext.Provider value={this.state}>
        {children}
      </VideoContext.Provider>
    );
  }
}

const VideoConsumer = VideoContext.Consumer;
export default VideoConsumer;
