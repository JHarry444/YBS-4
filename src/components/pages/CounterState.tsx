import { useState } from "react";

function Counter() {

    const [state, setState] = useState({
        count: 0,
        step: 1
    });

    const increment = () => {
        setState(prevState => ({
            ...prevState,
            count: prevState.count + prevState.step
        }));
    }

    const decrement = () => {
        setState(prevState => ({
            ...prevState,
            count: prevState.count - prevState.step
        }));
    }

    const setStep = (newStep: number) => {
        setState(prevState => ({
            ...prevState,
            step: newStep
        }));
    }

    return (
        <>
            <h1>Counter</h1>
            <div>
                <span>{state.count}</span>
                <br />
                <button onClick={decrement}>-</button>
                <input type="number" name="step" value={state.step}
                    onChange={(e) => setStep(Number(e.target.value))} />
                <button onClick={increment}>+</button>
            </div>

        </>
    );
}

export default Counter;