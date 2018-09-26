import React, { Component } from 'react';
import './App.css';
//import axios from 'axios';
//import SearchBar from './components/SearchBar';
//import CompanyCard from './components/CompanyCard';
 
const upcomingAPI = 'https://api.iextrading.com/1.0/stock/market/upcoming-ipos';
const CompanyCard = ({company}) => {
  return(
     <div>
          <div className="col-xs-4 col-sm-3">
          
          </div>
          <div className="col-xs-8 col-sm-9">
              <span>{company.companyName + ' (' + company.sharesOutstanding} shares)</span><br/>
              
              <span title={company.address}></span>
              <span>{company.address}</span><br/>
              
              <span title={company.phone}></span>
              <span>{company.phone}</span><br/>
              
              <span title={company.url}></span>
              <span>{company.url}</span><br/>
          </div>
          <div className="clearfix"></div>
     </div>        
  )
} 

const SearchBar = ({onSearch}) => {
  const handleChange = (e) => {
      onSearch(e.target.value);
  }
  return( 
      <div className="input-group ">
          <input onChange = {handleChange} className="form-control" 
           type="search" placeholder="Search for a company" id="search-input" />
      
      </div>
  )
}


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchResult: [],
      companyList: []
    }
  
 
  }
  componentWillMount() {
    let init = {
         method: 'GET',
         headers: new Headers(),
         mode: 'cors',
         cache: 'default' 
      };

    fetch(upcomingAPI, init)
      .then( response => response.json())
      .then( 
        data => this.setState( 
          prevState => ({
            companyList: [...data.rawData]
          }) 
      )
    )
}
returncompanyList() {
  return this.state.searchText ? this.state.searchResult :this.state.companyList
 }
handleSearcha(searchText) {
   console.log(searchText);
  
 this.setState({searchResult: [], searchText: searchText});
  this.state.companyList.map(company => {
  if(searchCompany(company, searchText)) {
       this.setState( prevState => ({
         searchResult: [...prevState.searchResult, company]
       }), () => console.log(this.state.searchResult))
    }
 })
}
handleSearch = (searchText) => {
  this.setState({searchResult: [], searchText: searchText} )
  console.log(searchText);
  this.state.companyList.map(company => {
    if(searchCompany(company, searchText)) {
         this.setState( prevState => ({
           searchResult: [...prevState.searchResult, company]
         }), () => console.log(this.state.searchResult))
      }
   })

}

  render() {
    return(
        <div className="row">
          <div className="col-xs-12 col-sm-offset-3 col-sm-6"> 
           <span className="title">Search Upcoming IPOs</span>
            <SearchBar onSearch={this.handleSearch} />
            <ul className="list-group" id="company-list">
            { this.returncompanyList().map(
                (company) => 
                  <li key={company.cik} className="list-group-item"> 
                    <CompanyCard company = {company}/>
                  </li>
              )
            }
            </ul>
         </div>
       </div>
      )
    }
    
}
  
/* Company filter the name function */
const searchCompany = (company, searchText) => ( 
  company.companyName.toLowerCase().search(searchText.toLowerCase()) !== -1 || 
  company.address.toLowerCase().search(searchText.toLowerCase()) !== -1 || 
  company.phone.toString().search(searchText) !== -1 
)
export default App;