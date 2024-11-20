import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date"; // Assurez-vous que getMonth retourne les mois au format attendu
import "./style.scss";

const EventCard = ({
  imageSrc = "default-image.jpg", // Valeur par défaut pour l'image
  imageAlt = "image",             // Valeur par défaut pour le texte alternatif
  date = new Date("2022-04-01"),  // Modifié pour être en avril
  title = "Titre non disponible",  // Valeur par défaut pour le titre
  label = "Type non spécifié",     // Valeur par défaut pour le label
  small = false,
  ...props
}) => (
  <div
    data-testid="card-testid"
    className={`EventCard${small ? " EventCard--small" : ""}`}
    {...props}
  >
    <div className="EventCard__imageContainer">
      <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
      <div className="EventCard__label">{label}</div>
    </div>
    <div className="EventCard__descriptionContainer">
      <div className="EventCard__title">{title}</div>
      <div className="EventCard__month">{getMonth(date)}</div>
    </div>
  </div>
);

EventCard.propTypes = {
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string,
  small: PropTypes.bool,
  label: PropTypes.string,
};

EventCard.defaultProps = {
  imageSrc: "default-image.jpg",
  imageAlt: "image",
  title: "Titre non disponible",
  label: "Type non spécifié",
  small: false,
};

export default EventCard;
