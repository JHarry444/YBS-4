import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import type { TrainerType } from "../../types/trainers";
import Trainer from "../Trainer";

function FilteredTrainer() {

    const [searchParams] = useSearchParams();

    console.log("Search Params:", searchParams.toString());

    const name = searchParams.get("name");
    const age = searchParams.get("age");
    const specialism = searchParams.get("specialism");

    console.log("Name:", name);
    console.log("Age:", age);
    console.log("Specialism:", specialism);

    const [trainers, setTrainers] = useState<TrainerType[]>([]);


    useEffect(() => {
        async function fetchData() {
            // This is where we will fetch data from an API
            try {
                const res = await fetch("http://localhost:8080/trainers")
                const data = await res.json();
                console.log("DATA:", data);
                setTrainers(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);



    return (
        <>
            <h1>Loading a specific trainer using query parameters</h1>
            {
                trainers
                    .filter((trainer) => {
                        if (name && trainer.name !== name) {
                            return false;
                        }
                        if (age && trainer.age !== parseInt(age)) {
                            return false;
                        }
                        if (specialism && trainer.specialism !== specialism) {
                            return false;
                        }
                        return true;
                    }).map((trainer) =>
                        <Trainer key={trainer.id} name={trainer.name} age={trainer.age} specialism={trainer.specialism} />)
            }
        </>
    );
}

export default FilteredTrainer;