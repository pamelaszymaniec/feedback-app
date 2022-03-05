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

  const handleTextChange = (e) => {
    if (text === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage("Test must be a least 10 characters");
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
    setText(e.target.value);
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
        <RatingSelect select={(rating) => setRating(rating)} />
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
