import React from "react";
import './display.css';

export default function Display (props) {
  return (
    <div className="display">
      { props.value }
    </div>
  )
}
