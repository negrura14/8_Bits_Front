import { useState } from "react";
import { useDispatch } from "react-redux";


export default function UserSearchBar() {
    const [searchInput, setSearchInput] = useState('');
    // const dispatch = useDispatch();

    const changeHandler = (event) => {
        setSearchInput(event.target.value);
    }

    const submitHandler = (event) => {
        // dispatch(event)
    }

    return (
        <div>
            <form action="#" method="get" onSubmit={submitHandler(searchInput)}>
                <input required="" 
                    onChange={changeHandler} 
                    type="text"
                    placeholder="Search User">
                </input>
                <button type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
            </form>
        </div>
    )
}