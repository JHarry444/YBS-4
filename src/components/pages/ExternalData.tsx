import { useEffect, useState } from "react";
import type { TrainerType } from "../../types/trainers";
import Trainer from "../Trainer";

function ExternalData() {
    const defaultTrainers: TrainerType[] = sessionStorage.getItem("trainers") ? JSON.parse(sessionStorage.getItem("trainers")!) : [];


    const [trainers, setTrainers] = useState<TrainerType[]>(defaultTrainers);


    useEffect(() => {
        async function fetchData() {
            // This is where we will fetch data from an API
            try {
                const res = await fetch("http://localhost:8080/trainers")
                const data = await res.json();
                console.log("DATA:", data);
                sessionStorage.setItem("trainers", JSON.stringify(data));
                setTrainers(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        const trainerInterval = setInterval(() => {
            fetchData();
        }, 5000);

        return () => clearInterval(trainerInterval);
    }, []);

    return (
        <>
            <h2>External Data</h2>
            <p>This is where we will fetch data from an API and display it.</p>
            {trainers.map((trainer) => (
                <Trainer key={trainer.id} name={trainer.name} age={trainer.age} specialism={trainer.specialism} />
            ))}
        </>
    );
}

export default ExternalData;