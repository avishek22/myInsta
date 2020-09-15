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
        setMyPost(result.myPost);
        console.log(result.myPost.length);
        setPostNo(result.myPost.length);
        setLoading(true);
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
        {mypost === "No Posts Yet" ? (
          <h4>No New Notifications.</h4>
        ) : (
          mypost.map((item) => {
            return (
              <div className="" key={item._id}>
                {item.likes.length > 0 || item.comments.length > 0 ? (
                  <div style={{ display: "flex" }}>
                    <Link style={{ margin: "5%" }} to="/mypost">
                      <img
                        src={item.photo}
                        style={{
                          width: 60,
                          height: 60,
                        }}
                      ></img>
                    </Link>

                    <p
                      style={{
                        marginTop: "7%",
                        marginLeft: "15%",
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
