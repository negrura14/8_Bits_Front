import { useState } from "react";
import "./ContactUs.css";
import contactImage from "../../Img/contactImage.jpeg"

export default function ContactUs(){

    const [input,setInput] = useState({
        email: "",
        issue: "",
    })

    const [errors,setErrors] = useState({
        email: "",
        issue: "",
    })

    const validate = () => {
        let errors = {};

        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(input.email && !regexEmail.test(input.email)){
            errors.email = "Please enter a correct email"
        }

        if(input.issue && input.issue.length > 200){
            errors.issue = "Too long"
        }

        return errors;
    }

    const handleChange = (e) => {

        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });

        setErrors(validate());

    }

    const handleSumbit = (e) => {
        e.preventDefault();

        alert("Success");
    }

    return(
        <div className="container">
        <div className="row justify-content-center my-5">

        <div className="col-10 login-box">
            <div className="row">
            <div class="col-md-6 pt-5 ">
              
              <img src={contactImage} alt="Image" class="img-fluid imgContact"/>

            </div>
                <div class="col-md-6">
                <div className="p-5">

                <h2 className="text-center text-white">Get in Touch</h2>
            <p className="textContact text-white-50">Contact our team via email</p>
            <form onSubmit={(event) => handleSumbit(event)}>

            <div className="mb-3">

                <label className="form-label text-primary">Email</label>
                <input 
                    placeholder="example@example.com"
                    type="text"
                    name="email"
                    value={input.email}
                    onChange={(event) => handleChange(event)}
                    className="form-control bg-transparent text-white"
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="mb-3">

                <label className="form-label text-primary">Issue or reason</label>
                <textarea 
                    placeholder="What can we help with?"
                    rows="4" 
                    cols="50"
                    type="text"
                    name="issue"
                    value={input.issue}
                    onChange={(event) => handleChange(event)}
                    className="form-control bg-transparent text-white"
                />
                {errors.issue && <p className="error-message">{errors.issue}</p>}
            </div>



                <button type="sumbit">
                    SEND
                </button>

            </form>
                </div>
                    
                </div>
            </div>
        </div>
        </div>
            
        </div>
    );
}