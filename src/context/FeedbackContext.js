import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "This item is from context 1",
      rating: 10,
    },
    {
      id: 2,
      text: "This item is from context 2",
      rating: 4,
    },
  ]);

  const [feedbackEditMode, setFeedbackEditMode] = useState({
    item: {},
    edit: false,
  });

  // add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  // set item to be updated
  const editFeedback = (item) => {
    setFeedbackEditMode({
      item,
      edit: true,
    });
    console.log(item);
  };

  //update feedback
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updItem,
            }
          : item
      )
    );
  };

  // delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete feedback?"))
      setFeedback(feedback.filter((item) => item.id !== id));
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEditMode,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
