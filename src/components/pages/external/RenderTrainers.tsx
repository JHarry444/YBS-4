import type { TrainerType } from "../../../types/trainers";
import Trainer from "../../Trainer";

function RenderTrainers({ trainers }: { trainers: TrainerType[] }) {
    return (
        <div>
            {trainers.map((trainer) => (
                <Trainer key={trainer.id} name={trainer.name} age={trainer.age} specialism={trainer.specialism} />
            ))}
        </div>
    );
}

export default RenderTrainers;