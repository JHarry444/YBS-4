import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import Trainer from "./Trainer";

function SpecificTrainer() {

    // const params = useParams();
    // console.log("PARAMS:", params);

    // const [trainer, setTrainer] = useState({
    //     id: "",
    //     name: "",
    //     age: 0,
    //     specialism: ""
    // });



    // useEffect(() => {
    //     async function fetchTrainer() {
    //         try {
    //             const res = await fetch(`http://localhost:8080/trainers/${params.id}`);
    //             const data = await res.json();
    //             console.log("DATA:", data);
    //             setTrainer(data);
    //         } catch (error) {
    //             console.error("Error fetching trainer:", error);
    //         }
    //     }
    //     fetchTrainer();
    // }, [params.id]);


    const trainer = useLoaderData();

    console.log("DATA:", trainer);


    const navigate = useNavigate();

    return (
        <>
            <h1>Loading a specific trainer using path parameters</h1>
            <Trainer name={trainer.name} age={trainer.age} specialism={trainer.specialism} />
            <button onClick={() => navigate(-1)}>Back</button>
        </>
    );
}

export default SpecificTrainer;