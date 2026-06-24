export const counterReducer = (state: { count: number; step: number }, action: { type: string, payload?: number }) => {
    switch (action.type) {
        case "increment":
            return { ...state, count: state.count + state.step };
        case "decrement":
            return { ...state, count: state.count - state.step };
        case "setStep":
            return { ...state, step: action.payload };
        default:
            return state;
    }
}
