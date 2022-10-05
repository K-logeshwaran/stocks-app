import AutoComplete from "../components/autocomplete";
import StockTable from "../components/table";
function StocksOverView() {
    
    return ( 
        <main className="container">
            <AutoComplete/>
            <StockTable/>  
        </main>
     );
}

export default StocksOverView;