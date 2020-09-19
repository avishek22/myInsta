import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import CircularJSON from "circular-json";
import Swal from "sweetalert2";
const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch("http://localhost:4000/getcomments", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: localStorage.getItem("comments"),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setData(result.comments);
        document.title = `${result.comments.length} Comments | myInsta`;
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const deleteComment = () => {
    fetch("http://localhost:4000/deletecomment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        _id: localStorage.getItem("deleteCommentBy"),
        text: localStorage.getItem("deleteComment"),
        postId: localStorage.getItem("comments"),
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
        {data.reverse().map((item) => {
          return (
            <div className="" key={item._id}>
              <div style={{ display: "flex" }}>
                <img
                  src={item.postedBy.dp}
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

                    fontSize: "25px",
                  }}
                >
                  <Link
                    to={
                      item.postedBy._id !== state._id
                        ? "/otherprofile/" + item.postedBy._id
                        : "/profile"
                    }
                  >
                    <strong>{item.postedBy.username}</strong>
                  </Link>
                </p>
                <p
                  style={{
                    marginTop: "7%",
                    marginLeft: "1%",
                    fontSize: "25px",
                  }}
                >
                  {item.text}
                </p>
                {state._id === item.postedBy._id ||
                state._id === localStorage.getItem("postedBy") ? (
                  <i
                    className="material-icons "
                    style={{
                      marginTop: "8%",
                      marginLeft: "auto",
                      marginRight: "5%",
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      localStorage.setItem(
                        "deleteCommentBy",
                        item.postedBy._id
                      );
                      localStorage.setItem("deleteComment", item.text);
                      deleteComment();
                    }}
                  >
                    delete
                  </i>
                ) : (
                  ""
                )}
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
