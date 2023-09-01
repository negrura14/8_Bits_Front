import './Home.css';
import DateTimeDisplay from '../Time/Time'

function Home() {
    return(
        <div className='home_container'>
            <div>
                <DateTimeDisplay />
            </div>
            <h1>Hola mundo</h1>
        </div>
    )
}

export default Home;