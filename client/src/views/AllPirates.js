import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { navigate, Link } from '@reach/router';
import LogoutButton from '../components/LogoutButton';


export default function AllPirate() {
  const [pirates, setPirates] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/pirates',{
      withCredentials:true
    })
      .then(response => setPirates(response.data))
      // .catch(() => setHasError(true));
      .catch(()=>navigate('/login'));
      // .catch(console.log);
  }, []);

  function handleDelete(id) {
    axios.delete('http://localhost:8000/api/pirates/' + id)
      .then(() => setPirates(pirates.filter(pirate => pirate._id !== id)))
  }

  if(hasError) return 'Something went wrong!';

  if(pirates === null) return 'Loading...';

  return (
    <div style={{padding:"50px"}}>
    <LogoutButton /> {' '}
    <Link to="/pirates/new" style={{backgroundColor:"pink", fontSize:"20px"}}>Add Pirate</Link>
      <h1>Pirate Crew</h1>
      <div>
      {pirates.map(pirate => (
            <ul key={pirate._id} style={{listStyleType: "none"}}>
              <li>
                {pirate.name}
              </li>
              <li><img src={pirate.imageUrl} alt={pirate.name} style={{width:"200px",high:"100px"}}/></li>
              <li>

              <button onClick={() => navigate('/pirates/' + pirate._id)}>View Pirate</button>{' '}
                <button
                  onClick={() => handleDelete(pirate._id)}
                >
                  Walk the Plank
                </button>
                
              </li>
            </ul>
          ))}

      </div>

    </div>
  )

}