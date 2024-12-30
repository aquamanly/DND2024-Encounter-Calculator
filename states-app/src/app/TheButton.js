
export default function MyButton({ count, onClick, calculateMonsterXp}){
    const pcLvls = [1, 2, 3, 4, 5, 6, 7 ,8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    
    return(
        <select id={count} onChange={calculateMonsterXp}>
            {pcLvls.map( item => 
                <option key={"lvl"+item}>{item}</option>
            )}
        </select>
    );
}