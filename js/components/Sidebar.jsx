import React, {PropTypes} from 'react';
import CircleIcon from './CircleIcon'

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className='sidebar'>
      <div className='block'>
        <header>
          <span className='title-deco' />
          <h3>Stream</h3>
        </header>
        <section>
          <ul>
            <li>
              <img src='https://static.lunavod.ru/img/users/1/avatar_48x48.jpg' />
              <span className='author'>Lorem</span>
              <span className='target'>Steins;Gate ZERO</span>
              <CircleIcon>textsms</CircleIcon>
            </li>
            <li>
              <img src='https://static.lunavod.ru/img/users/94/avatar_48x48.jpg' />
              <span className='author'>ADMIN</span>
              <span className='target'>Steins;Gate ZERO</span>
              <CircleIcon>note_add</CircleIcon>
            </li>
          </ul>
        </section>
      </div>
    </div>);
  }
}

Sidebar.propTypes = {
};
