import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const Signup = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState("password");

  const [showca, setShowca] = useState("show");
  const [showc, setShowc] = useState("password");
  const [showcas, setShowcas] = useState("show");
  const [ownid, setOwnid] = useState("");

  let a = 0,
    c = 0;

  useEffect(() => {
    document.title = `myInsta | Signup`;
    if (ownid) {
      fetch("http://localhost:4000/ownid", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: ownid,
        }),
      })
        .then((res) => {
          res.json().then((data) => {
            console.log(data);
            history.push("/login");
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [ownid]);

  const postData = () => {
    setLoading(false);
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setLoading(true);
      Swal.fire("Invalid E-mail", "Please enter a valid E-mail!", "warning");

      return;
    }
    // if (password.length <= 8) {
    //   Swal.fire(
    //     "Password",
    //     "Length of password should be greater than 8!",
    //     "warning"
    //   );
    //   return;
    // }
    if (password.length < 8) {
      setLoading(true);
      Swal.fire(
        "Password",
        "Length of password should be greater than 8",
        "warning"
      );
      return;
    }
    if (password !== confirmpassword) {
      setLoading(true);
      Swal.fire("Password", "Passwords does not match", "warning");
      return;
    }
    fetch("http://localhost:4000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          if (data.error) {
            setLoading(true);
            Swal.fire("Error", `${data.error}`, "error");
          } else {
            setLoading(true);
            Swal.fire("Added", `${data.message}`, "success");

            console.log(data.user._id);
            setOwnid(data.user._id);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {loading ? (
        ""
      ) : (
        <div className="loader">
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
      <div className="mycard">
        <div className="card auth-card input-field">
          <h2 style={{ fontFamily: "Grand Hotel, cursive" }}>myInsta</h2>
          <h6 style={{ color: "gray", paddingBottom: 10 }}>
            Sign up to see photos and videos from your friends.
          </h6>
          <input
            type="text"
            placeholder="Username"
            style={{
              border: "1px solid gray",
              borderRadius: 2,

              backgroundColor: "#F9F9F9",
            }}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <input
            type="text"
            placeholder="E-mail"
            style={{
              border: "1px solid gray",
              borderRadius: 2,
              color: "gray",
              backgroundColor: "#F9F9F9",
            }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <div style={{ display: "flex" }}>
            <input
              type={show}
              placeholder="Password"
              style={{
                border: "1px solid gray",
                borderRight: "none",
                borderRadius: 2,
                paddingLeft: "2%",
                backgroundColor: "#F9F9F9",
              }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <button
              onClick={() => {
                c = c + 1;
                console.log(c);
                if (c % 2 === 0) {
                  setShow("text");
                  setShowca("hide");
                } else {
                  setShow("password");
                  setShowca("show");
                  // c = c + 1;
                }
              }}
              style={{
                marginBottom: 8,
                backgroundColor: "#F9F9F9",
                borderRadius: 2,
                border: "1px solid gray",
                borderLeft: 0,
                color: "gray",
                fontSize: 10,
                cursor: "pointer",
              }}
            >
              {showca}
            </button>
          </div>
          <div style={{ display: "flex" }}>
            <input
              type={showc}
              placeholder="Confirm Password"
              style={{
                border: "1px solid gray",
                borderRight: 0,
                borderRadius: 2,
                paddingLeft: "2%",
                backgroundColor: "#F9F9F9",
              }}
              value={confirmpassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            ></input>
            <button
              onClick={() => {
                a = a + 1;
                console.log(a);
                if (a % 2 === 0) {
                  setShowc("text");
                  setShowcas("hide");
                  a = a + 1;
                } else {
                  setShowc("password");
                  setShowcas("show");
                  // c = c + 1;
                }
              }}
              style={{
                marginBottom: 8,
                backgroundColor: "#F9F9F9",
                border: "1px solid gray",
                borderLeft: 0,
                borderRadius: 2,
                color: "gray",
                fontSize: 10,
                cursor: "pointer",
              }}
            >
              {showcas}
            </button>
          </div>

          <button
            className="btn waves-effect waves-light btn-block login "
            onClick={() => postData()}
          >
            Signup
          </button>
          <p style={{ color: "gray" }}>
            By signing up, you agree to our Terms , Data Policy and Cookies
            Policy .
          </p>
        </div>
      </div>
      <div className="mycard">
        <div className="card auth-card ">
          <h7>Have an account? </h7>
          <Link to="/login" className="signuplink">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
