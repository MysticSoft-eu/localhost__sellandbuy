import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';


const Logout = () => {
  const navigate = useNavigate(); // używamy useNavigate zamiast useHistory
 

  const handleLogout = async () => {
    await logout();
    navigate('/'); // używamy navigate zamiast history.push
  };

  return (
    <button onClick={handleLogout}>Wyloguj</button>
  );
};

export default Logout;
