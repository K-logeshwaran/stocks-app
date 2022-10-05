import { useEffect, useState } from "react";
import finhub from "../apis/finhub";
import { useCtx } from "../context/ctx";
function AutoComplete() {
  let {addStock} = useCtx()
  const [term,setTerm] = useState("");
  const [result,setResult] = useState([]);
  function dropDown(){
    return (
      <ul 
      className={`dropdown-menu ${term.length>=1 ? "show" : ""} `}
      style={{
        height: "500px",
        overflowY: "scroll",
        overflowX: "hidden",
        cursor: "pointer"
      }}
      >
        {
          result.map(stk=><li 
            className="dropdown-item"
            onClick={eve=>{
              addStock(stk.symbol);
              setTerm("");
            }}
            >{stk.description} ({stk.symbol})</li>)
        }
      </ul>
    )
  }
  useEffect(()=>{
    console.log(term)
    const query = async ()=>{
      if(term.length>=1){
        let res  = await finhub.get(`/search?q=${term}`)
        console.log(res.data);
        setResult(res.data.result)
      }
      
    };
    query();
  },[term])
    return ( 
      <div className="w-50 p-5 rounded mx-auto">
        <input style={{ backgroundColor: "rgba(145, 158, 171, 0.04)" }} id="search" type="text" className="form-control" placeholder="Search for stocks" autoComplete="off"
        value={term}
        onChange={e=>setTerm(e.target.value)}
         ></input>
        {dropDown()}
    </div>
     );
}

export default AutoComplete;