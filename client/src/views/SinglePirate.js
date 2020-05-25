import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link,navigate} from '@reach/router';
export default function SinglePirate(props) {
  const [pirate, setPirate] = useState(null);

  const [name, setName] = useState('');
  const [catchPhrase, setCatchPhrase] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [chest, setChest] = useState(0);
  const [pegLeg, setPegLeg] = useState(true);
  const [eyePatch, setEyePatch] = useState(true);
  const [hookHand, setHookHand] = useState(true);
  const [crewPosition, setCrewPosition] = useState("boatswain");

  useEffect(() => {
    axios.get('http://localhost:8000/api/pirates/' + props.id)
      .then(response => {
        setPirate(response.data)
        setName(response.data.name);
        setCatchPhrase(response.data.catchPhrase);
        setImageUrl(response.data.imageUrl);
        setChest(response.data.chest);
        setPegLeg(response.data.pegLeg);
        setEyePatch(response.data.eyePatch);
        setHookHand(response.data.hookHand);
        setCrewPosition(response.data.crewPosition);


      }
  )}, []);

  if(pirate === null) return 'Loading...';

  const submitHandler = e =>{
    e.preventDefault();

    axios.put(('http://localhost:8000/api/pirates/'+props.id), {
      pegLeg,
      eyePatch,
      hookHand
    })
      .then(() => navigate('/pirates/'+props.id))
      .catch(console.log)
   
  }

  return (
    <div>
      <Link to="/pirates" style={{backgroundColor:"pink", fontSize:"20px"}}>Crew Board</Link>
      <h1>{name}</h1>
      <img src={imageUrl} alt={pirate.name} style={{width:"200px",high:"100px"}}/>
      <p>{catchPhrase}</p>

      <h2>About</h2>
      <p>Position: {crewPosition}</p>
      <p>Treasure: {chest}</p>

      <form onSubmit={submitHandler}>
      <p>Peg Leg:  {pegLeg? 'Yes' : 'No'} {pegLeg? <button style={{backgroundColor:"pink", fontSize:"20px"}}onClick={e=>setPegLeg(false)}>No</button> : <button style={{backgroundColor:"pink", fontSize:"20px"}} onClick={e=>setPegLeg(true)}>Yes</button>}</p>

      <p>Eye Patch: {eyePatch? 'Yes' : 'No'}{eyePatch? <button style={{backgroundColor:"pink", fontSize:"20px"}} onClick={e=>setEyePatch(false)}>No</button> : <button style={{backgroundColor:"pink", fontSize:"20px"}} onClick={e=>setEyePatch(true)}>Yes</button>}</p>

      <p>Hook Hand: {hookHand? 'Yes' : 'No'}{hookHand? <button style={{backgroundColor:"pink", fontSize:"20px"}} onClick={e=>setHookHand(false)}>No</button> : <button style={{backgroundColor:"pink", fontSize:"20px"}} onClick={e=>setHookHand(true)}>Yes</button>}</p>
      <button hidden >Submit</button>
      </form>

    </div>
  )
}