import React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import TableActivity from './components/TableActivity';
import TableDropdown from './components/TableDropdown';
import TableForm from './components/TableForm';
import { SORT_OPTIONS, SortEnum } from './utils/utils';
import {
  fetchGetActivities,
  setCurrentActivity,
  setCurrentSortBy,
  fetchDeleteActivity,
} from './redux/actions';
import {
  getActivitiesListBySort,
  getUniqueTypeActivities,
  getIsFetching,
  getFetchError,
  getFetchDeleteError,
} from './redux/selectors';

class WorkoutTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      itemId: null,
    };

    this.handleSetCurrentActivity = this.handleSetCurrentActivity.bind(this);
    this.handleSortDistance = this.handleSortDistance.bind(this);
    this.handleSortDate = this.handleSortDate.bind(this);
    this.handleDeleteActivitiyItem = this.handleDeleteActivitiyItem.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.props.fetchGetActivities();
  }

  handleSetCurrentActivity(typeActivity) {
    this.props.setCurrentActivity(typeActivity === 'Все активности' ? null : typeActivity);
  }

  handleSortDistance(sortType) {
    if (sortType === 'По возрастанию') {
      this.props.setCurrentSortBy(SortEnum.SORT_BY_DISTANCE_UP);
      return;
    }
    if (sortType === 'По убыванию') {
      this.props.setCurrentSortBy(SortEnum.SORT_BY_DISTANCE_DOWN);
      return;
    }

    this.props.setCurrentSortBy(null);
  }

  handleSortDate(sortDate) {
    if (sortDate === 'По возрастанию') {
      this.props.setCurrentSortBy(SortEnum.SORT_BY_DATE_UP);
      return;
    }
    if (sortDate === 'По убыванию') {
      this.props.setCurrentSortBy(SortEnum.SORT_BY_DATE_DOWN);
      return;
    }

    this.props.setCurrentSortBy(null);
  }

  handleDeleteActivitiyItem(itemId) {
    this.props.fetchDeleteActivity(itemId);
  }

  handleOpenModal() {
    this.setState({
      isModalOpen: true,
    });
  }

  handleEditItem(id) {
    this.setState({
      itemId: id,
      isModalOpen: true,
    });
  }

  handleCloseModal() {
    this.setState({
      itemId: null,
      isModalOpen: false,
    });
  }

  renderTableActivity() {
    const { isFetching, fetchError, activitiesList } = this.props;
    if (isFetching) {
      return (
        <p style={{ textAlign: 'center' }}>Данные загружаются...</p>
      );
    }
    if (fetchError) {
      return (
        <p>Ошибка при получении данных...</p>
      );
    }
    return (
      <TableActivity
        activitiesList={activitiesList}
        deleteItem={this.handleDeleteActivitiyItem}
        editItem={this.handleEditItem}
      />
    );
  }

  render() {
    const { uniqueActivities } = this.props;

    return (
      <div>
        <div>
          <TableDropdown
            title="Фильтр по активности"
            options={uniqueActivities}
            setCurrentItem={this.handleSetCurrentActivity}

          />
          <TableDropdown
            title="Соритровка по дистанции"
            options={SORT_OPTIONS}
            setCurrentItem={this.handleSortDistance}
          />
          <TableDropdown
            title="Соритровка по дате"
            options={SORT_OPTIONS}
            setCurrentItem={this.handleSortDate}
          />
        </div>
        {this.props.fetchDeleteError ? <p>Произошла ошибка при удалении тренировки</p> : ''}
        {this.renderTableActivity()}
        <Button
          color="secondary"
          onClick={this.handleOpenModal}
        >
          Добавить тренировку
        </Button>
        <Modal
          isOpen={this.state.isModalOpen}
          toggle={this.handleCloseModal}
        >
          <ModalHeader>{this.state.itemId ? 'Редактирование ' : 'Добавление '}тренировки</ModalHeader>
          <ModalBody>
            <TableForm
              closeModal={this.handleCloseModal}
              itemId={this.state.itemId}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

WorkoutTable.propTypes = {
  activitiesList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  fetchGetActivities: PropTypes.func.isRequired,
  setCurrentActivity: PropTypes.func.isRequired,
  setCurrentSortBy: PropTypes.func.isRequired,
  fetchDeleteActivity: PropTypes.func.isRequired,
  uniqueActivities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  fetchDeleteError: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const activitiesList = getActivitiesListBySort(state);
  const uniqueActivities = getUniqueTypeActivities(state);
  const isFetching = getIsFetching(state);
  const fetchError = getFetchError(state);
  const fetchDeleteError = getFetchDeleteError(state);

  return {
    activitiesList,
    uniqueActivities,
    isFetching,
    fetchError,
    fetchDeleteError,
  };
};

const mapDispatchToProps = {
  fetchGetActivities,
  setCurrentActivity,
  setCurrentSortBy,
  fetchDeleteActivity,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutTable);
