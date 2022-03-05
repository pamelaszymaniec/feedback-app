import { useState, useContext, useEffect } from "react";
import FeedbackContext from "../context/FeedbackContext";

function RatingSelect({ select }) {
  const [selected, setSelect] = useState(10);
  const handleChange = (e) => {
    setSelect(+e.currentTarget.value);
    select(+e.currentTarget.value);
  };
  const { feedbackEditMode } = useContext(FeedbackContext);

  useEffect(() => {
    setSelect(feedbackEditMode.item.rating);
  }, [feedbackEditMode]);
  return (
    <ul className="rating">
      {Array.from({ length: 10 }, (_, i) => (
        <li key={`rating-${i + 1}`}>
          <input
            type="radio"
            id={`num${i + 1}`}
            name="rating"
            value={i + 1}
            onChange={handleChange}
            checked={selected === i + 1}
          />
          <label htmlFor={`num${i + 1}`}>{i + 1}</label>
        </li>
      ))}
    </ul>
  );
}

export default RatingSelect;
