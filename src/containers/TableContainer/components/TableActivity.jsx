import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'reactstrap';
import { getFormatDate } from './../utils/utils';

class TableActivity extends React.PureComponent {
  render() {
    const { editItem, activitiesList, deleteItem } = this.props;
    return (
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Тип активности</th>
            <th>Дистанция</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          {activitiesList.map((item, index) => (
            <tr
              key={item.id.toString()}
            >
              <th scope="row">{index + 1}</th>
              <th>{item.type}</th>
              <th>{item.distance}</th>
              <th>{getFormatDate(item.date)}</th>
              <th><Button size="sm" onClick={() => editItem(item.id)}>Редактировать</Button></th>
              <th><Button close onClick={() => deleteItem(item.id)} /></th>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

TableActivity.propTypes = {
  activitiesList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  deleteItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
};

export default TableActivity;
