import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Nouvel état pour suivre si le formulaire a été soumis

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      setSubmitted(false); // Réinitialise l'état de confirmation lors de l'envoi
      try {
        await mockContactApi();
        setSending(false);
        setSubmitted(true); // Active l'état de confirmation
        onSuccess(); // Appel de la fonction onSuccess pour afficher la confirmation
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <>
      <form onSubmit={sendContact}>
        <div className="row">
          <div className="col">
            <Field placeholder="" label="Nom" />
            <Field placeholder="" label="Prénom" />
            <Select
              selection={["Personel", "Entreprise"]}
              onChange={() => null}
              label="Personel / Entreprise"
              type="large"
              titleEmpty
            />
            <Field placeholder="" label="Email" />
            <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
              {sending ? "En cours" : "Envoyer"}
            </Button>
          </div>
          <div className="col">
            <Field
              placeholder="message"
              label="Message"
              type={FIELD_TYPES.TEXTAREA}
            />
          </div>
        </div>
      </form>
      {/* Message de confirmation */}
      {submitted && (
        <div className="confirmation-message">
          Votre message a bien été envoyé. Merci de nous avoir contactés !
        </div>
      )}
    </>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
