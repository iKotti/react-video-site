import React, { Component } from "react";
import VideoConsumer from "../context";
import axios from "axios"
import alertify from "alertifyjs"

export default class Comment extends Component {
    //deleteComment
    deleteComment = async (dispatch,e) =>{
        e.preventDefault()
        const {id} = this.props;
        await axios.delete(`http://localhost:3000/comments/${id}`)
        dispatch({type:"DELETE_COMMENT",payload : id})
        alertify.success("Yorumunuz silindi")
    }

  render() {
    const { name, comment, time } = this.props;
    return (
      <div>
        <VideoConsumer>
          {(value) => {
            const { dispatch } = value;
            return (
              <div className="mt-4 rounded-lg border p-2 rounded">
                <span className="float-right">{time}</span>
                <span className="float-right mr-2">
                  <a
                    href="/#"
                    onClick={this.deleteComment.bind(this, dispatch)}
                  >
                    <i className="fa fa-trash text-danger"></i>
                  </a>
                </span>
                <h5 className=" font-weight-bold ">
                  <i className="fa fa-user"></i> {name}
                </h5>
                
                <h5>
                  <i className="fa fa-comment"></i> {comment}
                </h5>
              </div>
            );
          }}
        </VideoConsumer>
      </div>
    );
  }
}
