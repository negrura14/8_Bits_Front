import { Country, State, City }  from 'country-state-city';
export default function AvatarEdit() {
    console.log(Country.getAllCountries());
    console.log(State.getAllStates());
    console.log(City.getAllCities());
    return(
        <div>
            Estamos en AvatarEdit
        </div>
    )
}