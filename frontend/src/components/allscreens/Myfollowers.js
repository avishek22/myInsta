import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import CircularJSON from "circular-json";
const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/showfollowers", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setData(result.user.followers);
        setLoading(true);
        document.title = `${result.user.followers.length} Followers | myInsta`;
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
        {data.map((item) => {
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
        })}
      </div>
    </div>
  );
};

export default Home;
