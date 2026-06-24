import { startTransition, useActionState, useEffect, useOptimistic, useState } from "react";
import type { TrainerType } from "../../types/trainers";
import RenderTrainers from "./external/RenderTrainers";
import TrainerForm from "./external/TrainerForm";

function ExternalData() {
    const defaultTrainers: TrainerType[] = sessionStorage.getItem("trainers") ? JSON.parse(sessionStorage.getItem("trainers")!) : [];


    // const [trainers, setTrainers] = useState<TrainerType[]>(defaultTrainers);


    const [trainers, dispatchAction, isPending] = useActionState(trainersAction, defaultTrainers);
    const [optimisticTrainers, setOptimisticTrainers] = useOptimistic(trainers);

    async function handleAdd(newTrainer: TrainerType) {
        startTransition(() => {
            setOptimisticTrainers([...optimisticTrainers, newTrainer]);
            dispatchAction({ type: 'ADD', payload: { newTrainer } });
        });
    }


    async function trainersAction(prevTrainers, actionPayload) {
        switch (actionPayload.type) {
            case 'INIT': {
                return actionPayload.payload.trainers;
            }
            case 'ADD': {
                return await addTrainer(prevTrainers, actionPayload.payload.newTrainer);
            }
            case 'REMOVE': {
                // return await removeTrainer(prevTrainers);
            }
        }
        return prevTrainers;
    }




    useEffect(() => {
        async function fetchData() {
            // This is where we will fetch data from an API
            try {
                const res = await fetch("http://localhost:8080/trainers")
                const data = await res.json();
                console.log("DATA:", data);
                sessionStorage.setItem("trainers", JSON.stringify(data));

                startTransition(() => {
                    dispatchAction({ type: 'INIT', payload: { trainers: data } });
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
        // const trainerInterval = setInterval(() => {
        //     fetchData();
        // }, 5000);

        // return () => clearInterval(trainerInterval);
    }, []);

    const addTrainer = async (prevTrainers: TrainerType[], newTrainer: TrainerType) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 2_000)); // Simulate a delay for demonstration purposes
            const res = await fetch("http://localhost:8080/trainers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTrainer)
            });
            const data = await res.json();
            console.log("Response Data:", data);
            return [...prevTrainers, data];


        } catch (error) {
            console.error("Error submitting trainer data:", error);
        }

        return prevTrainers;
    }

    const [filter, setFilter] = useState("");



    return (
        <>
            <h2>External Data</h2>
            <label htmlFor="filter">Filter:</label>
            <input
                type="text"
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
                <TrainerForm addTrainer={handleAdd} />
                <RenderTrainers trainers={optimisticTrainers.filter(trainer => trainer.name.toLowerCase().startsWith(filter.toLowerCase()))} />
            </div>
        </>
    );
}

export default ExternalData;