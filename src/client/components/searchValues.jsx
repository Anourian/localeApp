'user strict';
import React from 'react';

class SearchValues extends React.Component {
  constructor (){
    super()
    this.state = {values:{},show:false, headers:[], sorted:false, order:[]};
  }
  componentWillReceiveProps(props){    
    var order;
    //determine if sorted or not
    if (props.sorted){
      order = props.order;
    } else {
      order = Object.keys(props.data);
    }
    this.setState({values:props.data, show:props.show, headers:props.headers, sorted:props.sorted, order:order});

  }
  render (){
    return (
      <div className='tableBody'>       
        {(this.state.headers.count > 0) && this.state.order.map(function(value, index,obj){
          return (
            <div key={'tableRow' + index} className='tableRow'>
              <div className='tableData' key={'locale'+index}>{value}</div>
              {this.state.headers.keys.map(function(val, i){
                if (i > 0 && this.state.headers[val]){
                  return (
                    <div className='tableData' key={'prop'+value +i}>{this.state.values[value][val]}</div>
                    )
                }
              }, this)}
            </div>
            )
        }, this)}
      </div>
      )
  }
}
module.exports = SearchValues;
