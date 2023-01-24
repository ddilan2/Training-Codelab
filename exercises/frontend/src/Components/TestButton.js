import styles from "./TestButton.module.css"

/* 
:chosen:
  the current chosen button
:type:
  string
:changeChosen:
  function that change chosen value on parent
:type:
  function
*/
function TestButton ({chosen,changeChosen}) {
  return (
    <div className={styles.bodyContainer}>
        
          <button onClick={()=>changeChosen("Button 1")} >
            Button 1
          </button>
          
        
          <button onClick={()=>changeChosen("Button 2")} >
            Button 2
          </button>
          
    </div>         
  );

}

export default TestButton;
