
import img from "../../assets/thxxx.png";
import "./endPage.css";
import { useNavigate } from "react-router-dom";

function EndPage() {
const Navigate = useNavigate()
  return (
    <div className="parentEnd">
      <img src={img} alt="" />
      <button onClick={()=>{Navigate('/')}}>Start Survey</button>
    </div>
  );
}

export default EndPage;
