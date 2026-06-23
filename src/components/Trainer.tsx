import { useNavigate } from "react-router";
import type { TrainerType } from "../types/trainers";

function Trainer({ id, name, age, specialism }: TrainerType) {

    const navigate = useNavigate();


    return (
        <div onClick={() => navigate(`/specific-trainer/${id}`)} style={{ cursor: "pointer" }}>
            <h2>{name}</h2>
            <p>Age: {age}</p>
            <p>Specialism: {specialism}</p>
        </div>
    )
}


export default Trainer;
