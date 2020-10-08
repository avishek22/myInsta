import React, { useEffect, createContext, useReducer, useContext } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/allscreens/Home";
import Login from "./components/allscreens/Login";
import Signup from "./components/allscreens/Signup";
import Profile from "./components/allscreens/Profile";
import Navbar from "./components/Navbar";
import Createpost from "./components/allscreens/Createpost";
import Likes from "./components/allscreens/Likes";
import Comments from "./components/allscreens/Comments";
import Mypost from "./components/allscreens/Mypost";
import Editpost from "./components/allscreens/Editpost";
import Editprofile from "./components/allscreens/Editprofile";
import Otheruser from "./components/allscreens/Otheruser";
import Otheruserallpost from "./components/allscreens/Otheruserallpost";
import Followrequest from "./components/allscreens/Followrequest";
import Myfollowing from "./components/allscreens/Myfollowing";
import Myfollowers from "./components/allscreens/Myfollowers";
import { reducer, initialState } from "./reducer/userReducer";
import Stories from "react-insta-stories";
import Notification from "./components/allscreens/Notification";
import Savedphoto from "./components/allscreens/Savedphoto";
import Otherfollowers from "./components/allscreens/Otherfollowers";
import Otherfollowing from "./components/allscreens/Otherfollowing";
import Archived from "./components/allscreens/Archived";
import TitleComponent from "./components/allscreens/TitleComponent";

export const UserContext = createContext();

const stories = [
  {
    url:
      "https://i.pinimg.com/564x/8a/53/52/8a5352b7d0688d238d8a5028912dfba5.jpg",
    duration: 6000,
    header: {
      heading: "Avishek",
      subheading: "Posted 30m ago",
      profileImage:
        "http://res.cloudinary.com/avishek/image/upload/v1599350269/adgsmexycsisj8l87qlj.jpg",
    },
    storyContent: {
      width: "auto",
      maxWidth: "100%",
      maxHeight: "100%",
      margin: "100%",
    },
  },
  {
    url:
      "https://www.kolpaper.com/wp-content/uploads/2020/03/spiderman-wallpaper.jpg",
    duration: 6000,
    header: {
      heading: "Avishek",
      subheading: "Posted 1h ago",
      profileImage:
        "http://res.cloudinary.com/avishek/image/upload/v1599350269/adgsmexycsisj8l87qlj.jpg",
    },
  },
];

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "USER", payload: user });
      // history.push("/home");
    } else {
      history.push("/login");
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        <Navbar></Navbar>
        <Home></Home>
      </Route>
      <Route path="/signup">
        <Signup></Signup>
      </Route>
      <Route path="/profile">
        <Navbar></Navbar>
        <Profile></Profile>
      </Route>
      <Route exact path="/login">
        <Login></Login>
      </Route>
      <Route exact path="/createpost">
        <Navbar></Navbar>
        <Createpost></Createpost>
      </Route>
      <Route exact path="/likes">
        <Navbar></Navbar>
        <Likes></Likes>
      </Route>
      <Route exact path="/comments">
        <Navbar></Navbar>
        <Comments></Comments>
      </Route>
      <Route exact path="/mypost">
        <Navbar></Navbar>
        <Mypost></Mypost>
      </Route>
      <Route exact path="/story">
        {/* <Navbar></Navbar> */}
        <Stories
          stories={stories}
          defaultInterval={1500}
          width={"100%"}
          height={"100%"}
        />
      </Route>
      <Route exact path="/editpost">
        <Navbar></Navbar>
        <Editpost></Editpost>
      </Route>
      <Route exact path="/otherprofile/:userid">
        <Navbar></Navbar>
        <Otheruser></Otheruser>
      </Route>
      <Route exact path="/otherprofileallpost/:userid">
        <Navbar></Navbar>
        <Otheruserallpost></Otheruserallpost>
      </Route>
      <Route exact path="/otherfollowers/:userid">
        <Navbar></Navbar>
        <Otherfollowers></Otherfollowers>
      </Route>
      <Route exact path="/otherfollowing/:userid">
        <Navbar></Navbar>
        <Otherfollowing></Otherfollowing>
      </Route>
      <Route exact path="/editprofile">
        <Navbar></Navbar>
        <Editprofile></Editprofile>
      </Route>
      <Route exact path="/followrequest">
        <Navbar></Navbar>
        <Followrequest></Followrequest>
      </Route>
      <Route exact path="/notifications">
        <Navbar></Navbar>
        <Notification></Notification>
      </Route>
      <Route exact path="/myfollowing">
        <Navbar></Navbar>
        <Myfollowing></Myfollowing>
      </Route>
      <Route exact path="/myfollowers">
        <Navbar></Navbar>
        <Myfollowers></Myfollowers>
      </Route>
      <Route exact path="/savedphoto">
        <Navbar></Navbar>
        <Savedphoto></Savedphoto>
      </Route>
      <Route exact path="/archived">
        <Navbar></Navbar>
        <Archived></Archived>
      </Route>
    </Switch>
  );
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routing></Routing>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
