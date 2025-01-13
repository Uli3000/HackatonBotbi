import { FaHome } from "react-icons/fa";

function MainPage() {
  return (
    <div style={{ flex: 1, padding: "20px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaHome style={{ paddingRight: "15px" }} size={30} />
        <h1>Inicio</h1>
      </div>
      <img src="./homeImage.jpg" style={{ width: "100%", height: "85%" }} />
    </div>
  );
}

export default MainPage;
