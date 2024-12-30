"use client";
import styles from "./page.module.css";
import { useState } from "react";
import MyButton from "./TheButton";
import MyMonsters from "./TheMonsters";

export default function Home() {
  const [count, setCount] = useState(0);
  const [monstersCount, setMonCount] = useState([]);
  const [monsterCountObject, setMonsterObject] = useState([]);
  const [players, setPlayers] = useState([1]);
  const [monsterXp, setMonsterXp] = useState(0);
  const [valueFromChild, setValueFromChild] = useState('');
  const [sumOfXp, setSumOfXp] = useState(0);

  //let monsterTotalXp = 0;

  const handleClick = () => setCount(count + 1);

  const addPlayers = () =>
    setPlayers((players) => [...players, players.length + 1]);

  const removeAPlayer = () => {
    players.pop();
    setPlayers([...players]);
  };

  const addMonsters = () => {
    setMonCount((monstersCount) => [...monstersCount, monstersCount.length + 1]);
    setMonsterObject((monsterCountObject) => [
      ...monsterCountObject,
      { monsterDropdown: monstersCount.length, monsterXp: 0 },
    ]);
    console.log(monsterCountObject)
  };

  function sumXP(monObj){
    let sum = 0;
    monObj.forEach(x => sum += parseInt(x.monsterXp))
    return sum;
  }


  const handleValueChange = (value) => {
    //console.log("fuck")
    setValueFromChild(value);
    console.log(value)
    let dudes = value.split(",")
    console.log(dudes);
    console.log(document.getElementById(dudes[2]))
    //so when it changes, whatever the id is, change that objects xp!
    let eyeDee = dudes[2].split("-")
    
    
    monsterCountObject[eyeDee[0]-1].monsterXp = dudes[1]
    console.log(monsterCountObject)

    let sumOfExp = sumXP(monsterCountObject)
    //monsterTotalXp = sumOfExp;
    setSumOfXp(sumOfExp)
    //console.log(sumOfXp)
  };
  const removeAMonster = () => {
    monstersCount.pop();
    setMonCount([...monstersCount]);
  };

  return (
    <div className={styles.page}>
      <h1>Counter button thing</h1>
      {players.map((x, index) => (
        <MyButton key={`player-${index}`} count={x} onClick={handleClick} />
      ))}
      <button onClick={addPlayers}>Add More</button>
      <button onClick={removeAPlayer}>Remove a Player</button>
      <h1>The Monsters</h1>
      {monstersCount.map((y, index) => (
        <MyMonsters
          key={`monster-${index}`}
          count={y}
          onValueChange={handleValueChange}
        />
      ))}
      <button onClick={addMonsters}>Add Monster</button>
      <button onClick={removeAMonster}>Remove a Monster</button>
      <p>The Monster XP Subtotal is: {sumOfXp}</p>
    </div>
  );  
}
