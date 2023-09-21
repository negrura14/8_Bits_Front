import axios from "axios"
import { useState,useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"

export default function AboutEdit() {

    const [input, setInput] = useState({
        nickname: "",
        description: "",
        country: "",
        phone: "",
      });

      const [errors, setErrors] = useState({
        nickname: "",
        description: "",
        country: "",
        phone: "",
      });

    return(
        <div>
            <h1>Here you can modify you description, nickname, location and phone number!</h1>

            <form>

                <div>
                    <label>Nickname</label>
                    <input 
                        placeholder="Enter your nickname"
                        type="text"
                        name="nickname"
                        value={input.nickname}
                        onChange={(event) => handleChange(event)}
                        onBlur={(event) => handleBlur(event)}
                        onFocus={(event) => handleFocus(event)}
                        className="form-control bg-transparent text-white"
                    />
                </div>

                <div>
                    <label>Description</label>
                    <input 
                        placeholder="Enter your description"
                        type="text"
                        name="description"
                        value={input.description}
                        onChange={(event) => handleChange(event)}
                        onBlur={(event) => handleBlur(event)}
                        onFocus={(event) => handleFocus(event)}
                        className="form-control bg-transparent text-white"
                    />
                </div>

                <div>
                    <label>Location</label>
                    <input 
                        placeholder="Enter your location"
                        type="text"
                        name="country"
                        value={input.country}
                        onChange={(event) => handleChange(event)}
                        onBlur={(event) => handleBlur(event)}
                        onFocus={(event) => handleFocus(event)}
                        className="form-control bg-transparent text-white"
                    />
                </div>

                <div>
                    <label>Phone</label>
                    <input 
                        placeholder="Enter your phone"
                        type="number"
                        name="phone"
                        value={input.phone}
                        onChange={(event) => handleChange(event)}
                        onBlur={(event) => handleBlur(event)}
                        onFocus={(event) => handleFocus(event)}
                        className="form-control bg-transparent text-white"
                    />
                </div>

            </form>
        </div>
    )
}