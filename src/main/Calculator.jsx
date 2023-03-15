import React, { useState } from "react";
import './calculator.css';
import Button from "../components/Button";
import Display from "../components/Display";

export default function Calculator (props) {

  const [displayValue, setDisplayValue] = useState('0'); 
  const [clearDisplay, setClearDisplay] = useState(false);
  const [operationState, setOperationState] = useState(null);
  const [values, setValues] = useState([0, 0]);
  const [current, setCurrent] = useState(0);


  function clearMemory() {
    setDisplayValue(0);
    setClearDisplay(true);
    setOperationState(null);
    setValues([0, 0]);
    setCurrent(0);
  }

  function setOperation (operation) {
    if (current === 0) {
      setCurrent(1);
      setOperationState(operation);
      setClearDisplay(true);
    } else {
      const equalSign = operation === '=';
      const currentOperation = operationState;

      const newValues = [...values];
      switch(currentOperation) {
        case '+':
          newValues[0] = newValues[0] + newValues[1];
          break;
        case '-':
          newValues[0] = newValues[0] - newValues[1];
          break;
        case '*':
          newValues[0] = newValues[0] * newValues[1];
          break
        case '/':
          newValues[0] = newValues[0] / newValues[1];
          break
        default:
        newValues[0] = values[0];
      }
     // newValues[0] = eval(`${newValues[0]} ${currentOperation} ${newValues[1]}`);
      newValues[1] = 0;

      setDisplayValue(newValues[0]);
      setOperationState(equalSign ? null : operation);
      setCurrent(equalSign ? 0 : 1);
      setClearDisplay(!equalSign);
      setValues(newValues);
    }
  }

  function addDigit(n) {
    if(n === '.' && displayValue.includes('.')) return;

    let clearDisplayFunc = displayValue === '0' || clearDisplay;

    const currentValue = clearDisplayFunc ? '' : displayValue;
    const displayValueFunc = currentValue + n;

    setDisplayValue(displayValueFunc);
    setClearDisplay(false);
    

    if (n !== '.') {
      const i = current;
      const newValue = parseFloat(displayValueFunc);
      const newValuesFunc = [...values];

      newValuesFunc[i] = newValue;
      setValues(newValuesFunc);
      console.log(newValuesFunc)
    }
  }



  return (
    <div className="calculator">
      <Display value={displayValue}/>
      <Button label="AC"click={clearMemory} triple />
      <Button label="/" click={setOperation} operation />
      <Button label="7" click={addDigit} />
      <Button label="8" click={addDigit} />
      <Button label="9" click={addDigit} />
      <Button label="*" click ={setOperation} operation/>
      <Button label="4" click={addDigit} />
      <Button label="5" click={addDigit}/>
      <Button label="6" click={addDigit} />
      <Button label="-" click={setOperation} operation />
      <Button label="1" click={addDigit} />
      <Button label="2" click={addDigit} />
      <Button label="3" click={addDigit} />
      <Button label="+" click={setOperation} operation/>
      <Button label="0" click={addDigit} double/>
      <Button label="." click={addDigit} />
      <Button label="=" click={setOperation} operation/>
    </div>
  )
}