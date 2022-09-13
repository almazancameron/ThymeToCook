import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Link to='/mealplans'>go to meal plans</Link>
            <br/>
            <Link to='/recipes'>go to recipes</Link>
        </div>
    )
}

export default Home