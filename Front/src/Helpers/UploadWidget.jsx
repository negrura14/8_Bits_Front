import { useEffect,useRef } from "react";

const UploadWidget = ({onImageUpload,selectedImage,setSelectedImage,setIsUploadingImage,isUploadingImage}) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName:"bits8",
            uploadPreset: "8_bits"
        }, function(error,result){
            if(error){
                alert(error);
            } else if (result && result.event === "success") {
                const imageUrl = result.info.secure_url;
                onImageUpload(imageUrl); // Llama a la función con la URL de la imagen
                setIsUploadingImage(false);
                widgetRef.current.close();
            } else {
                setIsUploadingImage(false);
            }
        })
    }, [onImageUpload,,setIsUploadingImage])

    const handleClick = () => {
        setIsUploadingImage(true);
        widgetRef.current.open();
      };

    const handleDelete = () => {
      setSelectedImage("");
      setIsUploadingImage(false);
      onImageUpload("");
    }

    return(
        <div>
      {selectedImage && (
        <div>
          <img 
            src={selectedImage} 
            alt="Selected Pokemon" 
            style={{ maxWidth: '100px', maxHeight: '100px' }}  
          />
          <button onClick={handleDelete}>REMOVE</button>
        </div>
      )}
      <button onClick={handleClick} disabled={isUploadingImage}>
        UPLOAD IMAGE
      </button>
    </div>
    )
}

export default UploadWidget;