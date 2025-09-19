import { useEffect, useState, useRef } from 'react'
import marker from './assets/marker.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const [engine, setEngine] = useState('PrivAU');
  const [url, setUrl] = useState('https://priv.au/search?q=');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  const inputRef = useRef();

  {/*Focus on the reference as soon as the page loads*/}
  useEffect(()=>{
    inputRef.current.focus();

    const updateDateTime = () => {
      const date = new Date().toLocaleDateString('en-US', {timeZone: "America/New_York", weekday: 'long', month: 'long', day: 'numeric'});
      const time = new Date().toLocaleTimeString('en-US', {timeZone: "America/New_York", hour12: true, hour: 'numeric', minute: 'numeric'});

      setCurrentDate(date);
      setCurrentTime(time);

    };

    /* Update date and time each second */
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);

  },[]);

  const swapEngine = (event) =>
    {
      setCount((count) => count + 1);

      switch(count) {
        case 0:
          setEngine("RhsczEU");
          setUrl('https://search.rhscz.eu/search?q=');
        break;

        case 1:
          setEngine("Google");
          setUrl('https://www.google.com/search?q=');
        break;

        case 2:
          setCount((count) => 0);
          setEngine("PrivAU");
          setUrl('https://priv.au/search?q=');
        break;

        default:
          setEngine("ERROR");
          setUrl('');
      }


    };

  return (
    <>
    <div className='App'>
        {/* Time */}
        <h1>{currentTime}</h1>

        {/* Date */}
        <h2>{currentDate}</h2>
        
        {/* Search Box */}
        <div className='search'>

          <img src={marker} className="smarker" />
        
          <input
            ref={inputRef}
            type='text'
            value={input}
            onChange={e=>setInput(e.target.value)} /* when the user enters something, update the input value with the event "e" */
            onKeyDown={e=>{if (e.key === "Enter") {

              switch(input) {
                case "/alert":
                  window.alert(input);
                  break;

                case "/proton":
                case ".proton":
                  window.location.href = "https://proton.me/";
                break;

                case "/youtube":
                case ".youtube":
                case "/yoputube":
                case "/youtueb":
                case ".youtueb":
                  window.location.href = "https://youtube.com";
                break;

                case "/tuta":
                case ".tuta":
                  window.location.href = "https://tuta.com/";
                break;

                case "/jisho":
                case ".jisho":
                  window.location.href = "https://jisho.org/";
                break;

                case "/trans":
                case ".trans":
                  window.location.href = "https://translate.google.com/";
                break;

                case "/psn":
                case ".psn":
                  window.location.href = "https://psnprofiles.com/";
                break;
              
                default:
                  window.location.href = (url + input.replaceAll(" ", "+"));
                break;
                }

              setInput("")
            
            }}}
          />
        
        </div>

        {/* Button */}
        <div className="card">
          <button onClick={swapEngine}>
            {engine}
          </button>
        </div>
      </div>
    </>
  )
}

export default App

