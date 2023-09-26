import "./BackgroundEdit.css";

import axios from "axios";
import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


export default function BackgroundEdit ({currentUser}) {
    const [selectedBackground,setSelectedBackground] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const MySwal = withReactContent(Swal);

    const predefinedBackgrounds = [
        "https://res.cloudinary.com/bits8/image/upload/v1695749232/Background%20profile%20images/bxxwiswhyr6jfcqmzezi.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695749232/Background%20profile%20images/h055bdxf7xyzcdwttbqx.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695749231/Background%20profile%20images/anavedrsmcm9v3nytbm7.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695749231/Background%20profile%20images/axxxhotixmkg0kc0uqza.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695749231/Background%20profile%20images/jfpwr5en8m8qsqwyvyvt.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695749231/Background%20profile%20images/tcrukcxfelwaz92xqfdq.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695749231/Background%20profile%20images/yiotknagcwm9xact6nqw.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695749231/Background%20profile%20images/rap1bgch5tbyiy0unpf5.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695749231/Background%20profile%20images/n0up3rozuwxnzooyzgcb.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695749231/Background%20profile%20images/oumhuai2if1aix4zjrct.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695749231/Background%20profile%20images/k0pzvgtrypsiwdq6jbza.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695749231/Background%20profile%20images/q7ivv4j8n4fpif0iy5j7.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695749231/Background%20profile%20images/mwobr0tzxiv6htirnifw.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695749231/Background%20profile%20images/mfusxetcaulhlg8czifr.jpg",
        "https://res.cloudinary.com/bits8/image/upload/v1695698494/Background%20profile%20images/urrrxq35zjog46z2uyqe.jpg",
    ];

    const handleSelectBack = (backgroundUrl) => {
        setSelectedBackground(backgroundUrl);
    }

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
        
        const updatedField = {imageBackground:selectedBackground};

        setIsLoading(true);

        axios
          .put(`/user/update/${currentUser.id}`, updatedField)
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
        <div>

            <form onSubmit={handleSumbit}>
                <h1>Select your background image:</h1>
                {predefinedBackgrounds.map((background,index) => (
                    <Col xs={6} md={3} key={index}>
                        <Image 
                            src={background}
                            thumbnail
                            style={{ maxWidth: '280px', maxHeight: '280px' }}
                            onClick={() => handleSelectBack(background)}
                        />
                    </Col>
                ))}
                {selectedBackground && 
                    <div>
                        <h3>Selected background:</h3>
                        <Image src={selectedBackground} thumbnail/>
                    </div>
                }

                <button type="sumbit" disabled={true}>
                    SAVE BACKGROUND
                </button>
            </form>

        </div>
    )
}