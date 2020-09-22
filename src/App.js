import React from "react";
import { useEffect, useState} from "react";
import axios from "axios";
import "./App.css"


const App = () =>{

    /*let getData = ()=>{
        axios.get("https://opentdb.com/api.php?amount=1&type=multiple")
        .then(res=>setState(res.data.results))
        document.getElementById("correct").style.display="none"
        document.getElementById("incorrect").style.display="none"
    }*/
   /* const [state,setState] = useState([]);
    useEffect(()=>{
        document.getElementById("mainBtn").addEventListener("click",getData)

        return ()=>{
            document.removeEventListener("mainBtn",getData)
        }
    },[state]);*/
    
    const [count,setCount]= useState(0);
    const [state,setState]= useState([]);
    useEffect(()=>{
        axios.get("https://opentdb.com/api.php?amount=1&type=multiple")
        .then(res=>setState(res.data.results))
        document.getElementById("correct").style.display="none"
        document.getElementById("incorrect").style.display="none"
    },[count]);

    /*const [next,setNext] = useState(0);
    useEffect(()=>{
        let fetchData = ()=>{
        axios.get("https://opentdb.com/api.php?amount=1&type=multiple")
        .then(res=>setState(res.data.results))
        console.log("next se reloada")   
        }
        
        return()=>{setNext([])}
    },[]);
*/   
    let question = state.map(i=>i.question);
    let totalAnsw = state.map(i=>i.incorrect_answers);
    let correctAnswer = state.map(i=>i.correct_answer);
    for( let i =0;i<correctAnswer.length;i++){
        totalAnsw[i].push(correctAnswer[i])
    }
    for(let i = 0;i<totalAnsw.length;i++){
        totalAnsw[i] = totalAnsw[i].sort(()=>Math.random()-0.5);
    }
   //let [q1,q2,q3,q4] = totalAnsw;
   let q1 = totalAnsw.map(e=>e[0]);
   let q2 = totalAnsw.map(e=>e[1]);
   let q3 = totalAnsw.map(e=>e[2]);
   let q4 = totalAnsw.map(e=>e[3]);

   let getAnswer = (e)=>{
       console.log(e)
       if(e[0]===correctAnswer[0] && document.getElementById("incorrect").style.display!=="block" ){
            document.getElementById("correct").style.display="block"
            
       }else if (e[0]!==correctAnswer[0] && document.getElementById("correct").style.display!=="block"){
            document.getElementById("incorrect").style.display="block"
            
       }
   }
    
    
    return(
       <div> 
  
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <div className="col-10 offset-1">
                    <h3>API Trivia</h3><br/>
                            <ul><h4>{question}</h4></ul>    
                            <ul><button id="correct" className="btn btn-success form-control">Correct</button></ul>
                            <ul><button id="incorrect" className="btn btn-danger form-control">Incorrect</button></ul>
                            <ul><button className="btn btn-secondary form-control" onClick={()=>{getAnswer(q1)}} value={q1}>{q1}</button></ul>
                            <ul><button className="btn btn-secondary form-control" onClick={()=>{getAnswer(q2)}} value={q2}>{q2}</button></ul>
                            <ul><button className="btn btn-secondary form-control" onClick={()=>{getAnswer(q3)}} value={q3}>{q3}</button></ul>
                            <ul><button className="btn btn-secondary form-control" onClick={()=>{getAnswer(q4)}} value={q4}>{q4}</button></ul>
                            <ul><button className="btn btn-primary btn-warning" id="mainBtn" onClick={()=>{setCount(count=>count+1)}} >Next</button></ul>
            </div>
        </div>
      </div>
    </div>
    )
}


export default App;