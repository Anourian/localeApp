'user strict';
import React from 'react';
import SearchResult from './searchValues';

class Search extends React.Component {
  constructor (){
    super()
    this.state = {
      searchInput:'',
      results:{},
      headers:{keys:[], count:0},
      sorted:false,
      order:[]
    };
  }
  componentWillReceiveProps(props){    
    this.setState({results:props.results,headers:props.delimProps});
  }
  _searchProperties(event){
    this.setState({
      searchInput: event.target.value
    });
    if (this.state.searchInput.length > 2){
      this._updateResults(event.target.value, this.state.headers);
    }
  }
  _updateResults(value, delimProps){
    if (value !== 'Locale'){ //exception to header check      
      var newHead = delimProps;
      var update = false;
      var delimPropsLength = newHead.keys.length;
      var found = newHead.keys.indexOf(value);
      //Change to true for whether or not to show property
      if(found > 0){
        if(!newHead[value]){
          newHead[value] = true;
          if (newHead.count === 0){
            newHead.Locale = true;
          }
          newHead.count ++;
          update = true;
        }
      }
      if (update){
        this.setState({headers:newHead});
      }      
    }

  }
  _deleteResult(value){
    //Make pair value false for property type
    var newHead = this.state.headers;
    var sorted = this.state.sorted;
    if (value === 'Locale'){
      var keys = newHead.keys.length;
      for (var i = 0; i < keys; i ++){
        newHead[newHead['keys'][i]] = false;
      }
      newHead.count = 0;
    } else {
      newHead[value] = false;      
      newHead.count --;
      if (newHead.count === 0){
        newHead['Locale'] = false;
      }
    }
    if (newHead.count === 0 && sorted){
      sorted = false;
    }
    this.setState({headers:newHead, sorted:sorted});
  }
  _groupResultsBy(prop){
    //Gather locales by like values then concat
    var group = {};
    var newOrder = [];
    var data = this.props.results;
    for (var locale in data){
      var temp = data[locale][prop];
      if(!group[temp]) {
        group[temp] = [locale];          
      } else {
        group[temp].push(locale);
      } 
    }
    for (var propVal in group){
      newOrder = newOrder.concat(group[propVal]);
    }
    this.setState({sorted:true, order:newOrder});
    
  }
  render (){   
    return (
      <div>
        <form>
          <legend className="hidden">Inside search form</legend>
          <div className="form-group">
            <label htmlFor="searchLocale">Property</label>
            <input type="text" id="searchLocale" placeholder="Enter Locale Search Property"
                value={this.state.searchInput}
                onChange={this._searchProperties.bind(this)}/>
          </div>
        </form>
        <div className="table">       
          <div className='tableHead'> 
          {/*Headers Construction*/}      
            <div className='tableRow'>{this.state.headers.keys.map(function(value, index){
              if (this.state.headers[value]){
                return (            
                  <div className='tableHeader' key={'header' + index}>
                  <div className='tableControls'>
                    <a href="#" onClick={this._groupResultsBy.bind(this,value)} className='sort'><i className="fa fa-sort"></i> Group</a>
                    <a href="#" onClick={this._deleteResult.bind(this,value)} className='delete'>Delete <i className="fa fa-times"></i></a>                    
                  </div>
                  <h3>{value}</h3>
                  </div>
                  );}
                
                },this)
              }          
            </div>          
          </div>
        {/*Results Construction*/}
        <SearchResult data={this.state.results} headers={this.state.headers} sorted={this.state.sorted} order={this.state.order} />
        </div>        
      </div>

      )
  }
}
module.exports = Search;