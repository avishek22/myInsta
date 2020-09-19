import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { Link, useHistory, useParams } from "react-router-dom";

let a = false;
let click = 0;

const Profile = () => {
  const [userprofile, SetUserProfile] = useState("");
  const [follow, setFollow] = useState("");
  const [mypost, setMyPost] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [postno, setPostNo] = useState("0");
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState(1);
  const [followers, setFollowers] = useState("0");
  const [button, setButton] = useState("");
  const [dp, setDp] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [accounttype, setAccounttype] = useState("");
  const { userid } = useParams();
  //   console.log(userid);
  useEffect(() => {
    fetch(`http://localhost:4000/followunfollow/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setButton(result.button);
        console.log(result.button);
        setBio(result.user.bio);
        setAccounttype(result.user.accounttype);
        setDp(result.user.dp);
        setUsername(result.user.username);
        setFollowing(result.user.following.length);
        setFollowers(result.user.followers.length);
        document.title = `${result.user.username} | myInsta`;
        // SetUserProfile(result.user);
        // setFollowing(result.user.following.length);
        // setFollowers(result.user.followers.length);
        // console.log(userprofile);
        // setData(result.myPost);
        // console.log(data);
        // console.log(result.myPost.length);
        // setPostNo(result.myPost.length);
        // setLoading(true);
      });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:4000/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        SetUserProfile(result.user);
        setFollow(result.doesfollow);

        console.log(userprofile);

        setMyPost(result.myPost);
        console.log(mypost);
        console.log(result.myPost.length);
        setPostNo(result.myPost.length);
        setLoading(true);
        // if (userprofile.followers.includes("5f5aa06363d48b8d883e68c4")) {
        //   a = true;
        //   console.log(a);
        // }
        console.log(userprofile.followers);
      });
  }, []);
  const followrequest = () => {
    fetch(`http://localhost:4000/followrequest/${userid}`, {
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        click = 0;
        window.location.reload();
        // SetUserProfile(result.user);
        // setFollowing(result.user.following.length);
        // setFollowers(result.user.followers.length);
        // console.log(userprofile);
        // setData(result.myPost);
        // console.log(data);
        // console.log(result.myPost.length);
        // setPostNo(result.myPost.length);
        // setLoading(true);
      });
  };
  const deleterequest = () => {
    fetch(`http://localhost:4000/deleterequest/${userid}`, {
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        window.location.reload();
      });
  };
  const unfollow = () => {
    fetch(`http://localhost:4000/unfollow/${userid}`, {
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
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
        <img
          className="dp"
          src={dp}
          style={{ marginTop: "4%", pointerEvents: "none" }}
        ></img>

        <div>
          <h4>{username}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <p>
              {mypost === "No Posts Yet" ? (
                <strong>0 </strong>
              ) : (
                <strong>{postno} </strong>
              )}
              posts &nbsp;&nbsp;
            </p>
            {accounttype === "Public" ||
            (accounttype === "Private" && follow === "yes") ? (
              <Link to={`/otherfollowers/${userid}`}>
                <p>
                  <strong>{followers}</strong> followers&nbsp;&nbsp;
                </p>
              </Link>
            ) : (
              <p>
                <strong>{followers}</strong> followers&nbsp;&nbsp;
              </p>
            )}
            {accounttype === "Public" ||
            (accounttype === "Private" && follow === "yes") ? (
              <Link to={`/otherfollowing/${userid}`}>
                <p>
                  <strong>{following - 1}</strong> following
                </p>
              </Link>
            ) : (
              <p>
                <strong>{following - 1}</strong> following
              </p>
            )}
          </div>
          <p>{bio}</p>
          {button === "Follow" ? (
            <button
              className="btn waves-effect waves-light btn-block login "
              onClick={() => {
                click = click + 1;
                if (click === 1) {
                  followrequest();
                }
              }}
            >
              Follow
            </button>
          ) : (
            ""
          )}
          {button === "Unfollow" ? (
            <button
              className="btn waves-effect waves-light btn-block login "
              // onClick={() => {
              //   localStorage.setItem("follow", state._id);
              // }}
              onClick={() => {
                unfollow();
              }}
            >
              Unfollow
            </button>
          ) : (
            ""
          )}
          {button === "Delete Request" ? (
            <button
              className="btn waves-effect waves-light btn-block login "
              onClick={() => {
                deleterequest();
              }}
            >
              Delete Request
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <hr
        style={{ border: "1px solid #e0e0e0", marginTop: "2%", width: "99%" }}
      ></hr>

      {mypost === "No Posts Yet" ||
      (accounttype === "Private" && follow !== "yes") ? (
        <div></div>
      ) : (
        <div className="prof">
          <Link to={"/otherprofile/" + userid}>
            <i
              className="large material-icons hov"
              style={{ fontSize: "2rem" }}
            >
              apps
            </i>
          </Link>
          <Link to={"/otherprofileallpost/" + userid}>
            <i
              className="large material-icons hov"
              style={{ fontSize: "2rem" }}
            >
              format_align_justify
            </i>
          </Link>
        </div>
      )}
      {/* {console.log(state._id)} */}

      {accounttype === "Public" || follow === "yes" ? (
        <div className="gallery">
          {mypost !== "No Posts Yet" ? (
            mypost.map((item) => {
              return (
                <img
                  className="item"
                  src={item.photo}
                  key={item._id}
                  style={{ pointerEvents: "none" }}
                ></img>
              );
            })
          ) : (
            <div style={{ margin: "auto", marginTop: "10%" }}>
              <Link to="/createpost">
                <i
                  style={{ marginLeft: "30%", width: "40%" }}
                  className="large material-icons"
                >
                  add_a_photo
                </i>
                <h3>{mypost}</h3>
              </Link>
            </div>
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
      ) : (
        <div style={{ margin: "auto", marginTop: "10%" }}>
          {loading ? (
            <div style={{ marginLeft: "30%" }}>
              <i
                className="fa fa-lock"
                style={{
                  fontSize: 60,
                  border: "3px solid black",
                  borderRadius: 100,
                  padding: "2% 3% 2% 3%",
                  marginLeft: "15%",
                }}
              ></i>
              <h3 style={{ marginLeft: "-7%" }}>This Account is Private</h3>
              {/* {console.log(userprofile.followers.includes(state._id))} */}
            </div>
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
      )}
    </div>
  );
};

export default Profile;
