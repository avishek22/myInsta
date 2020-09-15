import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import Swal from "sweetalert2";

let c = 0;
const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  useEffect(() => {
    fetch("http://localhost:4000/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
        setLoading(true);
        document.title = `Home | myInsta`;
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
  return (
    <div className="home navfix">
      <div className="card home-card input-field">
        <div style={{ display: "flex", margin: "10" }}>
          {data.slice(0, 4).map((item) => {
            return (
              <div style={{ margin: "5% 0% 5% 5%" }} key={item._id}>
                <Link to="/story">
                  <img
                    src={item.postedBy.dp}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 35,
                      margin: "1%",
                      border: "3px solid 	#C71585",
                      padding: "2%",
                      cursor: "pointer",
                    }}
                    key={item._id}
                  ></img>

                  <p style={{ marginLeft: "10%", marginTop: "2%" }}>
                    {item.postedBy.username}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      {data.map((item) => {
        return (
          <div
            className="card home-card input-field"
            key={item._id}
            style={{ marginBottom: "5%" }}
          >
            <div style={{ display: "flex", margin: "10 " }}>
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
                <Link
                  to={
                    item.postedBy._id !== state._id
                      ? "/otherprofile/" + item.postedBy._id
                      : "/profile"
                  }
                >
                  {item.postedBy.username}
                </Link>
              </h5>
            </div>

            <div className="card-image">
              <img src={item.photo}></img>
            </div>
            <div className="card-content">
              {/* {console.log(typeof item.likes)} */}
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
                  localStorage.setItem("likes", item._id);
                }}
              >
                {item.likes.length !== 0 ? `${item.likes.length} likes` : ""}
              </Link>

              <div style={{ display: "flex" }}>
                <h6 style={{ fontWeight: "bold" }}>
                  <Link
                    to={
                      item.postedBy._id !== state._id
                        ? "/otherprofile/" + item.postedBy._id
                        : "/profile"
                    }
                  >
                    {item.postedBy.username}&nbsp;&nbsp;
                  </Link>
                </h6>
                <h6>{item.caption}</h6>
              </div>
              <Link
                to="/comments"
                onClick={() => {
                  localStorage.setItem("comments", item._id);
                  localStorage.setItem("postedBy", item.postedBy._id);
                }}
                style={{ color: "gray" }}
              >
                {item.comments.length !== 0
                  ? `View all ${item.comments.length} comments`
                  : ""}
              </Link>
              {item.comments.slice(0, 2).map((record) => {
                return (
                  <h6 key={record._id}>
                    <span style={{ fontWeight: "500" }}>
                      <Link
                        to={
                          record.postedBy._id !== state._id
                            ? "/otherprofile/" + record.postedBy._id
                            : "/profile"
                        }
                      >
                        {record.postedBy.username}
                      </Link>
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
      })}
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
  );
};

export default Home;
