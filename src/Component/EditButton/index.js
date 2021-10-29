import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import './style.scss';


class EditButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        EditRowModal: false,
        title: '',
        number: '',
        titleError: false,
        numberError: false
    };
  }
  sendData=(rowId)=>{
    axios.post('/', {
      id: rowId,
      title: this.state.title,
      number: this.state.number,
      })
      .then(response=>{
          console.log(response);
        })
      .catch(error=>{
        console.log(error);
      });
  }
  EditRowClose=()=>{
    this.setState({
        EditRowModal: false
    })
  }
  EditRowShow=()=>{
    this.setState({
        EditRowModal: true
    })
  }
  changeTitleHandler=(e)=>{
      this.setState({
          title: e.target.value
      })
  }
  changeNumberHandler=(e)=>{
    this.setState({
        number: e.target.value
    })
    }
    updateRowHandler=()=>{
      if(this.state.title===''){
        this.setState({
            titleError: true
        })
    }
    else{
        this.setState({
            titleError: false
        })
    }
    if(this.state.number===''){
        this.setState({
            numberError: true
        })
    }
    else{
        this.setState({
            numberError: false
        })
    }
    if(this.state.number!=='' && this.state.title!==''){
        const id = this.props.rowId
        this.props.updateFunc(id,this.state.title,this.state.number);
        this.sendData(id);
        this.EditRowClose();
    }
  } 
 
  render(){
  return (
   <div className="dataTable__editRow">
     <Button variant="warning" onClick={this.EditRowShow}>Edit</Button>
    {/* remove Row modal */}
      <Modal show={this.state.EditRowModal} onHide={this.EditRowClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="dataTable__editRow__table">
                <div className="dataTable__editRow__table__input">
                    <span>Title</span>
                    <input onChange={this.changeTitleHandler} type="text"></input>
                    {this.state.titleError?
                    <span className="emptyInputError">please insert title</span>:null
                    }
                </div>
                <div className="dataTable__editRow__table__input">
                    <span>Number</span>
                    <input onChange={this.changeNumberHandler} type="text"></input>
                    {this.state.numberError?
                    <span className="emptyInputError">please insert number</span>:null
                    }
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.EditRowClose}>
            Close
          </Button>
          <Button variant="success" onClick={this.updateRowHandler}>
            save
          </Button>
        </Modal.Footer>
      </Modal>
   </div>
  );
}
}

export default EditButton;
