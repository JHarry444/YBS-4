import type { TrainerType } from "../types/trainers";

function Trainer({ name, age, specialism }: TrainerType) {


    return (
        <div>
            <h2>{name}</h2>
            <p>Age: {age}</p>
            <p>Specialism: {specialism}</p>
        </div>
    )
}


export default Trainer;
