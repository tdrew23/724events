import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Tri des événements par date décroissante
  const byDateDesc = data?.focus ? [...data.focus].sort((evtA, evtB) => 
    new Date(evtB.date) - new Date(evtA.date)
  ) : [];

  // Fonction pour passer à la carte suivante
  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
  };

  useEffect(() => {
    if (byDateDesc.length === 0) return undefined;
    const interval = setInterval(nextCard, 5000);
    return () => clearInterval(interval); // Nettoyage de l'intervalle au démontage
  }, [byDateDesc.length]);

  return byDateDesc.length === 0 ? (
    <div>Chargement des événements...</div>
  ) : (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div
          key={event.id || event.title || `${event.date}-${idx}`}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover || "default-image.jpg"} alt={event.title || "Image de l'événement"} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title || "Titre non disponible"}</h3>
              <p>{event.description || "Description non disponible"}</p>
              <div>{getMonth(new Date(event.date)) || "Date non spécifiée"}</div>
            </div>
          </div>
        </div>
      ))}
      {/* Les boutons radio sont maintenant fixes en dehors de chaque carte */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event) => (
            <input
              key={`radio-${event.id || event.title || event.date}`} // Utilisation d'une clé unique basée sur les données de l'événement
              type="radio"
              name="radio-button"
              checked={index === byDateDesc.indexOf(event)} // Active le bouton radio correspondant à l'index
              onChange={() => setIndex(byDateDesc.indexOf(event))} // Gère le clic sur le bouton radio
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
