import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Data from '../../data';

class AddNewButton extends React.Component {
  constructor(props) {
    super(props);
    const dataSet = <Data/>
    this.state = {
        addNewRowModal: false,
        title: '',
        number: '',
        data: dataSet.type,
        id: '',
        titleError: false,
        numberError: false
    };
  }
  sendData=()=>{
    var maxid = 0;
    this.state.data.map((e)=>{     
        if (e.id > maxid) maxid = e.id;
        return maxid   
    });
    axios.post('/', {
      id: maxid+1,
      title: this.state.title,
      number: this.state.number
      })
      .then(response=>{
          console.log(response);
        })
      .catch(error=>{
        console.log(error);
      });
  }
  addNewRowClose=()=>{
    this.setState({
        addNewRowModal: false
    })
  }
  addNewRowShow=()=>{
    this.setState({
        addNewRowModal: true
    })
  }
  addNewTitleHandler=(e)=>{
      this.setState({
          title: e.target.value
      })
  }
  addNewNumberHandler=(e)=>{
    this.setState({
        number: e.target.value
    })
}
addNewRowHandler=()=>{
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
        this.props.addNewFunc(this.state.title, this.state.number);
        this.sendData();
        this.addNewRowClose();
    }
}
  
  render(){
  return (
   <div className="dataTable__addNewRow">
    <Button onClick={this.addNewRowShow} variant="secondary" className="addNewButton">Add New +</Button>
    {/* remove Row modal */}
      <Modal show={this.state.addNewRowModal} onHide={this.addNewRowClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="dataTable__editRow__table">
                <div className="dataTable__editRow__table__input">
                    <span>Title</span>
                    <input onChange={this.addNewTitleHandler} type="text"></input>
                    {this.state.titleError?
                    <span className="emptyInputError">please insert title</span>:null
                    }
                </div>
                <div className="dataTable__editRow__table__input">
                    <span>Number</span>
                    <input onChange={this.addNewNumberHandler} type="text"></input>
                    {this.state.numberError?
                    <span className="emptyInputError">please insert number</span>:null
                    }
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.addNewRowClose}>
            Close
          </Button>
          <Button variant="success" onClick={this.addNewRowHandler}>
            save
          </Button>
        </Modal.Footer>
      </Modal>
   </div>
  );
}
}

export default AddNewButton;
