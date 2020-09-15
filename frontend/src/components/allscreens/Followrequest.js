import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import CircularJSON from "circular-json";
let click = 0;
const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch("http://localhost:4000/showfollowrequest", {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        console.log(result.user.followrequest);
        setData(result.user.followrequest);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const acceptrequest = (id) => {
    fetch("http://localhost:4000/addfollower", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        _id: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        click = click + 1;
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleterequest = (id) => {
    fetch("http://localhost:4000/removefollower", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        _id: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
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

      <div className="likes card home-card input-field navfix">
        {data.map((item) => {
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
                    }}
                  ></img>
                </Link>
                <div style={{ marginLeft: "10%" }}>
                  <p
                    style={{
                      marginTop: "7%",
                      marginLeft: "5%",
                      marginBottom: "3%",
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
                  <div style={{ display: "flex" }}>
                    <button
                      className="btn waves-effect waves-light btn-block login "
                      style={{ width: "65%", margin: "3%", paddingLeft: 10 }}
                      onClick={() => {
                        click = click + 1;
                        if (click === 1) {
                          console.log(item._id);
                          acceptrequest(item._id);
                        }
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      className="btn waves-effect waves-light btn-block login "
                      style={{ width: "65%", margin: "3% 0% 3% 1%" }}
                      onClick={() => {
                        console.log(item._id);
                        deleterequest(item._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              <hr></hr>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
