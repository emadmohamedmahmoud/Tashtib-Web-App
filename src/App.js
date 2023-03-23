import './App.css';
import First_Reg from './Register/First_Reg';
import RegisterCustomer from './Register/RegisterCust';
import Register from './Register/Register';
import Login from './Login/Login';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import Profile from './profilePage/Profile';
import ViewProfile from './ViewProfile/ViewProfile';
import Navbar from './navbar/navbar';
import Home from './Home/home';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';
import { useDispatch } from 'react-redux';
import { setUser } from './Store/Actions/AuthAction';
import UserRoute from './userRoute';
import Category from './Category/Category';
import CategoryPage from './CategoryPage/CategoryPage';
import Cart from './Cart/Cart';
import About from './About/About';
import Contact from './Contacts/Contact';
import Footer from './Footer/footer';
import CartComponent from './CartCompnent/CartComponent';
import NotFound from './Not-found/NotFound';



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if(authUser){
        dispatch(setUser(authUser))
      }
      else{
        dispatch(setUser(null))
      }
    })
  }, [dispatch])

  return (
    <>
    <Router>
      <Navbar />
      <Switch>  
        <Route exact path={'/'} component={Home}/>
        <Route exact path={'/Home'} component={Home}/>
        <UserRoute exact path={'/Profile'} component={Profile}/>
        <Route exact path={"/login"} component={Login} />        
        <Route exact path={'/navbar'} component={Navbar}/>
        <Route exact path={'/About'} component={About}/>
        <Route exact path={'/Contact'} component={Contact}/>
        <Route exact path={"/login"} component={Login} />
        <Route exact path={"/firstreg"} component={First_Reg} />
        <Route exact path={"/register"} component={Register} />
        <Route exact path={"/registercus"} component={RegisterCustomer} />
        <Route exact path={"/view/:role/:id"} component={ViewProfile}/>
        <Route exact path={"/category"} component={Category}/>
        <Route exact path={"/category/:category"} component={CategoryPage}/>
        <Route exact path={"/Cart"} component={CartComponent} />
        <Route exact path={"*"} component={NotFound} />
      </Switch>
      <Footer/>
    </Router>

    </>
  );
}

export default App;
