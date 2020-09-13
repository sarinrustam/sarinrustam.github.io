import React from 'react';
import { Formik } from 'formik';
import { Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAddActivity, editActivity } from '../redux/actions';
import { getUtcDate, ActivitiesEnum, setFormatDate } from './../utils/utils';
import { getFormLoading, getFormError, getActivitiesList } from '../redux/selectors';

const TableForm = (props) => {
  let initialValues = {
    type: ActivitiesEnum.RUN,
    distance: '',
    date: '',
    comment: '',
  };

  if (props.itemId) {
    initialValues = { ...props.activityItem, date: setFormatDate(props.activityItem.date) };
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        if (props.itemId) {
          props.editActivity(props.itemId, {
            type: values.type,
            distance: parseInt(values.distance, 10),
            date: getUtcDate(values.date),
            comment: values.comment,
          }, props.closeModal);
        } else {
          props.fetchAddActivity({
            type: values.type,
            distance: parseInt(values.distance, 10),
            date: getUtcDate(values.date),
            comment: values.comment,
          }, props.closeModal);
        }
      }}
    >
      {formik => (
        <Form onSubmit={formik.handleSubmit}>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="type">Тип тренировки: </Label>
                <Input
                  type="select"
                  name="type"
                  id="type"
                  defaultValue={formik.values.type}
                  placeholder="Выберите тип тренировки"
                  onChange={formik.handleChange}
                >
                  <option>{ActivitiesEnum.RUN}</option>
                  <option>{ActivitiesEnum.CYCLE}</option>
                  <option>{ActivitiesEnum.SKI}</option>
                  <option>{ActivitiesEnum.WALKING}</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="distance">Дистанция: </Label>
                <Input
                  type="number"
                  name="distance"
                  id="distance"
                  defaultValue={formik.values.distance}
                  placeholder="Укажите дистанцию в километрах"
                  onChange={formik.handleChange}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="date">Дата: </Label>
                <Input
                  type="date"
                  name="date"
                  id="date"
                  defaultValue={formik.values.date}
                  placeholder="Выберите дату"
                  onChange={formik.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col>
              <FormGroup>
                <Label for="comment">Комментарий: </Label>
                <Input
                  type="textarea"
                  name="comment"
                  id="comment"
                  defaultValue={formik.values.comment}
                  placeholder="Добавьте заметку о тренировке"
                />
              </FormGroup>
            </Col>
          </Row>
          {
            !props.formError ? '' :
            <p style={{ color: 'red', marginBottom: '20px;' }}>
              При отпраке данных произошла ошибка, попробуйте позднее
            </p>
          }
          <Button
            type="submit"
            disabled={!formik.values.type || !formik.values.distance || !formik.values.date || props.formLoading}
          >
            {!props.formLoading ? 'Отправить' : 'Отправляется...'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

TableForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  itemId: PropTypes.number,
  fetchAddActivity: PropTypes.func.isRequired,
  editActivity: PropTypes.func.isRequired,
  formLoading: PropTypes.bool.isRequired,
  activityItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
  }),
  formError: PropTypes.bool.isRequired,
};

TableForm.defaultProps = {
  activityItem: null,
  itemId: null,
};

const mapStateToProps = (state, props) => {
  const formLoading = getFormLoading(state);
  const formError = getFormError(state);
  const activityItem = getActivitiesList(state).find(item => item.id === props.itemId);

  return {
    formLoading,
    formError,
    activityItem,
  };
};

const mapDispatchToProps = {
  fetchAddActivity,
  editActivity,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableForm);
