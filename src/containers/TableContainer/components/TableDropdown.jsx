import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types';

class TableDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { title, options, setCurrentItem } = this.props;

    return (
      <ButtonDropdown
        isOpen={this.state.isOpen}
        toggle={this.handleToggle}
        size="sm"
        style={{ marginRight: '10px', marginBottom: '10px' }}
      >
        <DropdownToggle caret>
          {title}
        </DropdownToggle>
        <DropdownMenu>
          {options.map(item => (
            <DropdownItem
              key={item}
              onClick={() => setCurrentItem(item)}
            >
              {item}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

TableDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setCurrentItem: PropTypes.func.isRequired,
};

export default TableDropdown;
