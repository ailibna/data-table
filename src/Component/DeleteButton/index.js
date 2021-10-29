import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";

class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        removeRowModal: false
    };
  }
  sendData=(rowId)=>{
    axios.post('/', {
      id: rowId
      })
      .then(response=>{
          console.log(response);
        })
      .catch(error=>{
        console.log(error);
      });
  }
  removeRowClose=()=>{
    this.setState({
      removeRowModal: false
    })
  }
  removeRowShow=()=>{
    this.setState({
      removeRowModal: true
    })
  }
  removeRowHandler=()=>{
    const id = this.props.rowId;
    this.props.removeFunc(id)
    this.sendData(id);
  }
  render(){
  return (
   <div className="dataTable__deleteRow">
     <Button variant="danger" onClick={this.removeRowShow}>Delete</Button>
    {/* remove Row modal */}
      <Modal show={this.state.removeRowModal} onHide={this.removeRowClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want delete this item?!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.removeRowClose}>
            Close
          </Button>
          <Button variant="danger" onClick={this.removeRowHandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
   </div>
  );
}
}

export default DeleteButton;
