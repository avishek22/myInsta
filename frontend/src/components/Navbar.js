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
  const [searchusername, setSearchUsername] = useState("");
  const [userData, setUserData] = useState([]);
  const history = useHistory();
  const [dropdown, setDropdown] = useState(false);
  const [dp, setDp] = useState("");
  const navs = useRef(null);
  const searchmodal = useRef(null);
  const [loading, setLoading] = useState(false);
  const [userlength, setUserlength] = useState(0);
  useEffect(() => {
    materialize.Modal.init(navs.current);
    materialize.Modal.init(searchmodal.current);
    fetch("http://localhost:4000/finaluser", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setDp(result.user.dp);
        setLoading(true);
      });
  }, []);
  const getusers = (query) => {
    console.log(query);

    setSearchUsername(query);
    console.log(searchusername);
    setLoading(false);
    fetch("http://localhost:4000/searchusername", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        console.log(results.user);
        setUserlength(results.user.length);
        if (results.user.length === 0) console.log("no");
        setUserData(results.user);
        setLoading(true);
      });
  };
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
          <li data-target="modal2" className="modal-trigger">
            <Link to="/" style={{ color: "black" }}>
              <i className="material-icons ">search</i>
            </Link>
          </li>
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
                marginLeft: "5%",
                // pointerEvents: "none",
              }}
              data-target="modal1"
              className="modal-trigger navlink"
            ></img>
            {/* </Link> */}
          </li>
        </ul>
      </div>
      <div id="modal1" className="modal profile " ref={navs}>
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

      <div
        id="modal2"
        className="modal"
        ref={searchmodal}
        style={{ color: "black" }}
      >
        <div className="modal-content">
          <input
            type="text"
            placeholder="Username"
            style={{
              // border: "1px solid gray",
              // borderRadius: 2,

              backgroundColor: "#F9F9F9",
            }}
            value={searchusername}
            onChange={(e) => {
              getusers(e.target.value);
            }}
          ></input>

          <ul
            class="collection"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {userlength !== 0 && searchusername !== "" ? (
              userData.map((item) => {
                return (
                  <li class="collection-item avatar" key={item._id}>
                    <Link
                      to={
                        item._id !== state._id
                          ? "/otherprofile/" + item._id
                          : "/profile"
                      }
                      style={{ color: "black", backgroundColor: "white" }}
                      className="search"
                      onClick={() => {
                        materialize.Modal.getInstance(
                          searchmodal.current
                        ).close();
                        setSearchUsername("");
                      }}
                    >
                      <img src={item.dp} alt="" class="circle"></img>

                      <h5
                        style={{ backgroundColor: "white", marginLeft: "5%" }}
                      >
                        {item.username}
                      </h5>
                    </Link>
                  </li>
                );
              })
            ) : searchusername === "" ? (
              ""
            ) : (
              <h6>No such user found.</h6>
            )}
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
          </ul>
        </div>
        <div className="modal-footer">
          {/* <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
          >
            Agree
          </a> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
