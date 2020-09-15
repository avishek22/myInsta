import React, { PureComponent, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const Createpost = () => {
  const history = useHistory();
  const [newbio, setBio] = useState(localStorage.getItem("bio"));
  const [newusername, setNewUsername] = useState(
    localStorage.getItem("username")
  );
  const [accounttype, setAccounttype] = useState(
    localStorage.getItem("accounttype")
  );
  const [dp, setDp] = useState(localStorage.getItem("editdp"));
  const [newdp, setNewdp] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [imagepreview, setImagePreview] = useState("");
  const [captionpreview, setCaptionPreview] = useState("");
  const [loading, setLoading] = useState(true);

  document.title = `Edit Profile | myInsta`;

  useEffect(() => {
    document.title = `New Post | myInsta`;

    if (url) {
      fetch("http://localhost:4000/updatedp", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          url,
        }),
      })
        .then((res) => {
          res.json().then((data) => {
            localStorage.setItem("editdp", url);
            window.location.reload();
            console.log(data);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const editbio = (newusername, newbio, accounttype) => {
    setLoading(false);
    fetch("http://localhost:4000/editbio", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        newusername,
        newbio,
        accounttype,
        bio: localStorage.getItem("bio"),
        username: localStorage.getItem("username"),
        // editpostid: localStorage.getItem("editpostid"),
        // editpostcaption: localStorage.getItem("editpostcaption"),
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          setLoading(true);

          if (data.error) {
            return Swal.fire("Error", `${data.error}`, "error");
          } else {
            Swal.fire("Updated", `Profile!`, "success");
            //   setCaptionPreview(data.post.caption);
            //   //   history.push("/home");
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const postDeatils = () => {
    const data = new FormData();

    setLoading(false);
    console.log(newdp);
    data.append("file", newdp);
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

        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
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
    <div className="card input-field navfix editprofile">
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
      {/* <img
        src={localStorage.getItem("editposturl")}
        alt="Add an image to preview"
        style={{ width: "100%", height: "100%" }}
      ></img> */}
      <div style={{ marginBottom: "2%" }}>
        <img
          src={dp}
          style={{
            borderRadius: 113.5,
            height: 227,
            width: 227,
            marginBottom: "2%",
          }}
        ></img>
        <input
          type="file"
          onChange={(e) => {
            console.log(e.target.files[0]);
            setNewdp(e.target.files[0]);
          }}
        ></input>
        <button
          className="btn waves-effect waves-light btn-block login "
          type="submit"
          onClick={() => {
            // console.log(newusername, newbio, accounttype, newdp);
            // editbio(newusername, newbio, accounttype);
            postDeatils();
          }}
        >
          Update Picture
        </button>
      </div>
      <div style={{ marginBottom: "2%" }}>
        <label>Username</label>
        <input
          type="text"
          placeholder=" New Bio"
          value={newusername}
          onChange={(e) => {
            console.log(e.target.value);
            setNewUsername(e.target.value);
          }}
        ></input>
      </div>
      <div style={{ marginBottom: "2%" }}>
        <label>Bio</label>
        <input
          type="text"
          placeholder=" New Bio"
          value={newbio}
          onChange={(e) => {
            console.log(e.target.value);
            setBio(e.target.value);
          }}
        ></input>
      </div>

      <div style={{ marginBottom: "2%" }}>
        <label>Account Type</label>
        <select
          style={{ display: "block", marginTop: "2%" }}
          value={accounttype}
          onChange={(e) => {
            console.log(e.target.value);
            setAccounttype(e.target.value);
          }}
          className="accounttype"
        >
          <option value="" disabled selected>
            Account Type
          </option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
        {/* <input
          type="s"
          placeholder=" New Bio"
          value={newbio}
          onChange={(e) => {
            console.log(e.target.value);
            setBio(e.target.value);
          }}
        ></input> */}
      </div>
      <button
        className="btn waves-effect waves-light btn-block login "
        type="submit"
        onClick={() => {
          console.log(newusername, newbio, accounttype, newdp);
          editbio(newusername, newbio, accounttype);
        }}
      >
        Save Changes
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
