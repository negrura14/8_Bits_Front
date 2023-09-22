import "./AvatarEdit.css";

import axios from "axios";
import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import UploadWidget from "../../../../Helpers/UploadWidget"; 
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function AvatarEdit({currentUser}) {
    const [selectedAvatar,setSelectedAvatar] = useState(null);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const MySwal = withReactContent(Swal);

    const predefinedAvatars = [
        "https://res.cloudinary.com/bits8/image/upload/v1695360325/Avatar%20Images/s5g4pfeg3fnpsoe14tlw.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360325/Avatar%20Images/ftme8psm1dbrgyjltb6w.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360325/Avatar%20Images/weccmfsmynxh6pmgqi6s.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360324/Avatar%20Images/yb9tp77q7ph83ascfg14.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360324/Avatar%20Images/tliwx46fp9xmsdmdvp94.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360324/Avatar%20Images/hkdublvnilabiywcafvm.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360324/Avatar%20Images/kdvjin7jh1252k5cfxdt.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360323/Avatar%20Images/p2p95vmswyfkagjwkjov.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360322/Avatar%20Images/bhx0fkjzm7r44ayc5hbi.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360322/Avatar%20Images/dopteudvfe5up1yjqr2k.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360322/Avatar%20Images/p4os4tygfqxsh2yzw1ok.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360321/Avatar%20Images/crwto7a9casuswgwvgj9.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360321/Avatar%20Images/nqo4oal2hittbbutkdxk.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360321/Avatar%20Images/jxgzljaj8cqjabk1hr5m.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360321/Avatar%20Images/lgxpwkhmukzalf6hfhqi.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360321/Avatar%20Images/tlptaz2zmcshkpza7knq.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360321/Avatar%20Images/obqld0sy4cqmygibdxis.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360321/Avatar%20Images/c60qyn3g71cauwwulmzo.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360321/Avatar%20Images/phatrmwyzchqsf1vxx7m.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695360321/Avatar%20Images/ilr3kkdizyjn7dtp3nfm.jpg",
      ];

    const handleSelectAvatar = (avatarUrl) => {
      setSelectedAvatar(avatarUrl);
    }
    const updateFields = {image:selectedAvatar};
    console.log(updateFields);

    const handleSumbit = (e) => {
      e.preventDefault();

      MySwal.fire({
        title: 'Updating data',
        text: 'Please wait...',
        allowOutsideClick: false, // Evita que el usuario cierre la alerta haciendo clic fuera
        onBeforeOpen: () => {
          Swal.showLoading(); // Muestra un spinner de carga en la alerta
        },
      });

      const updateField = {image:selectedAvatar};

      setIsLoading(true);

      axios
          .put(`/user/update/${currentUser.id}`, updateField)
          .then((res) => {
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
    <Container>
      <Row>
        <form onSubmit={handleSumbit}>
          <h3>Choose your avatar:</h3>
          {predefinedAvatars.map((avatar,index) => (
              <Col xs={6} md={2} key={index}>
              <Image 
                src={avatar} 
                className={`avatar-thumbnail ${avatar === selectedAvatar ? 'selected' : ''}`}
                style={{ maxWidth: '185px', maxHeight: '185px' }}
                onClick={() => handleSelectAvatar(avatar)}  
              />
              </Col>
          ))}
        <h3>Or upload your avatar:</h3>
        <UploadWidget 
          onImageUpload={handleSelectAvatar}
          setIsUploadingImage={setIsUploadingImage}
          selectedImage={selectedAvatar}
          setSelectedImage={setSelectedAvatar}
          isUploadingImage={isUploadingImage}
          />
        {selectedAvatar && (
          <div>
            <h3>Selected avatar:</h3>
            <Image src={selectedAvatar} thumbnail style={{ maxWidth: '200px', maxHeight: '200px' }}/>
          </div>
        )}

        <button type="sumbit" disabled={!selectedAvatar || isUploadingImage}>
          SAVE AVATAR
        </button>
        </form>
      </Row>
    </Container>
    )
}