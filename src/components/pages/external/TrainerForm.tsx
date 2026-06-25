import { memo, useRef, useState } from "react";
import type { TrainerType } from "../../../types/trainers";
import { useFormStatus } from "react-dom";
import Submit from "../../Submit";

const TrainerForm = memo(({ addTrainer }: { addTrainer: (newTrainer: TrainerType) => void }) => {
    const [trainer, setTrainer] = useState<TrainerType>({
        name: "",
        age: 0,
        specialism: ""
    });

    async function formAction(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("Trainer Data:", trainer);

        addTrainer(trainer);
        setTrainer({
            name: "",
            age: 0,
            specialism: ""
        });

        // ref.current accesses the DOM element directly, allowing us to call focus() on it to set the cursor back to the name input field after submission.
        if (nameRef.current) {
            nameRef.current.focus();
        }
    }


    const { pending } = useFormStatus();

    console.log("Pending:", pending);


    const nameRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    return (
        <div>
            <form onSubmit={formAction}>

                <fieldset>
                    <label>Name:</label>
                    <input type="text" ref={nameRef} value={trainer.name} onChange={(e) => setTrainer({ ...trainer, name: e.target.value })} />
                    <label>Age:</label>
                    <input type="number" ref={ageRef} value={trainer.age} onChange={(e) => setTrainer({ ...trainer, age: Number(e.target.value) })} />
                    <label>Specialism:</label>
                    <input type="text" value={trainer.specialism} onChange={(e) => setTrainer({ ...trainer, specialism: e.target.value })} />
                </fieldset>

                <Submit />
            </form>
            <p>{new Date().toLocaleString()}</p>
        </div>
    );
});

export default TrainerForm;