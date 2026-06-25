import { memo, useRef, useState } from "react";
import type { TrainerType } from "../../../types/trainers";
import { useFormStatus } from "react-dom";
import Submit from "../../Submit";

const TrainerForm = memo(({ addTrainer }: { addTrainer: (newTrainer: TrainerType) => void }) => {


    async function formAction(formData: FormData) {
        console.log("Trainer Data:", formData);


        const trainer: TrainerType = {
            name: formData.get("name") as string,
            age: Number(formData.get("age")),
            specialism: formData.get("specialism") as string
        };
        addTrainer(trainer);

        // ref.current accesses the DOM element directly, allowing us to call focus() on it to set the cursor back to the name input field after submission.
        if (nameRef.current) {
            nameRef.current.focus();
        }
    }


    const { pending } = useFormStatus();

    console.log("Pending:", pending);


    const nameRef = useRef<HTMLInputElement>(null);
    return (
        <div>
            <form action={formAction}>

                <fieldset>
                    <label>Name:</label>
                    <input type="text" ref={nameRef} name="name" />
                    <label>Age:</label>
                    <input type="number" name="age" />
                    <label>Specialism:</label>
                    <input type="text" name="specialism" />
                </fieldset>

                <Submit />
            </form>
            <p>{new Date().toLocaleString()}</p>
        </div>
    );
});

export default TrainerForm;