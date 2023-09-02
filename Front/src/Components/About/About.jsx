 import "./About.css";
 
 export default function About() {
    // pretendo generar un array con todos nuestros datos y luego con un map renderizar todos de una sóla vez
    const data = [];

    return (
        <div> 

            <h1>About us</h1>

            <div>

                <img 
                    src={"AVATAR"}
                    alt="characterImg"
                />
                <h2>Agustin Camuzzi</h2>
                <h3>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam itaque iure veniam assumenda debitis aut quasi quisquam minima ipsam. Soluta voluptates reiciendis molestias sed ratione vero cupiditate veritatis, pariatur dolor!</h3>

                <a
                    href="INSTAGRAM LINK"
                    target="_blank"
                    rel="noopener noreferrer"
                />
                <img
                    src={"ICONO"}
                    alt="Instagram"
                />

                <a
                    href="GITHUB LINK"
                    target="_blank"
                    rel="noopener noreferrer"
                />
                <img
                    src={"ICONO"}
                    alt="GitHub"
                />

                <a
                    href="LINKED LINK"
                    target="_blank"
                    rel="noopener noreferrer"
                />
                <img
                    src={"ICONO"}
                    alt="LinkedIn"
                />

            </div>

        </div>
    );

 }