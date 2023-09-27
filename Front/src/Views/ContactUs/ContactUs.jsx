import { useState } from "react";
import "./ContactUs.css";

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
        <div style={{color: "white"}}>
            <h1>Get in Touch</h1>
            <h3>Contact our team via email</h3>
            <form onSubmit={(event) => handleSumbit(event)}>

                <label>Email</label>
                <input 
                    placeholder="example@example.com"
                    type="text"
                    name="email"
                    value={input.email}
                    onChange={(event) => handleChange(event)}
                />
                {errors.email && <p>{errors.email}</p>}

                <label>Issue or reason</label>
                <textarea 
                    placeholder="What can we help with?"
                    rows="4" 
                    cols="50"
                    type="text"
                    name="issue"
                    value={input.issue}
                    onChange={(event) => handleChange(event)}
                />
                {errors.issue && <p>{errors.issue}</p>}

                <button type="sumbit">
                    SEND
                </button>

            </form>
        </div>
    );
}