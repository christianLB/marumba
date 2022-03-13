import { useState } from "react";

export default function useModel(initialState) {
  var model = {};
  var keys = Object.keys(initialState);
  var [getState, setState] = useState(initialState);
  var propertyNames = Object.getOwnPropertyNames(
    Object.getPrototypeOf(initialState)
  );

  keys &&
    keys.forEach((key) => {
      Object.defineProperty(model, key, {
        get: function () {
          return getState[key];
        },
        set: function (value) {
          setState((state) => {
            const newState = clone(state);
            newState[key] = value;
            return newState;
          });
        },
      });
    });

  propertyNames &&
    propertyNames.forEach((propertyName) => {
      model[propertyName] = (args) => {
        const newState = clone(getState);
        newState[propertyName] && newState[propertyName](args);
        setState(newState);
      };
    });

  const clone = (oldState) => {
    const newState = Object.assign(
      Object.create(Object.getPrototypeOf(oldState)),
      oldState
    );
    return newState;
  };

  return model;
}
