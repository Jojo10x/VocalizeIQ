import { useNavigate } from 'react-router-dom';
// import styles from "./Home.module.css";
import '../App.css'


function Home() {
    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1);
    };
  return (
    <div className="admin-dashboard-container">
      <button className="back-button" onClick={goBack}>Back</button>
      <h1>Hello I am the Home</h1>
    </div>
  );
}

export default Home;