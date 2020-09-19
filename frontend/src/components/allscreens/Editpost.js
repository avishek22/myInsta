import React, { PureComponent, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const Createpost = () => {
  const history = useHistory();
  const [newcaption, setNewCaption] = useState(
    localStorage.getItem("editpostcaption")
  );
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [imagepreview, setImagePreview] = useState("");
  const [captionpreview, setCaptionPreview] = useState("");
  const [loading, setLoading] = useState(true);

  const editpost = (newcaption) => {
    setLoading(false);
    fetch("http://localhost:4000/editpost", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        newcaption,
        editpostid: localStorage.getItem("editpostid"),
        editpostcaption: localStorage.getItem("editpostcaption"),
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          setLoading(true);

          if (data.error) {
            return Swal.fire("Error", `${data.error}`, "error");
          } else {
            Swal.fire("Updated", `Image updated check profie!`, "success");
            //   setCaptionPreview(data.post.caption);
            //   //   history.push("/home");
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   const postDeatils = () => {
  //     const data = new FormData();
  //     setLoading(false);
  //     console.log(image);
  //     data.append("file", image);
  //     data.append("upload_preset", "instagram");
  //     data.append("cloud_name", "avishek");
  //     fetch("	https://api.cloudinary.com/v1_1/avishek/image/upload", {
  //       method: "post",
  //       body: data,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setUrl(data.url);
  //         console.log(data.url);
  //         setImagePreview(data.url);
  //         setLoading(true);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   };
  return (
    <div className="card input-field navfix editpost">
      {/* <div className="file-field input-field"> */}
      {/* <div className="btn" style={{ backgroundColor: " #0095f6" }}> */}

      {/* </div> */}
      {/* <div className="file-path-wrapper">
          <input
            className="file-path validate"
            type="text"
            style={{ color: "pink" }}
          />
        </div> */}
      {/* </div> */}
      <img
        src={localStorage.getItem("editposturl")}
        alt="Add an image to preview"
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      ></img>
      <input
        type="text"
        placeholder=" New Caption"
        value={newcaption}
        onChange={(e) => {
          console.log(e.target.value);
          setNewCaption(e.target.value);
        }}
      ></input>
      <button
        className="btn waves-effect waves-light btn-block login "
        type="submit"
        onClick={() => {
          console.log(newcaption);
          editpost(newcaption);
        }}
      >
        Post
      </button>
      {loading ? (
        ""
      ) : (
        <div style={{ marginLeft: "4%", marginTop: "5%" }}>
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

export default Createpost;
