import React, {PropTypes} from 'react';
import Api from '../Api'
import FandomItem from '../components/FandomItem'

export default class ShowFandoms extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    fandoms: []
  }

  async componentDidMount() {
    let fandoms = await Api.loadFandoms();
    this.setState({fandoms: fandoms})
  }

  render() {
    return (<div className='fandoms-list'>
      {this.state.fandoms.map(function(item){
        return <FandomItem key={`fandom_${item.id}`} fandom={item} />
      })}
      <div className='fandom-item-add'>
        +
      </div>
    </div>);
  }
}

ShowFandoms.propTypes = {
};
