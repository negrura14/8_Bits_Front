import axios from "axios"
import { useState,useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import validateUser from "../../../../Components/Create User/validateUser";
import bcrypt from "bcryptjs-react";

export default function AccountEdit({currentUser,allUsers}) {
    console.log(currentUser);
    const [input, setInput] = useState({
        name: "",
        lastname: "",
        email: "",
        currentPassword: "",
        password: "",
        confirmPassword: "",
      });

      const [errors, setErrors] = useState({
        name: "",
        lastname: "",
        email: "",
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

    function handleChange(e) {
        e.preventDefault();

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
     console.log("Errors:",errors);
    // console.log("Pass past validation:",input.currentPassword);
    
    const sumbitHandler = async (e) => {
        e.preventDefault();
        console.log("Submit button clicked!");

        const updatedFields = {};

        if (input.name !== currentUser.name && !errors.name && input.name !== "") {
            updatedFields.name = input.name;
          }
          
        
          if (input.lastname !== currentUser.lastname && !errors.lastname && input.lastname !== "") {
            updatedFields.lastname = input.lastname;
          }
        
          if (input.email !== currentUser.email && !errors.email && input.email !== "") {
            updatedFields.email = input.email;
          }

          if (input.password !== "" && !errors.password){
            updatedFields.password = input.password;
          } 

        console.log("Updated fields",updatedFields);

        axios
  .put(`/user/update/${currentUser.id}`, updatedFields) // Corrección en la URL
  .then((res) => { res,
    alert("Updated successfully");
    // Aquí puedes realizar otras acciones después de una actualización exitosa si es necesario
  })
  .catch((err) => {
    alert(err);
    // Aquí puedes manejar el error si ocurre algún problema en la solicitud
  });
    }

    return(
        <div>
            <h1>Here you can modify your account fields like the name, lastname, password and email</h1>

            <form onSubmit={(event) => sumbitHandler(event)}>
                <div className="mb-3 ">
                    <label className="form-label">Name</label>
                    <input
                        placeholder={currentUser.name}
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
                        placeholder={currentUser.lastname}
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
                        placeholder={currentUser.email}
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

            

            
            
            <div className="mb-3">
                <label className="form-label">Your current password</label>
                <input
                    placeholder="Enter your password"
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



            <div className="row mb-3">
                <label className="form-label">Your new password</label>
                <div className=" col-9">
                    <input
                    placeholder="Enter your password"
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
                <div className="mb-3 col-3 p-1">
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
            </div>      

            <div className="mb-3">
                <label className="form-label">Confirm your new password</label>
                <input
                    placeholder="Reenter your password"
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

            <button type="sumbit">SUMBIT CHANGES</button>

            </form>

        </div>
    )
}