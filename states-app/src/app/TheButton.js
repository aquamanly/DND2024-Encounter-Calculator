"use client";
import React, { useState } from "react";
import xpBudgetPerCharacter from "./lvlDifficulty";

export default function MyButton({ count, onValueChange }) {
  const [playState, setPlaystate] = useState(0);
  const pcLvls = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  //const [playerStateA, setPlayerStateA] = useState(1);
  const handleInputChange = (event) => {
    const found = xpBudgetPerCharacter.find(
      (element) => element.level == event.target.value
    );

    console.log(
      found.level +
        "," +
        found.low +
        "," +
        found.moderate +
        "," +
        found.high +
        "," +
        event.target.id
    );
    onValueChange(
      found.level +
        "," +
        found.low +
        "," +
        found.moderate +
        "," +
        found.high +
        "," +
        event.target.id
    );
    //const [cr, xp] = event.target.value.split(",");
    //setLabel([cr, xp]);
    //onValueChange(event.target.value);
    //const [cr, xp] = event.target.value.split(",");
    //setLabel([cr, xp]);
  };

  return (
    <select id={count} onChange={handleInputChange}>
      {pcLvls.map((item) => (
        <option key={"lvl" + item}>{item}</option>
      ))}
    </select>
  );
}
