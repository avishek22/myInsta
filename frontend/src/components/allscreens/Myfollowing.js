import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import CircularJSON from "circular-json";
const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [len, setLen] = useState(0);
  useEffect(() => {
    fetch("http://localhost:4000/showfollowing", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setData(result.user.following);
        setLoading(true);
        setLen(result.user.following.length);
        document.title = `${
          result.user.following.length - 1
        } Following | myInsta`;
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

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
        {len === 1 ? (
          <h1>You Follow no one</h1>
        ) : (
          data.map((item) => {
            console.log(item._id);

            return (
              <div className="" key={item._id}>
                {item._id === state._id ? (
                  ""
                ) : (
                  <div>
                    <Link
                      to={
                        item._id !== state._id
                          ? "/otherprofile/" + item._id
                          : "/profile"
                      }
                      style={{ display: "flex" }}
                    >
                      <img
                        src={item.dp}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 30,
                          margin: "5%",
                          pointerEvents: "none",
                        }}
                      ></img>
                      <p
                        style={{
                          marginTop: "7%",
                          marginLeft: "15%",
                          fontSize: "25px",
                        }}
                      >
                        <strong>{item.username}</strong>
                      </p>
                    </Link>
                    <hr></hr>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
