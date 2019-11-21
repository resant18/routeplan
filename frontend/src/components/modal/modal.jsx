import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/modal_actions';
import TripFormContainer from '../trip/trip_form_container';

const Modal = ({ modal, hideModal }) => {  
  let component;

  switch (modal) {
    case 'trip-form':
      component = <TripFormContainer />;
      break;    
    default:
      return null;
  }

  return (
    <div className='modal-main' onClick={hideModal}>
      <section className='modal-content' onClick={e => e.stopPropagation()}>
        {component}
      </section>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(hideModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
