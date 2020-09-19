import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { Link, useHistory } from "react-router-dom";

const Profile = () => {
  const [mypost, setMyPost] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [postno, setPostNo] = useState("0");
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [newusername, setNewUsername] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [accounttype, setAccounttype] = useState("");
  const [followrequest, setFollowrequest] = useState(0);
  const [notifyfollowers, setNotifyfollowers] = useState("");
  const [notifyfollowing, setNotifyfollowing] = useState("");
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
        setNewUsername(result.user.username);
        setAccounttype(result.user.accounttype);
        setDp(result.user.dp);
        setFollowrequest(result.user.followrequest.length);
        setFollowers(result.user.followers.length);
        setNotifyfollowers(result.user.followers);
        setNotifyfollowing(result.user.following);
        setFollowing(result.user.following.length);
        setLoading(true);
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
        setMyPost(result.myPost);
        console.log(result.myPost.length);
        setPostNo(result.myPost.length);
        //setLoading(false);
      });
  }, []);

  const normal = () => {
    return;
  };
  return (
    <div className="navfix mypost">
      {followrequest !== 0 ? (
        <div className="likes card home-card input-field">
          <Link to="/followrequest" style={{ display: "flex" }}>
            <i
              className=" material-icons"
              style={{ fontSize: 60, margin: "3.5% 3% 3% 25px" }}
            >
              person_add
            </i>
            <p style={{ fontSize: 30, marginLeft: "19%" }}>
              <strong>{followrequest} </strong> Follow requests.
            </p>
          </Link>
        </div>
      ) : (
        ""
      )}
      <div className="likes card home-card input-field">
        {notifyfollowers !== "" && followers !== 0
          ? notifyfollowers.map((item) => {
              return (
                <div className="" key={item._id}>
                  <div style={{ display: "flex" }}>
                    <Link
                      to={
                        item._id !== state._id
                          ? "/otherprofile/" + item._id
                          : "/profile"
                      }
                      style={{ margin: "5% 0% 5% 5%" }}
                    >
                      <img
                        src={item.dp}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 30,
                          margin: "5% 0% 5% 5%",
                          pointerEvents: "none",
                        }}
                      ></img>
                    </Link>
                    <div style={{ marginLeft: "10%", marginTop: "7%" }}>
                      <p
                        style={{
                          marginTop: "7%",
                          marginLeft: "5%",

                          fontSize: "25px",
                        }}
                      >
                        <Link
                          to={
                            item._id !== state._id
                              ? "/otherprofile/" + item._id
                              : "/profile"
                          }
                        >
                          <strong>{item.username}</strong>
                        </Link>
                      </p>
                    </div>
                    <p
                      style={{
                        marginTop: "9%",
                        marginLeft: "2%",
                      }}
                    >
                      started following you.
                    </p>
                  </div>
                  <hr></hr>
                </div>
              );
            })
          : ""}
        {mypost === "No Posts Yet" ? (
          <h4>No New Notifications.</h4>
        ) : (
          mypost.map((item) => {
            return (
              <div className="" key={item._id}>
                {item.likes.length > 0 || item.comments.length > 0 ? (
                  <div
                    style={{ display: "flex", borderBottom: "1px solid gray" }}
                  >
                    <Link style={{ margin: "5%" }} to="/mypost">
                      <img
                        src={item.photo}
                        style={{
                          width: 60,
                          height: 60,
                          pointerEvents: "none",
                        }}
                      ></img>
                    </Link>

                    <p
                      style={{
                        marginTop: "7%",
                        marginLeft: "5%",
                        fontSize: "25px",
                      }}
                    >
                      <Link
                        to="/likes"
                        onClick={() => {
                          localStorage.setItem("likes", item._id);
                        }}
                      >
                        <strong>{item.likes.length} </strong>Likes,
                      </Link>
                    </p>
                    <p
                      style={{
                        marginTop: "7%",

                        fontSize: "25px",
                      }}
                    >
                      <Link
                        to="/comments"
                        onClick={() => {
                          localStorage.setItem("comments", item._id);
                          localStorage.setItem("postedBy", item.postedBy._id);
                        }}
                      >
                        <strong>&nbsp;{item.comments.length} </strong> Comments
                      </Link>
                    </p>
                    <hr></hr>
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })
        )}
        {notifyfollowing !== "" && following !== 0
          ? notifyfollowing
              .slice(1)
              .reverse()
              .map((item) => {
                return (
                  <div className="" key={item._id}>
                    <div style={{ display: "flex" }}>
                      <Link
                        to={
                          item._id !== state._id
                            ? "/otherprofile/" + item._id
                            : "/profile"
                        }
                        style={{ margin: "5% 0% 5% 5%" }}
                      >
                        <img
                          src={item.dp}
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            margin: "5% 0% 5% 5%",
                            pointerEvents: "none",
                          }}
                        ></img>
                      </Link>
                      <div style={{ marginLeft: "10%", marginTop: "7%" }}>
                        <p
                          style={{
                            marginTop: "7%",
                            marginLeft: "5%",

                            fontSize: "25px",
                          }}
                        >
                          <Link
                            to={
                              item._id !== state._id
                                ? "/otherprofile/" + item._id
                                : "/profile"
                            }
                          >
                            <strong>{item.username}</strong>
                          </Link>
                        </p>
                      </div>
                      <p
                        style={{
                          marginTop: "9%",
                          marginLeft: "2%",
                        }}
                      >
                        accepted your follow request.
                      </p>
                    </div>
                    <hr></hr>
                  </div>
                );
              })
          : ""}

        {loading ? (
          ""
        ) : (
          <div style={{ marginLeft: "45%", marginTop: "15%" }}>
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

export default Profile;
