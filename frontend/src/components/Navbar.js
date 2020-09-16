import React, {
  PureComponent,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import materialize from "materialize-css";
const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [dropdown, setDropdown] = useState(false);
  const [dp, setDp] = useState("");
  const navs = useRef(null);
  useEffect(() => {
    materialize.Modal.init(navs.current);
    fetch("http://localhost:4000/finaluser", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setDp(result.user.dp);
      });
  }, []);
  return (
    <nav
      style={{
        backgroundColor: "white",
        position: "fixed",
        top: 0,
        zIndex: 1,
      }}
    >
      <div className="nav-wrapper white needsmargin">
        <Link to="/" className="brand-logo left" style={{ color: "black" }}>
          myInsta
        </Link>
        <ul id="nav-mobile" className="right ">
          {/* <li>
            <Link to="/" style={{ color: "black" }}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" style={{ color: "black" }}>
              Signup
            </Link>
          </li> */}

          {/* <li>
            <Link to="/home" style={{ color: "black" }}>
              <i class="material-icons">home</i>
            </Link>
          </li> */}
          <li>
            <Link to="/" style={{ color: "black" }}>
              <i className="material-icons">home</i>
            </Link>
          </li>
          <li>
            <Link to="/notifications" style={{ color: "black" }}>
              <i className="material-icons">favorite_outline</i>
            </Link>
          </li>

          <li>
            {/* to="/profile" */}
            {/* <Link  style={{ color: "black" }}> */}
            <img
              src={dp}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                marginTop: 10,
                marginBottom: -10,
                cursor: "pointer",
              }}
              data-target="modal1"
              className="modal-trigger navlink"
            ></img>
            {/* </Link> */}
          </li>
        </ul>
      </div>
      <div id="modal1" className="modal" ref={navs}>
        <div className="modal-content">
          <Link
            to="/profile"
            style={{ color: "black", paddingTop: "2%" }}
            onClick={() => {
              materialize.Modal.getInstance(navs.current).close();
            }}
          >
            <div style={{ display: "flex" }} className="navlink">
              <i className="material-icons">person_outline</i>
              <h6 style={{ marginLeft: "15%", marginTop: 15 }}>Profile</h6>
            </div>
          </Link>

          <Link
            to="/createpost"
            style={{ color: "black" }}
            onClick={() => {
              materialize.Modal.getInstance(navs.current).close();
            }}
          >
            <div style={{ display: "flex" }} className="navlink">
              <i className="material-icons">add_circle_outline</i>
              <h6 style={{ marginLeft: "15%", marginTop: 15 }}>New Post</h6>
            </div>
          </Link>
          <Link
            to="/savedphoto"
            style={{ color: "black" }}
            onClick={() => {
              materialize.Modal.getInstance(navs.current).close();
            }}
          >
            <div style={{ display: "flex" }} className="navlink">
              <i className="material-icons">bookmark_outline</i>
              <h6 style={{ marginLeft: "15%", marginTop: 15 }}>Saved</h6>
            </div>
          </Link>

          <hr></hr>

          <Link
            to="/login"
            style={{ color: "black" }}
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/login");
              materialize.Modal.getInstance(navs.current).close();
            }}
          >
            <div style={{ display: "flex" }} className="navlink">
              <i className="material-icons">exit_to_app</i>
              <h6 style={{ marginLeft: "15%", marginTop: 15 }}>Logout</h6>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
