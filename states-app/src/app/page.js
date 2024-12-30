"use client";
import styles from "./page.module.css";
import { useState } from "react";
import MyButton from "./TheButton";
import MyMonsters from "./TheMonsters";
import xpBudgetPerCharacter from "./lvlDifficulty";
/**
 *
 * @todo
 *
 * Code clean up
 */

export default function Home() {
  const [count, setCount] = useState(0);
  const [monstersCount, setMonCount] = useState([]);
  const [monsterCountObject, setMonsterObject] = useState([]);
  const [players, setPlayers] = useState([]);
  const [playerObj, setPlayerObj] = useState([]);
  const [monsterXp, setMonsterXp] = useState(0);
  const [valueFromChild, setValueFromChild] = useState("");
  const [sumOfXp, setSumOfXp] = useState(0);
  const [pcDifficultyRanges, setDifficulty] = useState([]);
  const [overallDifficulty, setOverallDifficulty] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });

  //console.log(xpBudgetPerCharacter);
  const handleClick = () => setCount(count + 1);

  const addPlayers = () => {
    setPlayers((players) => [...players, players.length + 1]);
    setPlayerObj((playerObj) => [
      ...playerObj,
      { level: 0, easy: 0, medium: 0, hard: 0 },
    ]);
  };

  const removeAPlayer = () => {
    players.pop();
    setPlayers([...players]);
  };

  const addMonsters = () => {
    setMonCount((monstersCount) => [
      ...monstersCount,
      monstersCount.length + 1,
    ]);
    setMonsterObject((monsterCountObject) => [
      ...monsterCountObject,
      { monsterDropdown: monstersCount.length, monsterXp: 0 },
    ]);
    console.log(monsterCountObject);
  };

  function sumXP(monObj) {
    let sum = 0;
    monObj.forEach((x) => (sum += parseInt(x.monsterXp)));
    return sum;
  }

  const handlePlayerChange = (value) => {
    console.log("1");
    console.log(value);
    console.log("2");
    console.log(players);
    console.log(3);
    console.log(playerObj);
    //level,easy,moderate,hard,index
    let [level, easy, moderate, hard, index] = value.split(",");
    console.log(level);
    console.log(hard);

    var thePlayer = playerObj[parseInt(index) - 1];
    thePlayer.level = level;
    thePlayer.easy = easy;
    thePlayer.medium = moderate;
    thePlayer.hard = hard;

    var tEasy = 0;
    var tModerate = 0;
    var tHard = 0;
    //calculate sum total for easy, medium, hard
    playerObj.forEach((element) => {
      tEasy += parseInt(element.easy);
      tModerate += parseInt(element.medium);
      tHard += parseInt(element.hard);
    });

    setOverallDifficulty({
      easy: tEasy,
      medium: tModerate,
      hard: tHard,
    });
    console.log("finale");
    console.log(overallDifficulty);
  };

  const handleValueChange = (value) => {
    let dudes = value.split(",");
    //lets get the id of the item that changed.
    //they're usualyy 'number'-monster so we need the number
    let eyeDee = dudes[2].split("-");
    //then in the array of objects created, we need the number subtracted by 1 for its index
    //and form the index we find the objects
    //and in that object we change the data in it.
    monsterCountObject[eyeDee[0] - 1].monsterXp = dudes[1];
    //then we call the function to sum up the data inside.
    //then set that sum to a variable to be saved in a useState
    //that state will be updated for the user to see.
    let sumOfExp = sumXP(monsterCountObject);
    //set the sum to the state
    setSumOfXp(sumOfExp);
    //set the value to the state as well.
    setValueFromChild(value);
  };

  const removeAMonster = () => {
    monstersCount.pop();
    setMonCount([...monstersCount]);
  };

  return (
    <div className={styles.page}>
      <h1>Counter button thing</h1>
      {players.map((x, index) => (
        <MyButton
          key={`player-${index}`}
          count={x}
          onClick={handleClick}
          onValueChange={handlePlayerChange}
        />
      ))}
      <button onClick={addPlayers}>Add More</button>
      <button onClick={removeAPlayer}>Remove a Player</button>
      <h3>
        The total for XP Thresholds is: Easy {overallDifficulty.easy}, Medium:{" "}
        {overallDifficulty.medium}, Hard: {overallDifficulty.hard}
      </h3>
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

      {sumOfXp > overallDifficulty.hard ? (
        <p>This is a Deadly Encounter: The players will not survive. </p>
      ) : sumOfXp > overallDifficulty.medium ? (
        <p>
          This encounter is Hard: Players can survive if they work together and
          know their characters.
        </p>
      ) : sumOfXp > overallDifficulty.easy ? (
        <p>
          This is medium difficulty. They should probably encounter struggle,
          but not much.
        </p>
      ) : (
        <p>This is easy. It's a refresher, but it is fast paced.</p>
      )}
    </div>
  );
}
