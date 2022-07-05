import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import logo from "../images/logo.png";

export default function Navbar() {
  const { toggleModals } = useContext(UserContext);

  const navigate = useNavigate();

  // async car quand on discute avec Firebase on reçoit des promise on attend le resultat de ces promises
  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch {
      alert(
        "Nous ne pouvons pas déconnecter. Vérifie ta connexion internet et réessaye."
      );
    }
  };

  return (
    <nav className="navbar navbar-light bg-success px-4">
      <div>
        <img src={logo} alt="" style={{ maxHeight: "40px" }} />
        <Link
          to="/"
          className="navbar-brand text-light"
          style={{ marginLeft: "10px" }}
        >
          Foot du Dimanche
        </Link>
      </div>
      <div>
        <button
          /* Fonction anonyme dans le onClick sinon elle va s'exécuter à chaque return*/
          onClick={() => toggleModals("signIn")}
          className="btn btn-primary"
        >
          Se connecter
        </button>
        <button onClick={logOut} className="btn btn-danger ms-2">
          Se déconnecter
        </button>
      </div>
    </nav>
  );
}
