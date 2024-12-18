import Question from "./Question";

interface Props {
  copy: any;
}

const FAQ = ({ copy }: Props) => {
  return (
    <div id="faq" className="faq">
      <button id="faq__back__button" className="button faq__button back">
        {copy.buttons.back.toUpperCase()}
        <span className="button__arrow right">→</span>
      </button>
      <h2 className="faq__title"> {copy.faq?.title}</h2>
      <div id="faq__questions" className="faq__questions">
        <div className="faq__questions__col">
          <Question question={copy.faq?.questions["nr-0"]?.question}>
            <p>{copy.faq?.questions["nr-0"]["p-1"]}</p>
          </Question>
          <Question question={copy.faq?.questions["nr-1"]?.question}>
            <p>{copy.faq?.questions["nr-1"]["p-1"]}</p>
          </Question>
          <Question question={copy.faq?.questions["nr-2"]?.question}>
            <img src="/map-bikes.webp" />
            <p className="font-bold">{copy.faq?.questions["nr-2"]["p-1"]}</p>
            <ul>
              <li>{copy.faq?.questions["nr-2"]["li-1"]}</li>
              <li>{copy.faq?.questions["nr-2"]["li-2"]}</li>
            </ul>
          </Question>
          <Question question={copy.faq?.questions["nr-3"]?.question}>
            <img src="/map-cars.webp" />
            <p className="font-bold">{copy.faq?.questions["nr-3"]["p-1"]}</p>
            <ul>
              <li>{copy.faq?.questions["nr-3"]["li-1"]}</li>
              <li>{copy.faq?.questions["nr-3"]["li-2"]}</li>
              <li>{copy.faq?.questions["nr-3"]["li-3"]}</li>
            </ul>
            <p className="mt-8">{copy.faq?.questions["nr-3"]["p-2"]}</p>
            <ul>
              <li>{copy.faq?.questions["nr-3"]["li-4"]}</li>
              <li>{copy.faq?.questions["nr-3"]["li-5"]}</li>
              <li>{copy.faq?.questions["nr-3"]["li-6"]}</li>
              <li>{copy.faq?.questions["nr-3"]["li-7"]}</li>
            </ul>
          </Question>
          <Question question={copy.faq?.questions["nr-4"]?.question}>
            <p>{copy.faq?.questions["nr-4"]["p-1"]}</p>
          </Question>
        </div>
        <div className="faq__questions__col">
          <Question question={copy.faq?.questions["nr-5"]?.question}>
            <p>{copy.faq?.questions["nr-5"]["p-1"]}</p>
          </Question>
          <Question question={copy.faq?.questions["nr-6"]?.question}>
            <p>{copy.faq?.questions["nr-6"]["p-1"]}</p>
            <p>{copy.faq?.questions["nr-6"]["p-2"]}</p>
          </Question>

          <Question question={copy.faq?.questions["nr-7"]?.question}>
            <p>{copy.faq?.questions["nr-7"]["p-1"]}</p>
          </Question>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
