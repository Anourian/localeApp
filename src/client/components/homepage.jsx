"use strict";
import React from 'react';
import Search from '../components/search';
import $ from 'jQuery'
class HomePage extends React.Component {
  constructor(){
    super()
    this.state = {data:'empty'}
  }
  componentDidMount(){
    var comp = this;
    comp.request = $.get('/data', function(data, status, obj){
      if (obj.status === 200){
        var cldr = JSON.parse(data);
        var delimiters = {};
        for (var locale in cldr.main){
          delimiters[locale] = cldr.main[locale]['delimiters'];
        }
        var delimProps = Object.keys(delimiters[locale]);
        var dPropsLength = delimProps.length;
        var showProps = {};
        for(var i = 0; i < dPropsLength; i ++){
          showProps[delimProps[i]] = false;
        }
        showProps['Locale'] = false;
        showProps['keys'] = ['Locale'].concat(delimProps);
        showProps.count = 0;
        comp.setState({data:delimiters,success:true,delimProps:showProps});
      } else {
        comp.setState({success:false});
      }
    });    
  }
  componentWiillUnMount (){
    this.request.abort();
  }
  render(){
    return (
      <div className="container">
        <h1 className="text-center">Sample Locale Delimiter Specific Search</h1>        
        {!this.state.success && <h2>There was an error loading delimiter data</h2>}
        {this.state.success && <h2 className="text-center">Search is case sensitive</h2>}
        <Search results={this.state.data} delimProps={this.state.delimProps}/>
      </div> 
    )
  }
}

module.exports = HomePage