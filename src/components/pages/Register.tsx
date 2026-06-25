import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../../redux/Auth";

function Register() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    async function submitHandler(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const role = formData.get("role") as "USER" | "ADMIN";

        try {
            await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, role }),
            });

            console.log("Registering user:", { username, password, role });
            // auth?.login(username, role);
            dispatch(login({ name: username, role }));

            navigate("/"); // Redirect to home page after registration
        } catch (error) {
            console.error("Error registering user:", error);
        }
    }
    return (
        <>
            <h2>Register</h2>
            <form onSubmit={submitHandler}>
                <fieldset>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />

                    <label htmlFor="role">Role:</label>
                    <select id="role" name="role">
                        <option value="USER" selected>User</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </fieldset>


                <button type="submit">Register</button>
            </form>
        </>
    );
}

export default Register;