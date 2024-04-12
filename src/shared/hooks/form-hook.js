import { useCallback, useReducer } from "react";

//allows start in lower-case function/class

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
      case "SET_DATA":
        return {
          inputs: action.inputs,
          isValid: action.formIsValid
        }
    default:
      return state;
  }
};

export const useForm = (INITIAL_INPUTS, INITIAL_FORM_VALIDITY) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: INITIAL_INPUTS,
    isValid: INITIAL_FORM_VALIDITY,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      inputId: id,
      value: value,
      isValid: isValid,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidty) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidty
    })
  }, [])
  // Add more hooks here...

  return [formState, inputHandler, setFormData];
};
