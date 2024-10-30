import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const [data, setData] = useState({advice: "", id: ""});
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  useEffect(() => {

    const fetchAdvice = async()=>{
     try {
       const response = await axios.get("https://api.adviceslip.com/advice");
       const dataAdvice= response.data.slip;
           setLoading(false)
       setData(prevState=> ({...prevState, advice:dataAdvice.advice, id:dataAdvice.id}) );
     } catch (error) {
       console.error(error);
        setLoading(false)
     }
    }

    fetchAdvice();

  },[reload])
  const handleReloadClick = ()=>{
    setReload(!reload)
  }
  if (loading) return <div>Loading...</div>;
  return (

    <div className='container'>
    <div className='card'>
      <h3 className='heading'>Advice #{data.id}</h3>
      <p className='advice'>"{data.advice}"</p>
      <img className='icon' src='images/icon-dice.svg' alt="dice" onClick={handleReloadClick}/>
    </div>
    </div>
  );
}

export default App;
