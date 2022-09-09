import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Link to='/mealplans'>go to meal plans</Link>
            <h1>Sign Up</h1>
            <Link to='/signup'>Sign Up</Link>
            <h1>Login</h1>
            <Link to='/login'>Login</Link>
            <h1>Home in Progress</h1>
            <Link to="/homeip">Home in Progress</Link>
        </div>
    )
}

export default Home