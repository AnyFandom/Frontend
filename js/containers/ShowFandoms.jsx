import React, {PropTypes} from 'react';
import Api from '../Api'
import FandomItem from '../components/FandomItem'
import {Link} from 'react-router'
import Emitter from '../Emitter'

export default class ShowFandoms extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    fandoms: []
  }

  async fetchFandoms() {
    let fandoms = await Api.loadFandoms();
    this.setState({fandoms: fandoms})
  }

  async componentDidMount() {
    Emitter.push('current-page-update', 'fandoms')
    this.fetchFandoms()

    Emitter.listen('fandom-list-update', this.fetchFandoms.bind(this))
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
