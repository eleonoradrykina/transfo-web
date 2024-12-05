import React, { useEffect } from "react";
import { type IEvent } from "../services/types";

interface Props {
  event: IEvent;
}

const Event = ({ event }: Props) => {
  useEffect(() => {
    const test = document.getElementById(`content__${event.name}`);
    if (test) {
      test.innerHTML = event.content;
    }
  }, []);

  return <div id={`content__${event.name}`}></div>;
};

export default Event;
