import wineData from '../../data/products.json'; // Adjust path as per the structure
import { useState } from 'react';

export default function MenuSearch() {
  const [search, setSearch] = useState('');

  const filteredWines = wineData.filter(wine =>
    wine.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Menu Search</h1>
      <input
        type="text"
        placeholder="Search for a wine"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
      />

      <ul>
        {filteredWines.map((wine, index) => (
          <li key={index}>
            <h3>{wine.name}</h3>
            <p>{wine.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
