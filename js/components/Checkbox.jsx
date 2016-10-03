import React, {PropTypes} from 'react';

export default class Checkbox extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    checked: this.props.checked
  }

  onClick(e) {
    e.preventDefault();
    console.log(this.state)
    this.setState({checked: this.state.checked? false:true})
    if (this.props.onClick) this.props.onClick(this.state.checked)
  }

  render() {
    return (<fieldset>
<label htmlFor="text">{this.props.title}</label>
<span className="checkbox">
  <span onClick={this.onClick.bind(this)}>
    <input type="checkbox" onChange={()=>{}} tabIndex="20" name="r1" id="r1"  checked={this.state.checked} />
    <label htmlFor="r1">{this.props.label}</label>
  </span>
</span>
</fieldset>);
  }
}

Checkbox.propTypes = {
};
