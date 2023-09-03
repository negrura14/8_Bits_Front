import './Home.css';
import DateTimeDisplay from '../Time/Time'
import { Card } from '../Card/Card';



function Home() {
    return(
        <div className='home_container'>
            <div>
                <DateTimeDisplay />
                <Card/>
            </div>
            

            
        </div>
    )
    

    
}

export default Home;