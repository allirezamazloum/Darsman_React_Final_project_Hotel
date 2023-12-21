import React,{createContext,useEffect,useState} from 'react';
//data
import {roomData} from '../data';

//////////////
import axios from "axios";
const baseURL = "http://localhost:3030/roomData";
//////////////

//create context
export const RoomContext=createContext();

const RoomProvider = ({children}) => {
  const [rooms,setRooms]=useState(roomData);
  const [adults,setAdults]=useState('1 Adult');
  const [kids,setKids]=useState('0 Kids');
  const [total,setTotal]=useState(0);
  const [loading,setLoading]=useState(false);
  //////////////////////
  // State to store the fetched data
  // const [data, setData] = useState([]);
  // Function to fetch data using Axios
  const fetchData = async () => {
    try {
      const response = await axios.get(baseURL);
      // setData(response.data);
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Call fetchData on component mount
  useEffect(() => {
    fetchData();
  }, []);
  //////////////////////

  useEffect(()=>{
    setTotal(Number(adults[0])+Number(kids[0]))
  });

  const handleClick=(e)=>{
    e.preventDefault();
    setLoading(true);
    //filter rooms based on total (present)
    const newRooms=roomData.filter(room=>{
      return total <=room.maxPerson;
    });
    setTimeout(()=>{
      setRooms(newRooms);
      setLoading(false);
    },3000);
    
  };

  return (
    <RoomContext.Provider value={{rooms,adults,setAdults,kids,setKids,handleClick,loading}}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
