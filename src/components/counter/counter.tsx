import React from "react";

import { decrement, increment } from "../../reducers/counter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/app";

export const Counter = () => {
  const count = useSelector<RootState, number>((state) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};
