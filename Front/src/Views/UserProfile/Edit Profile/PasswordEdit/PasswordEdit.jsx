import axios from "axios";
import { useState } from "react";
import validateUser from "../../../../Components/Create User/validateUser";
import bcrypt from "bcryptjs-react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function PasswordEdit({currentUser,allUsers}) {

    const MySwal = withReactContent(Swal);
    const [isLoading, setIsLoading] = useState(false);

    const [input, setInput] = useState({
        currentPassword: "",
        password: "",
        confirmPassword: "",
      });

    const [errors, setErrors] = useState({
        currentPassword: "",
        password: "",
        confirmPassword: "",
      });

    const [focusedField, setFocusedField] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);

    function handleBlur(e) {
        setFocusedField(null);
        // Resto de la lógica de onBlur
    }

    function handleFocus(e) {
        setFocusedField(e.target.name);
    }

    function handleChange(e){
        if(e.target.name === "currentPassword") {
            setInput({
                ...input,
                currentPassword: e.target.value
            })
        } else {
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
    }

    function handlePassword(e){
        e.preventDefault();

        //console.log(input.currentPassword,"current pass");
        bcrypt.compare(input.currentPassword, currentUser.password, (err, isMatch) => {
        if (err) {
            console.error("Error al comparar contraseñas", err);
            return;
        }

        if (isMatch) {
            console.log("Contraseña actual válida");
            setIsCurrentPasswordValid(true);
            setErrors({
                ...errors,
                currentPassword: ""
            })
        } else {
            console.log("Contraseña actual inválida");
            setIsCurrentPasswordValid(false);
            setErrors({
                ...errors,
                currentPassword: "Password incorrect"
            })
            // Puedes manejar esto de acuerdo a tus requerimientos, como mostrar un mensaje de error.
        }
    });
    }
    console.log(errors);
    // function hashingPassword(){
    //     bcrypt.hash(input.password,10,(err,hashedPassword) => {
    //         if(err){
    //             alert("Error hashing password", err)
    //         } else {
    //             const newPassword = {password:hashedPassword}
    //         }
    //     })
    // }

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
        
        
        if (errors.password  || errors.confirmPassword ) {
            alert("Error in the fields");
            return;
        } else {
            bcrypt.hash(input.password,10,(err,hashedPassword) => {
                if(err){
                    alert("Error hashing password", err)
                } else {
                    const newPassword = {password:hashedPassword}
                    
                    axios
                        .put(`/user/update/${currentUser.id}`, newPassword) // Corrección en la URL
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
            })
           

        }

    }
    
    return(
        <div className="row justify-content-center">

        <div className="text-primary px-4 m-5 login-box col-md-6 col-sm-10">
            <h2 className="mb-3">Here you can modify you password</h2>

            <form onSubmit={(event) => sumbitHandler(event)}>
                <div className="mb-3">
                    <label className="form-label">Your current password</label>
                    <input
                        placeholder="Current password"
                        type="password"
                        name="currentPassword"
                        value={input.currentPassword}
                        onChange={(event) => handleChange(event)}
                        onBlur={(event) => handlePassword(event)}
                        onFocus={(event) => handleFocus(event)}
                        className="form-control bg-transparent text-white"
                    />
                    {errors.currentPassword && (
                        <p className="text-danger">{errors.currentPassword}</p>
                    )}
                </div>



                <div className="row ">
                    <div className=" col-5">
                    <label className="form-label">Your new password</label>
                        <input
                        placeholder="Enter your new password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={input.password}
                        onChange={(event) => handleChange(event)}
                        onBlur={(event) => handleBlur(event)}
                        onFocus={(event) => handleFocus(event)}
                        className="form-control bg-transparent text-white"
                        disabled={!isCurrentPasswordValid}
                        />
                    </div>
                    <div className="mb-3 col-2 d-flex justify-content-center align-items-center">
                        <a
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        >
                        {showPassword ? (
                            <i className="fa-regular fa-eye-slash text-secondary"></i>
                        ) : (
                            <i className="fa-regular fa-eye "></i>
                        )}
                        </a>
                    </div>
                    {focusedField === "password" && errors.password && (
                        <p className="text-danger">{errors.password}</p>
                        )}
                <div className="mb-3 col-5">
                    <label className="form-label">Confirm your new password</label>
                    <input
                        placeholder="Confirm your new password"
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={input.confirmPassword}
                        onChange={(event) => handleChange(event)}
                        onBlur={(event) => handleBlur(event)}
                        onFocus={(event) => handleFocus(event)}
                        className="form-control bg-transparent text-white"
                        disabled={!isCurrentPasswordValid}
                    />
                    {focusedField === "confirmPassword" && errors.confirmPassword && (
                        <p className="text-danger">{errors.confirmPassword}</p>
                    )}
                </div>
                </div>      


                <button className="mt-3" type="submit">SUBMIT CHANGES</button>
            </form>

        </div>
        </div>
    )
}