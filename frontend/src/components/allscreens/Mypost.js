import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import CircularJSON from "circular-json";
import Swal from "sweetalert2";
let c = 0;
const Home = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [postno, setPostNo] = useState("0");
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [bio, setBio] = useState("");
  const [newusername, setNewUsername] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [accounttype, setAccounttype] = useState("");
  const [dp, setDp] = useState("");
  useEffect(() => {
    fetch("http://localhost:4000/finaluser", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        console.log(result.user.bio);
        setBio(result.user.bio);
        setDp(result.user.dp);
        setAccounttype(result.user.accounttype);
        setNewUsername(result.user.username);
        setFollowers(result.user.followers.length);
        setFollowing(result.user.following.length);
        document.title = `${result.user.username} | myInsta`;
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:4000/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.myPost);
        console.log(data.length);
        setPostNo(result.myPost.length);
        setLoading(true);
      });
  }, []);

  const likePost = (id) => {
    fetch("http://localhost:4000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        c = 0;
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const unlikePost = (id) => {
    c = 0;
    fetch("http://localhost:4000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const makeComment = (text, postId) => {
    fetch("http://localhost:4000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          return Swal.fire("Error", `${result.error}`, "error");
        }
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
        Swal.fire("Commented", "Comment Posted!", "success");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const deletePost = (postId) => {
    fetch("http://localhost:4000/deletepost/" + postId, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
        history.push("/profile");
        window.location.reload();
      });
  };
  return (
    <div className="navfix mypost">
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
        }}
      >
        <img className="dp" src={dp} style={{ marginTop: "4%" }}></img>

        <div>
          <h4>{newusername}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <p>
              {data === "No Posts Yet" ? (
                <strong>0 </strong>
              ) : (
                <strong>{postno} </strong>
              )}
              posts &nbsp;&nbsp;
            </p>

            {followers === 0 ? (
              <p>
                <strong>{followers}</strong> followers &nbsp;&nbsp;
              </p>
            ) : (
              <Link to="/myfollowers">
                <p>
                  <strong>{followers}</strong> followers &nbsp;&nbsp;
                </p>
              </Link>
            )}
            {following === 0 ? (
              <p>
                <strong>{following - 1}</strong> following
              </p>
            ) : (
              <Link to="/myfollowing">
                <p>
                  <strong>{following - 1}</strong> following
                </p>
              </Link>
            )}
          </div>
          <p>{bio}</p>
          <Link
            to="/editprofile"
            onClick={() => {
              localStorage.setItem("bio", bio);
              localStorage.setItem("username", newusername);
              localStorage.setItem("editdp", dp);
              localStorage.setItem("accounttype", accounttype);
            }}
          >
            <button
              className="btn waves-effect waves-light btn-block login "
              style={{ backgroundColor: "transparent", color: "black" }}
            >
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
      <hr
        style={{ border: "1px solid #e0e0e0", marginTop: "2%", width: "85%" }}
      ></hr>
      <div className="prof">
        <Link to="/profile">
          <i
            className="large profi material-icons hov"
            style={{ fontSize: "2rem" }}
          >
            apps
          </i>
        </Link>
        <Link to="/mypost">
          <i
            className="large profi material-icons hov"
            style={{ fontSize: "2rem" }}
          >
            format_align_justify
          </i>
        </Link>
      </div>
      <div className="home">
        {data !== "No Posts Yet" ? (
          data.map((item) => {
            return (
              <div className="card home-card input-field" key={item._id}>
                <div style={{ display: "flex", margin: "10" }}>
                  <img
                    src={item.postedBy.dp}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      margin: "5%",
                    }}
                  ></img>
                  <h5 style={{ margin: "5% 5% 5% 2%", paddingTop: "1.5%" }}>
                    {item.postedBy.username}
                  </h5>
                  {/* {item.postedBy._id === state._id ? (
                    <i
                      className="material-icons delete"
                      style={{
                        marginTop: "auto",
                        marginLeft: "auto",
                        marginRight: "5%",
                        fontSize: "25px",
                        cursor: "pointer",
                        padding: "2%",
                        marginBottom: "auto",
                      }}
                      // onClick={() => {
                      //   localStorage.setItem(
                      //     "deleteCommentBy",
                      //     item.postedBy._id
                      //   );
                      //   localStorage.setItem("deleteComment", item.text);
                      //   deleteComment();
                      // }}
                    >
                      edit
                    </i>
                  ) : ( */}
                  {/* "" )} */}
                  {item.postedBy._id === state._id ? (
                    <div
                      style={{
                        display: "flex",
                        marginLeft: "auto",
                        marginRight: "15%",
                      }}
                    >
                      <i
                        className="material-icons delete"
                        style={{
                          marginTop: "auto",
                          marginLeft: "auto",
                          marginRight: "5%",
                          fontSize: "25px",
                          cursor: "pointer",
                          padding: "20%",
                          marginBottom: "auto",
                        }}
                        onClick={() => {
                          localStorage.setItem("editposturl", item.photo);
                          localStorage.setItem("editpostcaption", item.caption);
                          localStorage.setItem("editpostid", item._id);
                          history.push("/editpost");
                        }}
                        // onClick={() => {
                        //   localStorage.setItem(
                        //     "deleteCommentBy",
                        //     item.postedBy._id
                        //   );
                        //   localStorage.setItem("deleteComment", item.text);
                        //   deleteComment();
                        // }}
                      >
                        edit
                      </i>
                      <i
                        className="material-icons delete"
                        style={{
                          marginTop: "auto",
                          marginLeft: "auto",
                          marginRight: "5%",
                          fontSize: "25px",
                          cursor: "pointer",
                          padding: "20%",
                          marginBottom: "auto",
                        }}
                        onClick={() => {
                          localStorage.setItem("deletepostid", item._id);
                          deletePost(item._id);
                          //   localStorage.setItem("deleteposturl", item.photo);
                          //   localStorage.setItem("deletepostcaption", item.caption);
                          //   localStorage.setItem("deletepostid", item._id);
                        }}
                      >
                        delete
                      </i>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="card-image">
                  <img src={item.photo}></img>
                </div>
                <div className="card-content">
                  {item.likes.includes(state._id) ? (
                    <i
                      className="material-icons"
                      onClick={() => {
                        unlikePost(item._id);
                      }}
                      style={{ color: "red", cursor: "pointer" }}
                    >
                      favorite
                    </i>
                  ) : (
                    <i
                      className="material-icons"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        c = c + 1;
                        // console.log(c);
                        if (c === 1) {
                          likePost(item._id);
                        }
                        //  else {
                        //   Swal.fire(
                        //     "Asshole",
                        //     "How many times are you liking asshole!",
                        //     "warning"
                        //   );
                        // }
                      }}
                    >
                      favorite_border
                    </i>
                  )}
                  <Link
                    to="/comments"
                    onClick={() => {
                      localStorage.setItem("comments", item._id);
                    }}
                  >
                    <i
                      className="material-icons"
                      style={{ cursor: "pointer", marginLeft: "1%" }}
                    >
                      chat_bubble_outline
                    </i>
                  </Link>
                  <br></br>
                  <Link
                    to="/likes"
                    onClick={() => {
                      localStorage.setItem("pic", item._id);
                    }}
                  >
                    {item.likes.length !== 0
                      ? `${item.likes.length} likes`
                      : ""}
                  </Link>
                  <div style={{ display: "flex" }}>
                    <h6 style={{ fontWeight: "bold" }}>
                      {item.postedBy.username}&nbsp;&nbsp;
                    </h6>
                    <h6>{item.caption}</h6>
                  </div>
                  <Link
                    style={{ color: "gray" }}
                    to="/comments"
                    onClick={() => {
                      localStorage.setItem("comments", item._id);
                      localStorage.setItem("postedBy", item.postedBy._id);
                    }}
                  >
                    {item.comments.length !== 0
                      ? `View all ${item.comments.length} comments`
                      : ""}
                  </Link>
                  {item.comments.slice(0, 2).map((record) => {
                    return (
                      <h6 key={record._id}>
                        <span style={{ fontWeight: "500" }}>
                          {record.postedBy.username}
                        </span>{" "}
                        {record.text}
                      </h6>
                    );
                  })}
                  <p style={{ color: "gray" }}>{item.date}</p>
                  <hr
                    style={{ border: "0.2px solid #F3F3F3", marginTop: "2%" }}
                  ></hr>
                  <form>
                    <div style={{ display: "flex" }}>
                      <input
                        className=" remove-border"
                        type="text"
                        placeholder="Add a comment..."
                        style={{ borderBottom: "none" }}
                        value={comment}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setComment(e.target.value);
                        }}
                      ></input>
                      <button
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                        }}
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log(comment);
                          makeComment(comment, item._id);
                          setComment("");
                          // this.text.value = "";
                        }}
                      >
                        Post
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ margin: "auto", marginTop: "10%" }}>
            <i
              style={{ marginLeft: "30%", width: "40%" }}
              className="large material-icons"
            >
              add_a_photo
            </i>
            <h3>{data}</h3>
          </div>
        )}
        {loading ? (
          ""
        ) : (
          <div style={{ marginLeft: "45%", marginTop: "20%" }}>
            <div className="preloader-wrapper big active">
              <div className="spinner-layer spinner-blue">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>

              <div className="spinner-layer spinner-red">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>

              <div className="spinner-layer spinner-yellow">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>

              <div className="spinner-layer spinner-green">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
