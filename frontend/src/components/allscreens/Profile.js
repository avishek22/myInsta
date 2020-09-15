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
              {mypost === "No Posts Yet" ? (
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
        style={{ border: "1px solid #e0e0e0", marginTop: "2%", width: "99%" }}
      ></hr>
      {mypost === "No Posts Yet" ? (
        <div></div>
      ) : (
        <div className="prof">
          <Link to="/profile">
            <i
              className="large material-icons hov"
              style={{ fontSize: "2rem" }}
            >
              apps
            </i>
          </Link>
          <Link to="/mypost">
            <i
              className="large material-icons hov"
              style={{ fontSize: "2rem" }}
            >
              format_align_justify
            </i>
          </Link>
        </div>
      )}

      <div className="gallery">
        {mypost !== "No Posts Yet" ? (
          mypost.map((item) => {
            return <img className="item" src={item.photo} key={item._id}></img>;
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
    </div>
  );
};

export default Profile;
