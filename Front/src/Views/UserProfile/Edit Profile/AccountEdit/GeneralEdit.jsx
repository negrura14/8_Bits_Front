import axios from "axios"
import { useState } from "react"
import validateUser from "../../../../Components/Create User/validateUser";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function GeneralEdit({currentUser,allUsers,userProfile}) {
    //console.log(currentUser);
    const MySwal = withReactContent(Swal);
    const [isLoading, setIsLoading] = useState(false);

    const [input, setInput] = useState({
        name: "",
        lastname: "",
        email: "",
      });

      const [errors, setErrors] = useState({
        name: "",
        lastname: "",
        email: "",
      });

    const [focusedField, setFocusedField] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    function handleBlur(e) {
        setFocusedField(null);
        // Resto de la lógica de onBlur
    }

    function handleFocus(e) {
        setFocusedField(e.target.name);
    }

    function handleChange(e) {
        e.preventDefault();

        
            setInput({
            ...input,
            [e.target.name]: e.target.value,
            });
    
            setErrors(
            validateUser(
                {
                ...input,
                [e.target.name]: e.target.value,
                },
                allUsers
            )
            );
        

    }

    
     //console.log("Errors:",errors);
    // console.log("Pass past validation:",input.currentPassword);
    
    const sumbitHandler = async (e) => {
        e.preventDefault();

        MySwal.fire({
            title: 'Updating data',
            text: 'Please wait...',
            allowOutsideClick: false, // Evita que el usuario cierre la alerta haciendo clic fuera
            onBeforeOpen: () => {
              Swal.showLoading(); // Muestra un spinner de carga en la alerta
            },
          });

        setIsLoading(true);

        const updatedFields = {};

          if (errors.name) {
            MySwal.fire({
                title: <strong>WARNING</strong>,
                html: <i>You are triying to update the field "name" with an error, please check it and try again</i>,
                icon: 'warning',     
                background : "#1d1d1d",
                customClass:{
                  container: 'custom-alert-container',
                }
              });
            return;
        } else if (input.name !== currentUser.name && input.name !== ""){
            updatedFields.name = input.name;
        }
          
          if (errors.lastname) {
            MySwal.fire({
                title: <strong>WARNING</strong>,
                html: <i>You are triying to update the field "lastname" with an error, please check it and try again</i>,
                icon: 'warning',     
                background : "#1d1d1d",
                customClass:{
                  container: 'custom-alert-container',
                }
              });
            return;
        } else if (input.lastname !== currentUser.lastname && input.lastname !== ""){
            updatedFields.lastname = input.lastname;
        }

        if (errors.email) {
            MySwal.fire({
                title: <strong>WARNING</strong>,
                html: <i>You are triying to update the field "email" with an error, please check it and try again</i>,
                icon: 'warning',     
                background : "#1d1d1d",
                customClass:{
                  container: 'custom-alert-container',
                }
              });
            return;
        } else if (input.email !== currentUser.email && input.email !== ""){
            updatedFields.email = input.email;
        }

        axios
        .put(`/user/update/${currentUser.id}`, updatedFields) // Corrección en la URL
        .then((res) => { res,
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
            <h2 className="mb-3">Here you can modify your account</h2>

            <form onSubmit={(event) => sumbitHandler(event)}>
                <div className="mb-3 ">
                    <label className="form-label">Name</label>
                    <input
                        placeholder={userProfile.name}
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={(event) => handleChange(event)}
                        onBlur={(event) => handleBlur(event)}
                        onFocus={(event) => handleFocus(event)}
                        className="form-control bg-transparent text-white"
                    />
                    {focusedField === "name" && errors.name && <p className="text-danger">{errors.name}</p>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Lastname</label>
                    <input
                        placeholder={userProfile.lastname}
                        type="text"
                        name="lastname"
                        value={input.lastname}
                        onChange={(event) => handleChange(event)}
                        onBlur={(event) => handleBlur(event)}
                        onFocus={(event) => handleFocus(event)}
                        className="form-control bg-transparent text-white"
                    />
                    {focusedField === "lastname" && errors.lastname && (
                        <p className="text-danger">{errors.lastname}</p>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        placeholder={userProfile.email}
                        type="text"
                        name="email"
                        value={input.email}
                        onChange={(event) => handleChange(event)}
                        onBlur={(event) => handleBlur(event)}
                        onFocus={(event) => handleFocus(event)}
                        className="form-control bg-transparent text-white"
                    />
                    {focusedField === "email" && errors.email && <p className="text-danger">{errors.email}</p>}
                </div>

            <button className="mt-3" type="submit">SUBMIT CHANGES</button>

            </form>

        </div>
        </div>
    )
}