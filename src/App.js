import "./App.css";
import Homepage from "./Components/Homepage";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapDemo from "./Components/BootstrapDemo";
import MaterialDemo from "./Components/MaterialDemo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Allbooks from "./Components/Allbooks";
import DetailsOfABook from "./Components/DetailsOfABook";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { useEffect } from "react";
import Logout from "./Components/Logout";
import ViewCart from "./Components/ViewCart";
import AddNewBook from "./Components/AddNewBook";
import BookBorrower from "./Components/BookBorrower";
import DataInTable from "./Components/DataInTable";
import ReturnBooks from "./Components/ReturnBooks";
import ApproveReturns from "./Components/ApproveReturns";
function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
        dispatch({ type: "SET_BASKET_ON_RELOAD" });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        dispatch({ type: "SET_BASKET_ON_RELOAD" });
      }
    });
    return () => {
      unsuscribe();
    };
  }, []);
  return (
    <div className="App">
      {/* <img src={"x.jpg"} alt="sorry no image found" /> */}
      <Router>
        <Switch>
          <Route exact path="/fe">
            <Homepage />
          </Route>
          <Route exact path="/fe/all">
            <Allbooks />
          </Route>
          <Route exact path="/fe/login">
            <Login />
          </Route>
          <Route exact path="/fe/logout">
            <Logout />
          </Route>
          <Route exact path="/fe/register">
            <Register />
          </Route>
          <Route exact path="/fe/bookdescription">
            <DetailsOfABook />
          </Route>
          <Route exact path="/fe/viewcart">
            <ViewCart />
          </Route>
          <Route exact path="/fe/add">
            <AddNewBook />
          </Route>
          <Route exact path="/fe/bor">
            <BookBorrower />
          </Route>
          <Route exact path="/fe/return">
            <ReturnBooks />
          </Route>
          <Route exact path="/fe/approvereturn">
            <ApproveReturns />
          </Route>

          <Route exact path="/fe/matDemo">
            <MaterialDemo />
          </Route>
          <Route exact path="/fe/bootDemo">
            <BootstrapDemo />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
