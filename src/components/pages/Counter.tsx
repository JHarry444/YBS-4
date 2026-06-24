import { useReducer } from "react";
import { counterReducer } from "../../reducers";



function Counter() {

    const [state, dispatch] = useReducer(counterReducer, {
        count: 0,
        step: 11
    });

    return (
        <>
            <h1>Counter</h1>
            <div>
                <span>{state.count}</span>
                <br />
                <button onClick={() => dispatch({ type: "decrement" })}>-</button>
                <input type="number" name="step" value={state.step}
                    onChange={(e) => dispatch({ type: "setStep", payload: Number(e.target.value) })} />
                <button onClick={() => dispatch({ type: "increment" })}>+</button>
            </div>

        </>
    );
}

export default Counter;