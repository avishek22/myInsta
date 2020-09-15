import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState("password");

  const [showca, setShowca] = useState("show");
  let a = 0,
    c = 0;
  useEffect(() => {
    document.title = `myInsta`;
  });
  const postData = () => {
    // if (
    //   !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    //     email
    //   )
    // ) {
    //   Swal.fire("Invalid E-mail", "Please enter a valid E-mail!", "warning");
    //   return;
    // }
    // if (password.length <= 8) {
    //   Swal.fire(
    //     "Password",
    //     "Length of password should be greater than 8!",
    //     "warning"
    //   );
    //   return;
    // }
    // if (password.length < 8) {
    //   Swal.fire(
    //     "Password",
    //     "Length of password should be greater than 8",
    //     "warning"
    //   );
    //   return;
    // }
    // if (password !== confirmpassword) {
    //   Swal.fire("Password", "Passwords does not match", "warning");
    //   return;
    // }
    fetch("http://localhost:4000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          if (data.error) {
            Swal.fire("Error", `${data.error}`, "error");
          } else {
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            dispatch({ type: "USER", payload: data.user });
            history.push("/");
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="mycard">
        <div className="card auth-card input-field">
          <h2 style={{ fontFamily: "Grand Hotel, cursive" }}>myInsta</h2>
          <input
            type="text"
            placeholder="E-mail"
            style={{
              border: "1px solid gray",
              borderRadius: 2,

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
                borderRadius: 2,
                paddingLeft: "2%",
                backgroundColor: "#F9F9F9",
                borderRight: 0,
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

          <button
            style={{ marginBottom: 10 }}
            className="btn waves-effect waves-light btn-block login "
            onClick={() => postData()}
          >
            Login
          </button>
          <Link to="/">Forgot Password?</Link>
        </div>
      </div>
      <div className="mycard">
        <div className="card auth-card ">
          <h7>Don't have an account? </h7>
          <Link to="/signup" className="signuplink">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
