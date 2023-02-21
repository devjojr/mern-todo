import { Link } from "react-router-dom";
import { useIAMContext } from "../hooks/useIAMContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { user } = useIAMContext();
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <nav className="navbar is-light is-transparent">
      <div className="navbar-brand">
        <Link to="/" id="todo-brand" className="navbar-item">
          <strong>Todo</strong>
        </Link>
      </div>

      <div className="navbar-end">
        {user && (
          <div className="navbar-item">
            <div className="buttons">
              <span onClick={handleClick} className="button is-dark">
                <strong>Log Out</strong>
              </span>
            </div>
          </div>
        )}
        {!user && (
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/signup" className="button is-info">
                <strong>Sign Up</strong>
              </Link>
              <Link to="/login" className="button is-dark">
                <strong>Log In</strong>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
