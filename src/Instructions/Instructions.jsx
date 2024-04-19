import { useNavigate } from "react-router-dom";

function Instructions() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/menu");
  };

  return (
    <>
    <h1>Instructions</h1>
      <button className="back-button" onClick={goBack}>
        Back
      </button>
      <div>
        <h1>Still thinking on what will be here </h1>
      </div>
    </>
  );
}

export default Instructions;
