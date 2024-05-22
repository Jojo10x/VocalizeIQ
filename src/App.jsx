import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login/Login";
import "./App.css";
import Menu from "./Menu/Menu";
import Home from "./Home/Home";
import TestLevel from "./TestLevel/TestLevel";
import Prouncition from "./Pronounciation/Pronouncition";
import Game from "./Games/TongueTwisterGame";
import MultipleChoiceGame from "./Games/MultipleChoiceGame";
import Instructions from "./Instructions/Instructions";
import Setttings from "./SettingsPage/Settings";
import Footer from "./components/ScrollToTop/Footer/Footer";

const Breadcrumbs = () => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const pathnames = location.pathname.split("/").filter((x) => x);

    const breadcrumbsArray = pathnames.map((_, index) => ({
      path: `/${pathnames.slice(0, index + 1).join("/")}`,
      name: pathnames[index],
    }));

    setBreadcrumbs(breadcrumbsArray);
  }, [location]);

  return (
    <div className="breadcrumbs">
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={breadcrumb.path}>
          <Link to={breadcrumb.path}>{breadcrumb.name}</Link>
          {index < breadcrumbs.length - 1 && (
            <span className="breadcrumb-separator"> / </span>
          )}
        </span>
      ))}
    </div>
  );
};

function App() {
  return (
    <>
      <Router>
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/menu/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/test" element={<TestLevel />} />
          <Route path="/menu/prounciation" element={<Prouncition />} />
          <Route path="/menu/game" element={<Game />} />
          <Route path="/menu/choice" element={<MultipleChoiceGame />} />
          <Route path="/menu/instructions" element={<Instructions />} />
          <Route path="/menu/settings" element={<Setttings />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
