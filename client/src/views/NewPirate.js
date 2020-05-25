import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import {  Link } from '@reach/router';

export default function NewPirate() {
  const [name, setName] = useState('');
  const [catchPhrase, setCatchPhrase] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [chest, setChest] = useState(0);
  const [pegLeg, setPegLeg] = useState(true);
  const [eyePatch, setEyePatch] = useState(true);
  const [hookHand, setHookHand] = useState(true);
  const [crewPosition, setCrewPosition] = useState("boatswain");

  const [errors, setErrors] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();

    axios.post('http://localhost:8000/api/pirates', {
      name,
      catchPhrase,
      imageUrl,
      chest,
      pegLeg,
      eyePatch,
      hookHand,
      crewPosition

    })
      .then(() => navigate('/pirates'))
      .catch(err => {
        const errs = [];
        const innerErrorsObject = err.response.data.errors;

        for(const key in innerErrorsObject) {
          errs.push(innerErrorsObject[key].message);
        }

        setErrors(errs);
      })
  }

  return (
    <div>
      {errors.map((err, i) => (
        <p key={i} style={{ color: 'red' }}>{err}</p>
      ))}
      <h1>Add Pirate</h1>
      <Link to="/pirates" style={{backgroundColor:"pink", fontSize:"20px",margin:"70px"}}>Crew Board</Link>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pirate Name</label>
          <input
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Image Url</label>
          <input
            name="imageUrl"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
          />
        </div>
        <div>
          <label># of Treasure chests:</label>
          <input
            name="chest"
            value={chest}
            onChange={e => setChest(e.target.value)}
          />
        </div>
        <div>
          <label>Pirate Catch Phrase</label>
          <input
            name="catchPhrase"
            value={catchPhrase}
            onChange={e => setCatchPhrase(e.target.value)}
          />
        </div>

        <div>
          <label>Crew Position</label>
          <select value={crewPosition}  onChange={e=>setCrewPosition(e.target.value)}>
          <option value="captain">Captain</option>
          <option value="quarterMaster">Quarter Master</option>
          <option value="boatswain">Boatswain</option>
          <option value="powderMonkey">Powder Monkey</option>
         </select>
        </div>
        <div>
          <label>Peg Leg</label>
          <input
            type="checkbox"
            checked={pegLeg}
            onChange={e => setPegLeg(e.target.checked)}
          />
        </div>
        <div>
          <label>Eye Patch</label>
          <input
            type="checkbox"
            checked={eyePatch}
            onChange={e => setEyePatch(e.target.checked)}
          />
        </div>
        <div>
          <label>Hook Hand</label>
          <input
            type="checkbox"
            checked={hookHand}
            onChange={e => setHookHand(e.target.checked)}
          />
        </div>

       <button>Add Pirate</button>
      </form>
    </div>
  )
}