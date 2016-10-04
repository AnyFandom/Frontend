import React, {PropTypes} from 'react';
import Api from '../Api'
import FandomItem from '../components/FandomItem'
import {Link} from 'react-router'
import Core from '../Core'

export default class ShowFandoms extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    fandoms: []
  }

  async componentDidMount() {
    Core.push('current-page-update', 'fandoms')
    let fandoms = await Api.loadFandoms();
    this.setState({fandoms: fandoms})
  }

  render() {
    return (<div className='fandoms-list'>
      {this.state.fandoms.map(function(item){
        return <FandomItem key={`fandom_${item.id}`} fandom={item} />
      })}
      <Link to='/app/fandoms/add'><div className='fandom-item-add'>
        +
      </div></Link>
    </div>);
  }
}

ShowFandoms.propTypes = {
};
