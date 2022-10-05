import Chart from "react-apexcharts" ;
import { useEffect, useState } from "react";
function StockChart({chartData,symbol}) {
    let {dayBefore,weekBefore,yearBefore} = chartData;
    
    const [timeLine,setTimeLine] = useState({
        txt:"Before 7d",
        period:weekBefore,
        clr:(weekBefore[weekBefore.length-1].y-weekBefore[0].y) > 0 ? "#26C281" : "#ed3419"
    });
    console.log(dayBefore,weekBefore,yearBefore);
    console.log(weekBefore[weekBefore.length-1].y-weekBefore[0].y);
    let options = {
        colors:[timeLine.clr],
        title:{
            text:symbol,
            align:"center",
            style:{
                fontSize:"24px"
            }
        },
        chart: {
            id: "stock data" ,
            animations: {
            speed: 1300
            }   
        },
        xaxis: {
            type: "datetime",
            labels: {
              datetimeUTC: false
            }
          },
          tooltip: {
            x: {
              format: "MMM dd  HH:MM"
            }
          }
    }
    const series=[{
        name:symbol,
        data:timeLine.period
    }]
    
    return ( 
        <div className="mt-5 p-4 shadow-sm bg-white">
            <h1 className=" display-6">{timeLine.txt}</h1>
            <Chart 
                 options={options}
                 series = {series}
                 type = "area"
                 width = "100%"
            />
            <div className="d-flex flex-row justify-content-around mb-100 " style={{width:"30%"}} >
                <button type="button" class={`btn ${timeLine.txt=="Before 24h" ?"btn-primary":"btn-outline-primary" }`} onClick={()=>setTimeLine({txt:"Before 24h",period:dayBefore,clr:(dayBefore[dayBefore.length-1].y-dayBefore[0].y) > 0 ? "#26C281" : "#ed3419"})}>24h</button>
                <button type="button" class={`btn ${timeLine.txt=="Before 7d" ?"btn-primary":"btn-outline-primary" }`} onClick={()=>setTimeLine({txt:"Before 7d",period:weekBefore,clr:(weekBefore[weekBefore.length-1].y-weekBefore[0].y) > 0 ? "#26C281" : "#ed3419"})}>7d</button>
                <button type="button" class={`btn ${timeLine.txt=="Before 1y" ?"btn-primary":"btn-outline-primary" }`} onClick={()=>setTimeLine({txt:"Before 1y",period:yearBefore,clr:(yearBefore[yearBefore.length-1].y-yearBefore[0].y) > 0 ? "#26C281" : "#ed3419"})}>1y</button>
            </div>
        </div>
     );
}

export default StockChart;

// ? "#26C281
// " : "#ed3419 "I