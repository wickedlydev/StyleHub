import { Link, Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as Crown } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/externalcontexts";
import { signOutUser } from "../../utils/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import './navigation-component.scss'
import CartDropDown from "../../components/cart-dropdown/cartdropdown.component";
import { CartContext } from "../../contexts/cartcontexts";
// import { useNavigate } from "react-router-dom";


const Navigation = () => {
  const {userStorage} = useContext(UserContext);
  const {cartOpen} = useContext(CartContext);
  // console.log(userStorage);
  // const onClickHandler = async () => {
  //   await signOutUser();
  //   setuserStorage(null);
  // }

  // const navigate = useNavigate();

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Crown />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {
            userStorage ? (
              <span className="nav-link" onClick={signOutUser}>{' '}
              Sign Out{' '}</span>
              // {
              //   navigate("/")
              // }
            ) : (
              
              <Link className="nav-link" to="/auth">
                Sign In
              </Link>
            )
          }
          <CartIcon />
        </div>
        {cartOpen && <CartDropDown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
