import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  fetchPets = () => {
    let endpoint = '/api/pets';
    if (this.state.filters.type !== 'all') {
      endpoint += `?type=${this.state.filters.type}`;
    }

    fetch(endpoint)
      .then(resp => resp.json())
      .then(pets => this.setState({ pets: pets }))
  }
  onChangeType = ({target: {value} }) => {
    this.setState({ filters: { 
      ...this.state.filters, 
      type: value }
    })
  }

  onAdoptPet = petsId => {
    const pets = this.state.pets.map(p => {
      return p.id === petsId ? {...p, isAdopted: true } : p;
    });
    this.setState({ pets: pets})
  }
  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onChangeType={this.onChangeType}
              onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser 
              animals={this.state.animals} 
              onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
