import React, { Component } from "react";
import VideoConsumer from "../../context";
import shortid from "shortid";
import axios from "axios";
import alertify from "alertifyjs";

export default class AddComment extends Component {
  state = { name: "", comment: "" };

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addComment = async (dispatch, e) => {
    e.preventDefault();
    const { id } = this.props;
    const { name, comment } = this.state;

    var today = new Date()

    const newComment = {
      id: shortid.generate(),
      name,
      comment,
      videoID: id,
      time: today.getHours() + ':' + today.getMinutes()
    };

    if (name === "" || comment === "") {
      alertify.error("Lütfen gerekli alanları doldurunuz");
    } else {
      const response = await axios.post(
        "http://localhost:3000/comments",
        newComment
      );
      this.setState({name:"",comment:""})
      dispatch({ type: "ADD_COMMENT", payload: response.data });
      alertify.success("Yorumun için teşekkürler " + name + "!");
    }
  };

  render() {
    const { name, comment } = this.state;
    return (
      <div>
        <h3>Yorum Yap</h3>
        <hr />
        <VideoConsumer>
          {(value) => {
            const { dispatch } = value;
            return (
              <div>
                <form onSubmit={this.addComment.bind(this, dispatch)}>
                  <div className="formGroup">
                    <label htmlFor="name"> İsim </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="İsminizi giriniz..."
                      value={name}
                      onChange={this.changeInput}
                    ></input>
                  </div>
                  <div className="formGroup mt-4">
                    <label htmlFor="comment"> Yorum </label>
                    <textarea
                      name="comment"
                      className="form-control"
                      placeholder="Yorumunuzu giriniz..."
                      rows="10"
                      value={comment}
                      onChange={this.changeInput}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success btn-block mt-4 font-weight-bold"
                  >
                    <h5>YORUM YAP</h5>
                  </button>
                </form>
              </div>
            );
          }}
        </VideoConsumer>
      </div>
    );
  }
}
