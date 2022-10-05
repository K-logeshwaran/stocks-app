import { createContext, useContext ,useState} from "react";
let Ctx = createContext();
function Provier({children}) {
    const [stocks,setStocks] = useState(["MSFT","GOOGL","AMZN","AAPL","BINANCE:BTCUSDT"]);
    function addStock(stock){
        let pre = [...stocks];
        pre.push(stock);
        setStocks(pre)
        // localStorage.removeItem("stocks");
        // localStorage.setItem("stocks",JSON.stringify(pre));
    }
    return ( 
        <Ctx.Provider value={{name:"cscscs",stocks,setStocks,addStock}}>
            {
                children 
            }
        </Ctx.Provider>
     );
}

export const  useCtx  = ()=>useContext(Ctx);
export default Provier;

// ()=>{
//     if(localStorage.getItem("stocks") == undefined){
//         localStorage.setItem("stocks",JSON.stringify(["MSFT","GOOGL","AMZN","AAPL","BINANCE:BTCUSDT"]))
//         return ["MSFT","GOOGL","AMZN","AAPL","BINANCE:BTCUSDT"]
//     }
//     console.log(JSON.parse(localStorage.getItem("stocks")));
//     return JSON.parse(localStorage.getItem("stocks"));
// }