import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import defaultPhoto from '../../../Img/UserProfile/Avatars/default.jpeg'

export default function UserSearchResult(props) {
    const { id, disable, email, image, name, lastname, nickname, admin } = props;
    const [switcha, setSwitcha] = useState(disable);
    const [adminSwitch, setAdminSwitch] = useState(admin);

    const MySwal = withReactContent(Swal);

    const swalWithBootstrapButtons = MySwal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })


    useEffect(() => {
        setSwitcha(disable);
    }, [disable]);

    
    useEffect(() => {
        setAdminSwitch(admin);
    }, [admin]);

    const changeHandler = () => {
        if(switcha === false) {
            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: `You are going to ban ${name}`,
                icon: 'warning',
                background: "#1d1d1d",
                showCancelButton: true,
                confirmButtonText: "Yes, I'm sure",
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                  swalWithBootstrapButtons.fire(
                    'Success!',
                    `User ${name} banned!`,
                    'success'
                  )
                  const newSwitcha = !switcha;
                  setSwitcha(newSwitcha);
                  const banned = { disable: newSwitcha };
                  axios.put(`/user/update/${id}`, banned);
          
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'User not banned!',
                    'error'
                  )
                }
              })
    
        } else {
            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: `You are going to unban ${name}`,
                icon: 'warning',
                background: "#1d1d1d",
                showCancelButton: true,
                confirmButtonText: "Yes, I'm sure",
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                  swalWithBootstrapButtons.fire(
                    'Success!',
                    `User ${name} unbanned!`,
                    'success'
                  )
                  const newSwitcha = !switcha;
                  setSwitcha(newSwitcha);
                  const banned = { disable: newSwitcha };
                  axios.put(`/user/update/${id}`, banned);
          
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'User still banned!',
                    'error'
                  )
                }
              })
    
        }












        // const newSwitcha = !switcha;
        // setSwitcha(newSwitcha);
        // const banned = { disable: newSwitcha };
        // axios.put(`/user/update/${id}`, banned);
    }

    const adminHandler = () => {

        if(adminSwitch === false) {
            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: `You are going to give admin permissions to user ${name}`,
                icon: 'warning',
                background: "#1d1d1d",
                showCancelButton: true,
                confirmButtonText: "Yes, I'm sure",
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                  swalWithBootstrapButtons.fire(
                    'Success!',
                    `Now ${name} is admin!`,
                    'success'
                  )
                  const newAdminSwitch = !adminSwitch;
                  setAdminSwitch(newAdminSwitch);
                  const adminState = { admin: newAdminSwitch };
                  axios.put(`/user/update/${id}`, adminState);
          
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Permissions not granted!',
                    'error'
                  )
                }
              })
    
        } else {
            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: `You are going to remove admin permissions to ${name}`,
                icon: 'warning',
                background: "#1d1d1d",
                showCancelButton: true,
                confirmButtonText: "Yes, I'm sure",
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                  swalWithBootstrapButtons.fire(
                    'Success!',
                    `User ${name} is not admin!`,
                    'success'
                  )
                  const newAdminSwitch = !adminSwitch;
                  setAdminSwitch(newAdminSwitch);
                  const adminState = { admin: newAdminSwitch };
                  axios.put(`/user/update/${id}`, adminState);
          
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'User still admin!',
                    'error'
                  )
                }
              })
    
        }






        // const newAdminSwitch = !adminSwitch;
        // setAdminSwitch(newAdminSwitch);
        // const adminState = { admin: newAdminSwitch };
        // axios.put(`/user/update/${id}`, adminState);
    }

    return (
        <div className="productS">
            <div className="productS-img">
                <img src={image ? image : defaultPhoto} alt="Avatar" />
            </div>
            <div className="productS-content">
                <h3>{name} {lastname}</h3>
                <p className="productS-text price text-white-50">{nickname}</p>
                <p className="productS-text price text-white-50">{email} </p>
            </div>

            <Form className='productS-text price'>
                <Form.Check
                    type="switch"
                    id="custom-switch-disable"
                    label="Disable User"
                    checked={switcha}
                    onChange={changeHandler}
                />
                <Form.Check
                    type="switch"
                    id="custom-switch-admin"
                    label="Admin"
                    checked={adminSwitch}
                    onChange={adminHandler}
                />
            </Form>
        </div>
    );
}