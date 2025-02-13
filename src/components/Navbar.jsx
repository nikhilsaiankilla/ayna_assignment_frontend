import { Link } from "react-router-dom";
import { toast } from 'react-toastify'
const Navbar = ({ session, setSession }) => {

  const handleLogout = () => {
    localStorage.removeItem('token');
    setSession(null)
    toast.success('account logout successfull')
  }

  return (
    <nav className="navbar padding">
      <Link to="/">Home</Link>
      <Link to="/chat">Chat</Link>
      {
        !session && <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      }

      {
        session && <Link to="/signup" onClick={handleLogout}>logout</Link>
      }
    </nav>
  );
};

export default Navbar;
