// src/App.js
import React, { useState } from 'react';

const API_KEY = 'YOUR_OMDB_API_KEY'; // Get free key at http://www.omdbapi.com/apikey.aspx

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const searchMovies = async () => {
    if (!query) return;
    try {
      setError(null);
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
      const data = await res.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError('Failed to fetch movies');
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h1>Movie Explorer</h1>
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ width: '70%', padding: 10, fontSize: 16 }}
      />
      <button onClick={searchMovies} style={{ padding: '10px 20px', marginLeft: 10 }}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 20 }}>
        {movies.map(movie => (
          <div key={movie.imdbID} style={{
            width: 180,
            margin: 10,
            padding: 10,
            border: '1px solid #ccc',
            borderRadius: 8,
            textAlign: 'center'
          }}>
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150x220?text=No+Image'}
              alt={movie.Title}
              style={{ width: '100%', borderRadius: 4 }}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
