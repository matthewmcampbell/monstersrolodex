import './App.css';
import { Component } from 'react';
import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component'

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchString: '',
    };
  }

  componentDidMount() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        this.setState(() => {
          return {monsters: data}
        })
      })
  }

  onSearchChange = (event) => {
    const searchString = event.target.value.toLocaleLowerCase();
    this.setState(
      () => {
        return { searchString }
      }
    )
  }

  render() {
    const { monsters, searchString } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter(monster => {
      return monster.name.toLocaleLowerCase().includes(searchString);
    })

    return (
      <div className="App">
        <h1 className="app-title">Monster Rolodex</h1>
        <SearchBox
          onChangeHandler = { onSearchChange }
          placeholder = 'Search monsters'
          className = 'monster-search-box'
        />
        <CardList monsters = { filteredMonsters }/>
      </div>
    );
  }
}

export default App;
