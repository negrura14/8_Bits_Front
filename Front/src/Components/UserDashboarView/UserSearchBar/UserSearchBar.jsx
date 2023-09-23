import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAction, getUsersAct } from "../../../Redux/userActions";
import UserSearchResult from "../UserSearchResult/UserSearchResult";

export default function UserSearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState("");
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.user.userState);
  

  useEffect(() => {
    dispatch(getUserProfileAction(searchData));
  }, [dispatch,searchData]);



  const changeHandler = (event) => {
    setSearchInput(event.target.value);
  };

  const handleClick = () => {
    setSearchData(searchInput);
  };

  return (
    <div>
      <div>
        <input
          required=""
          onChange={changeHandler}
          type="text"
          placeholder="Search User"
          value={searchInput}
        />
        <button type="submit" onClick={handleClick}>
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>

      <div>
        {Array.isArray(userProfile) 
        ? userProfile.map((user) => {
            return(
                <UserSearchResult
                key = {user.id}
                id = {user.id}
                disable = {user.disable}
                email = {user.email} 
                image = {user.image} 
                name = {user.name}
                lastname = {user.lastname} 
                nickname ={user.nickname}/>
            )}
           
        )
        : <p>{userProfile}</p> }
      </div>
    </div>
  );
}