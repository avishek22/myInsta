import React, { PureComponent, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const Createpost = () => {
  const history = useHistory();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [imagepreview, setImagePreview] = useState("");
  const [captionpreview, setCaptionPreview] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `New Post | myInsta`;

    if (url) {
      fetch("http://localhost:4000/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          caption,
          url,
        }),
      })
        .then((res) => {
          res.json().then((data) => {
            console.log(data);

            if (data.error) {
              return Swal.fire("Error", `${data.error}`, "error");
            } else {
              Swal.fire(
                "Preview",
                `Image posted check preview(Not satisfied with post please delete it from profile)!`,
                "success"
              );
              setCaptionPreview(data.post.caption);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);
  const postDeatils = () => {
    const data = new FormData();
    document.title = `New Post | myInsta`;

    setLoading(false);
    console.log(image);
    data.append("file", image);
    data.append("upload_preset", "instagram");
    data.append("cloud_name", "avishek");
    fetch("	https://api.cloudinary.com/v1_1/avishek/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        console.log(data.url);
        setImagePreview(data.url);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="card input-field navfix createpost">
      {/* <div className="file-field input-field"> */}
      {/* <div className="btn" style={{ backgroundColor: " #0095f6" }}> */}
      <span>Image:&nbsp;&nbsp;</span>
      <input
        style={{ color: "black" }}
        type="file"
        onChange={(e) => {
          setImage(e.target.files[0]);
          console.log(e.target.files[0]);
        }}
      />
      {/* </div> */}
      {/* <div className="file-path-wrapper">
          <input
            className="file-path validate"
            type="text"
            style={{ color: "pink" }}
          />
        </div> */}
      {/* </div> */}
      <input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={(e) => {
          setCaption(e.target.value);
        }}
      ></input>
      <button
        className="btn waves-effect waves-light btn-block login "
        onClick={() => {
          postDeatils();
        }}
        style={{ marginBottom: "10%" }}
      >
        Preview
      </button>
      {loading ? (
        ""
      ) : (
        <div style={{ marginLeft: "5%", marginTop: "2%" }}>
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
      <img
        src={imagepreview}
        alt="Add an image to preview"
        style={{ width: "100%", height: "100%" }}
      ></img>
      <p>{captionpreview}</p>
      <button
        className="btn waves-effect waves-light btn-block login "
        onClick={() => {
          history.push("/");
        }}
      >
        Post
      </button>
    </div>
  );
};

export default Createpost;
