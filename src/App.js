import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';

// rendering and re-rendering with functional components
// functional copmenents take props as arguments and returns JSX
const App = () => {
  const [searchField, setSearchField] = useState(''); // [value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilereMonsters] = useState(monsters);
  
  
  // any fetch call is a side effect => useEffect() hook
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users))
      .catch((error) => console.log("Error:") + error);
  }, []);

  useEffect(() => {
    const  newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilereMonsters(newFilteredMonsters)
  }, [monsters, searchField])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }  

  return (
    <div className="App">
      <h1 className='app-title'> Monster Rolodex</h1>
      
      <SearchBox 
      className = 'monsters-search-box'
      onChangeHandler = { onSearchChange } 
      placeholder ='search monsters'
      />
      <CardList monsters = { filteredMonsters }/> 
    </div>
  )
}
//
export default App;
