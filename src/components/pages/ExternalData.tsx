import { startTransition, useActionState, useCallback, useEffect, useOptimistic, useState } from "react";
import type { TrainerType } from "../../types/trainers";
import RenderTrainers from "./external/RenderTrainers";
import TrainerForm from "./external/TrainerForm";

function ExternalData() {
    const defaultTrainers: TrainerType[] = sessionStorage.getItem("trainers") ? JSON.parse(sessionStorage.getItem("trainers")!) : [];

    const [trainers, dispatchAction] = useActionState<TrainerType[]>(trainersAction, defaultTrainers);
    const [optimisticTrainers, setOptimisticTrainers] = useOptimistic<TrainerType[]>(trainers);



    async function trainersAction(previousTrainers: TrainerType[], actionPayload) {
        switch (actionPayload.type) {
            case "INIT": {
                return actionPayload.payload.trainers;
            }
            case "ADD": {
                debugger;
                const { newTrainer } = actionPayload.payload;
                setOptimisticTrainers([...previousTrainers, newTrainer]);
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
                    return [...previousTrainers, data];

                } catch (error) {
                    console.error("Error submitting trainer data:", error);
                }
            }
                // case "REMOVE": {
                //     // return
                // }

                return previousTrainers;
        }
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
                    dispatchAction({ type: "INIT", payload: { trainers: data } });
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [dispatchAction]);

    const addTrainer = async (newTrainer: TrainerType) => {

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
                <TrainerForm addTrainer={(newTrainer) => dispatchAction({ type: "ADD", payload: { newTrainer } })} />
                <RenderTrainers trainers={optimisticTrainers.filter(trainer => trainer.name.toLowerCase().startsWith(filter.toLowerCase()))} />
            </div>
        </>
    );
}

export default ExternalData;