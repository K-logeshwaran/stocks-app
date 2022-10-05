import { useEffect, useState } from "react";
import finhub from "../apis/finhub";
import { BsFillCaretUpFill,BsFillCaretDownFill} from "react-icons/bs";
import { useCtx } from "../context/ctx";
import { useNavigate } from "react-router-dom";
function StockTable() {
    let {stocks} = useCtx()
    const navigator = useNavigate()
    const [allStocks,setAllStocks] = useState(null);
    useEffect( ()=>{
       let isMounted = true
       console.info(stocks);
       async function getData(){
        try{
            let responses = await Promise.all(stocks.map(stk=>finhub.get("/quote",{
                params:{
                    symbol:stk
                }
            })));
            console.log(responses);
            
            let data =responses.map(S=>{
                return {
                   data:S.data,
                   symbol:S.config.params.symbol 
                }    
            }); 
            console.log(data);          
            if(isMounted){
                console.log("yes");
                setAllStocks(data)
            }
            

                
            
        }catch(err){
            console.error("errr")
            console.error(err.message)
            if(err.message=="Request failed with status code 403"){
                alert("That Stock Details is a Paid Resource\nCan't access it ")
            }
        }
        };  
        getData();
        console.log("Allalmdadmasdmak");
        console.log(allStocks);
        return ()=>{isMounted=false}
    },[stocks]);
    function findColor(num){
        return num > 0 ? "success" :"danger";
    }
    return (  
        <section className="container">
            <table className="table hover mt-5 ">
                <thead style={{color:"rgb(79,89,102)"}}>
                    <tr>
                        <th scope="col">Name</th> 
                        <th scope="col">Last</th> 
                        <th scope="col">chg</th> 
                        <th scope="col">chg%</th> 
                        <th scope="col">High</th> 
                        <th scope="col">Low</th> 
                        <th scope="col">Open</th> 
                        <th scope="col">Pclose</th> 
                    </tr>
                </thead>
                <tbody>
                    {
                       allStocks != null ? allStocks.map((e)=>{
                        return (
                            <tr 
                            style={{cursor:"pointer"}}  
                            className="table-row" key={e.symbol}
                            onClick={()=>navigator(`/detail/${e.symbol}`)}
                             >
                                <th scope="row">{e.symbol}</th> 
                                <td>{e.data.c}</td>
                                <td className={`text-${findColor(e.data.d)} `}>{e.data.d} {e.data.d>0?<BsFillCaretUpFill fill="hsl(152, 69%, 31%)" />:<BsFillCaretDownFill fill="hsl(354, 70%, 54%)"/>}</td>
                                <td className={`text-${findColor(e.data.dp)} `}>{e.data.dp} {e.data.dp>0?<BsFillCaretUpFill  fill="hsl(152, 69%, 31%)"/>:<BsFillCaretDownFill fill="hsl(354, 70%, 54%)" />}</td>
                                {/* <td>{e.data.dp}</td> */}
                                <td>{e.data.h}</td>
                                <td>{e.data.l}</td>
                                <td>{e.data.o}</td>
                                <td>{e.data.pc}</td>
                            </tr>
                        )
                        }): <h1>Loading...</h1>
                    }
                </tbody>
            </table>
        </section>
    );
}

export default StockTable;

// {
//     stkVals?.map(e=><h1>{e.symbol} : {e.data.c}</h1>)
// }

