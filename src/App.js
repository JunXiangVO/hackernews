import React, { Component } from 'react';

import './App.css';

const list = [
  {
  title: 'React',
  url: 'https://facebook.github.io/react/',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectID: 0,
  },
  {
  title: 'Redux',
  url: 'https://github.com/reactjs/redux',
  author: 'Dan Abramov, Andrew Clark',
  num_comments: 2,
  points: 5,
  objectID: 1,
  }
  ];
/*  
 function isSearched(searchTerm){
    return function(item) {
      return  item.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
    }
  }   */

  const isSearched = searchTerm => item => ( item.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));

class App extends Component {
  constructor(props){
    super(props);
    this.state={list:list, searchTerm:'',};
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id){
/*     function isNotID(item) {return item.objectID!==id;} */
    /* const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId); */

    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({list:updatedList});
  };

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
    };

  render() {
    
    return (
      <div className="App">
        <div className="App-header"> 

        <form> <input type="text" onChange={this.onSearchChange}/> </form>

          {this.state.list.filter(isSearched(searchTerm)).map(item=>{
            return (
              <div key={item.objectID}>
                <span> <a href={item.url}>{item.title}</a> </span><br />
                <span>{item.author}</span> 
                <span>{item.points}</span>
                
                <span>
                  <button
                  onClick={() => this.onDismiss(item.objectID)}
                  type="button"
                  >
                  Dismiss
                  </button>
                </span>
              </div>
            )
          })}
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
