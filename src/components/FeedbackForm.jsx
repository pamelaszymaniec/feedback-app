import { useState, useContext, useEffect } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const { addFeedback, updateFeedback, feedbackEditMode } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEditMode.edit === true) {
      setBtnDisabled(false);
      setText(feedbackEditMode.item.text);
      setRating(feedbackEditMode.item.rating);
    }
  }, [feedbackEditMode]);

  // prettier-ignore
  const handleTextChange = ({ target: { value } }) => { // 👈  get the value
    if (value === "") {
      setBtnDisabled(true);
      setMessage(null);
  // prettier-ignore
    } else if (value.trim().length < 10) { // 👈 check for less than 10
      setMessage("Text must be at least 10 characters");
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
    setText(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text, // text: text
        rating, //rating: rating
      };
      if (feedbackEditMode.edit === true) {
        updateFeedback(feedbackEditMode.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }
      setBtnDisabled(true); // 👈  add this line to reset disabled
      setRating(10); //👈 add this line to set rating back to 10
      setText("");
    }
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <RatingSelect select={setRating} selected={rating} />
        <h2>How would you rate your service with us?</h2>
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
