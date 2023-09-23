import axios from "axios";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Country, State, City }  from 'country-state-city';
import validateAbout from "./validateAbout";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function AboutEdit({currentUser,allUsers,userProfile}) {

    const MySwal = withReactContent(Swal);
    
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

   // const locationComplete = [input.country,input.state,input.city].join(", ");
    //console.log(locationComplete);
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


        MySwal.fire({
            title: 'Updating data',
            text: 'Please wait...',
            allowOutsideClick: false, // Evita que el usuario cierre la alerta haciendo clic fuera
            onBeforeOpen: () => {
              Swal.showLoading(); // Muestra un spinner de carga en la alerta
            },
          });
        

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

          setIsLoading(true);

          axios
          .put(`/user/update/${currentUser.id}`, updatedFields) // Corrección en la URL
          .then((res) => {
              window.location.reload();
            })
            .catch((err) => {
                alert(err);
                // Aquí puedes manejar el error si ocurre algún problema en la solicitud
            })
            .finally(() => {
                setIsLoading(false); // Establecer isLoading en false cuando la solicitud haya finalizado
              });  
            
    }
    


    return(
        <div className="row justify-content-center">

        <div className="text-primary px-4 m-5 login-box col-md-6 col-sm-10">
            
            <h2 className="mb-3" >Here you can modify other data!</h2>

            <form onSubmit={(event) => sumbitHandler(event)}>

                <div className="mb-3 ">
                    <label className="form-label">nickName</label>
                    <input 
                        placeholder={userProfile.nickName ? userProfile.nickName : "Enter your nickName"}
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
                        placeholder={userProfile.description ? userProfile.description : "Enter your description"}
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
                <div className="row">

                <div className="mb-3 col-4 ">
                    <label className="form-label">Country</label>
                    <select
                        id="country"
                        name="country"
                        value={input.countryCode}
                        onChange={handleCountryChange}
                        className="form-select bg-transparent text-white-50 m-2"
                    >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                            <option key={country.isoCode} value={country.isoCode}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3 col-4">
                    <label htmlFor="state">State</label>
                    <select
                    className="form-select bg-transparent text-white-50 m-2"
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

                <div className="mb-3 col-4">
                    <label htmlFor="city">City</label>
                    <select
                    className="form-select bg-transparent text-white-50 m-2"
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
                </div>

                <div className="mb-3 ">
                    <label className="form-label">Phone</label>
                    <input 
                        placeholder={userProfile.phone ? userProfile.phone : "Enter your phone"}
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

                <button className="mt-3" type="submit">
                    SUBMIT CHANGES
                </button>
            </form>
        </div>
        </div>
    )
}