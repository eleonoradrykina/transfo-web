import { useState } from "react";

interface Props {
  question: string;
  children: React.ReactNode;
}

const Question = ({ question, children }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
    const answer = document.getElementById(`answer-${question}`);
    if (answer) {
      if (open) {
        answer.style.maxHeight = "0px";
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    }
  };

  return (
    <button onClick={handleClick} className={`faq__item ${open ? "open" : ""}`}>
      <h2 className="faq__item__question">
        <span className="min-w-3 md:min-w-4 text-center">
          {open ? "-" : "+"}
        </span>{" "}
        <span>{question}</span>
      </h2>
      <div id={`answer-${question}`} className="faq__item__answer">
        {children}
      </div>
    </button>
  );
};

export default Question;
