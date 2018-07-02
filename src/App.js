import React, { Component } from 'react';

import './App.css';

const DEFAULT_QUERY = '';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
//const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

  
 /* function isSearched(searchTerm){
    return function(item) {
      return  item.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
    }
  }    */

  //const isSearched = searchTerm => item => ( item.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));

class App extends Component {
  constructor(props){
    super(props);
    this.state={result: null,searchTerm: DEFAULT_QUERY,};
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => error);
    }
    
  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss(id){
/*     function isNotID(item) {return item.objectID!==id;} */
    /* const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId); */
/*      this.setState({result:updatedHits});  */

    const updatedHits = this.state.result.hits.filter(item => item.objectID !== id);
     /* this.setState({result:Object.assign({}, this.state.result, {hits:updatedHits})}); //also works */
     this.setState({ result: { ...this.state.result, hits: updatedHits }}); //spread operator

  };

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
    };

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
    }  

  render() {
    const{searchTerm, result}=this.state;
    if (!result) { return null; }
    return (
      <div className="page">
        <div className="interaction"> 

        <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}/>
        {result ? <Table list={result.hits} onDismiss={this.onDismiss} /> : null}
          
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

/* class Search extends Component {
  render() {
    const{value, onChange}=this.props;
    return (
      <form> <input type="text" value={value} onChange={onChange} /> </form>
    )
  }
} */

/* function Search({value, onChange, children}) {
  return (
    <form> {children}<input type="text" value={value} onChange={onChange} /> </form>
  )
} */

const Search = ({value, onChange, onSubmit, children}) => <form onSubmit={onSubmit}> <input type="text" value={value} onChange={onChange} /> <button type="submit">{children}</button></form>

const Table =({list, onDismiss})=><div className="table">
  {
    list.map(
      item=>
        <div key={item.objectID} className="table-row">
          <span style={{ width: '40%' }}> <a href={item.url}>{item.title}</a> </span><br />
          <span style={{ width: '30%' }}>{item.author}</span> 
          <span style={{ width: '10%' }}>{item.points}</span>
          
          <span style={{ width: '20%' }}>
            <button onClick={() => onDismiss(item.objectID)} type="button" className="button-inline">Dismiss</button>
          </span>
        </div>
    )
  }        
</div> 


export default App;
