import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import finhub from "../apis/finhub";
import StockChart from "../components/stockChart";
function StockDetail() {
    let parm = useParams()
    console.log(parm.stock);
    const [plots,setPlots] = useState();
    function formatData(data){
        return data.t.map((ele,index)=>{
            //let D = new Date(ele*1000);
            return {
                
                x:ele*1000,
                y:data.c[index]
            }
        })
    }
    useEffect(()=>{
        async function getData(){
            const date = new Date()
            const currentTime = Math.floor(date.getTime() / 1000)
            let oneDay;
            if (date.getDay() === 6) {
              oneDay = currentTime - 2 * 24 * 60 * 60;
            } else if (date.getDay() === 0) {
              oneDay = currentTime - 3 * 24 * 60 * 60;
            } else {
              oneDay = currentTime - 24 * 60 * 60;
            }
            const oneWeek = currentTime - 7 * 24 * 60 * 60
            const oneYear = currentTime - 365 * 24 * 60 * 60
      
            try {
              const responses = await Promise.all([finhub.get("/stock/candle", {
                params: {
                  symbol:parm.stock,
                  from: oneDay,
                  to: currentTime,
                  resolution: 30
                }
              }), finhub.get("/stock/candle", {
                params: {
                  symbol:parm.stock,
                  from: oneWeek,
                  to: currentTime,
                  resolution: 30
                }
              }), finhub.get("/stock/candle", {
                params: {
                  symbol:parm.stock,
                  from: oneYear,
                  to: currentTime,
                  resolution: "D"
                }
              })])
              console.log(responses)
                setPlots({
                    dayBefore:formatData(responses[0].data),
                    weekBefore:formatData(responses[1].data),
                    yearBefore:formatData(responses[2].data)
                })
            }catch(err){
                console.log(err);
            }
            };
            getData();
            console.log(plots);
    },[]);
    return ( 
        <section >
            {
                plots != undefined ? <StockChart
                chartData={plots}
                symbol={parm.stock}
                /> :
                <h1>Loading</h1>
            }
            
        </section>
     );
}

export default StockDetail;