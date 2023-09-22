import axios from "axios";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Country, State, City }  from 'country-state-city';
import validateAbout from "./validateAbout";

export default function AboutEdit({currentUser,allUsers}) {
    const navigate = useNavigate();
    
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [input, setInput] = useState({
        nickName: "",
        description: "",
        country: "",
        countryCode: "",
        state: "",
        stateCode: "",
        city: "",
        phone: ""
      });

      const [errors, setErrors] = useState({
        nickName: "",
        description: "",
        country: "",
        countryCode: "",
        state: "",
        city: "",
        phone: ""
      });

    useEffect(() => {
        const countriesList = Country.getAllCountries();
        setCountries(countriesList)
    }, []);
    
    //--------------funciones para manejar la carga de la ubicacion------------//
    const handleCountryChange = (event) => {
        const selectedCountry = event.target.value;
        const selectedCountryName = countries.find(
            (country) => country.isoCode === selectedCountry
          ).name;

          setInput((prevInput) => ({
            ...prevInput,
            country: selectedCountryName,
            countryCode: selectedCountry, // Almacena el código ISO del país
          }));
    
        // Obtener los estados del país seleccionado
        const countryStates = State.getStatesOfCountry(selectedCountry);
        setStates(countryStates);
    };
    
    const handleStateChange = (event) => {
        const selectedState = event.target.value;
        const selectedStateName = states.find(
            (state) => state.isoCode === selectedState
          ).name;

          setInput((prevInput) => ({
            ...prevInput,
            state: selectedStateName,
            stateCode: selectedState
          }));
    
        // Obtener las ciudades del estado seleccionado
        const stateCities = City.getCitiesOfState(input.countryCode, selectedState);
        setCities(stateCities);
    };
    
    //console.log("Pais:",input.country,",Provincia:",input.state,",Ciudad:",input.city);

    const locationComplete = [input.country,input.state,input.city].join(", ");
    console.log(locationComplete);
    //----------------------------------------------------------------------------//

    function handleChange(e){
        e.preventDefault();

        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })

        setErrors(
            validateAbout(
                {
                [e.target.name]: e.target.value,
                },
                allUsers
            )
        )
    }

    function sumbitHandler(e){
        e.preventDefault();

        const updatedFields = {};

        if (input.nickName !== currentUser.nickName && !errors.nickName && input.nickName !== "") {
            updatedFields.nickName = input.nickName;
          }
        
          if (input.description !== currentUser.description && !errors.description && input.description !== "") {
            updatedFields.description = input.description;
          }
          
          if (input.phone !== currentUser.phone && !errors.phone && input.phone !== "") {
            updatedFields.phone = input.phone;
          }

          if (input.country !== "" && input.state !== "" && input.city !== "") {
            let completeLocation = [input.country,input.state,input.city].join(", ")
            updatedFields.country = completeLocation;
          }

          axios
          .put(`/user/update/${currentUser.id}`, updatedFields) // Corrección en la URL
          .then((res) => {
              alert("Updated successfully");
              // Aquí puedes realizar otras acciones después de una actualización exitosa si es necesario
              //window.location.reload()
            })
            .catch((err) => {
                alert(err);
                // Aquí puedes manejar el error si ocurre algún problema en la solicitud
            });  
            
    }
    

    return(
        <div>
            <h1>Here you can modify you description, nickName, location and phone number!</h1>

            <form onSubmit={(event) => sumbitHandler(event)}>

                <div className="mb-3 ">
                    <label className="form-label">nickName</label>
                    <input 
                        placeholder="Enter your nickName"
                        type="text"
                        name="nickName"
                        value={input.nickName}
                        onChange={(event) => handleChange(event)}
                        //onBlur={(event) => handleBlur(event)}
                        //onFocus={(event) => handleFocus(event)}
                        className="form-control bg-transparent text-white"
                    />
                    {errors.nickName && (
                        <p className="text-danger">{errors.nickName}</p>
                    )}
                </div>

                <div className="mb-3 ">
                    <label className="form-label">Description</label>
                    <input 
                        placeholder="Enter your description"
                        type="text"
                        name="description"
                        value={input.description}
                        onChange={(event) => handleChange(event)}
                        //onBlur={(event) => handleBlur(event)}
                        //onFocus={(event) => handleFocus(event)}
                        className="form-control bg-transparent text-white"
                    />
                    {errors.description && (
                        <p className="text-danger">{errors.description}</p>
                    )}
                </div>

                <div className="mb-3 ">
                    <label className="form-label">Country</label>
                    <select
                        id="country"
                        name="country"
                        value={input.countryCode}
                        onChange={handleCountryChange}
                    >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                            <option key={country.isoCode} value={country.isoCode}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="state">State</label>
                    <select
                        id="state"
                        name="state"
                        value={input.stateCode}
                        onChange={handleStateChange}
                        disabled={!input.country} // Deshabilita si no se ha seleccionado un país
                    >
                        <option value="">Select a state</option>
                        {states.map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>
                            {state.name}
                        </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="city">City</label>
                    <select
                        id="city"
                        name="city"
                        value={input.city}
                        onChange={(e) => setInput({ ...input, city: e.target.value })}
                        disabled={!input.state} // Deshabilita si no se ha seleccionado un estado
                    >
                        <option value="">Select a city</option>
                        {cities.map((city) => (
                        <option key={city.name} value={city.name}>
                            {city.name}
                        </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3 ">
                    <label className="form-label">Phone</label>
                    <input 
                        placeholder="Enter your phone"
                        type="tel"
                        name="phone"
                        value={input.phone}
                        onChange={(event) => handleChange(event)}
                        //onBlur={(event) => handleBlur(event)}
                        //onFocus={(event) => handleFocus(event)}
                        className="form-control bg-transparent text-white"
                    />
                    {errors.phone && (
                        <p className="text-danger">{errors.phone}</p>
                    )}
                </div>

                <button type="sumbit">
                    SUMBIT CHANGES
                </button>

            </form>
        </div>
    )
}