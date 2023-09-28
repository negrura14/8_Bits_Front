import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAction, getUsersAct } from "../../../Redux/userActions";
import UserSearchResult from "../UserSearchResult/UserSearchResult";
import "./UserSearchBar.css"

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


  const [isTableVisible, setTableVisibility] = useState(false);
  const productSClasses =  isTableVisible ? 'productSs' : 'productSs productSs-table';

  const toggleTable = () => {
    setTableVisibility(!isTableVisible);
  }

  return (
    <div className=" bg-transparent">
    <div className="row">

    <div className="col-6">
    <div className="searchU-box">
    
    <button  className="btn-searchU" type="submit" onClick={handleClick}>
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
        <input required=""
        className="input-searchU"
          onChange={changeHandler}
          type="text"
          placeholder="Search User"
          value={searchInput} />
  </div>

        
        
    </div>
    <div className="col-6 d-flex justify-content-end">
    <div className="buttons-container">
  <button id="view" className="button-arounder"  onClick={toggleTable}>Switch View</button>
</div>
            
          </div>

      </div>

      <div className="table-div">

      <div className={productSClasses}>
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
                nickname ={user.nickname}
                admin = {user.admin}/>
            )}
           
        )
        : <p>{userProfile}</p> }
      </div>
      </div>
    </div>
  );
}