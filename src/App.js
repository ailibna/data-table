import React from "react";
import './App.scss';
import DataTable, { createTheme } from 'react-data-table-component';
import Data from './data';
import DeleteButton from './Component/DeleteButton';
import EditButton from './Component/EditButton';
import AddNewButton from './Component/AddNewButton'

const customStyles = {
  headCells: {
      style: {
          fontWeight: 'bold',
          fontSize: '14px',
      },
    },
  rows: {
    style: {
      minHeight: '60px',
      fontSize: '12px',
      fontWeight: 400,
      '&:nth-child(even)':{
          backgroundColor: '#fafafa'
      }
    }
  },
};
createTheme('solarized', {
  text: {
      primary: '#9f9f9f',
      secondary: '9f9f9f'
  },
  background: {
      default: 'white',
  },
  divider: {
      default: '#f5f5f5',
  },
  });


class App extends React.Component {
  constructor(props) {
    super(props);
    const dataSet = <Data/>
    this.state = {
        data: dataSet.type,
        removeRowModal: false
    };
  }
  removeRow=(removeId)=>{
    this.setState({
      data: this.state.data.filter((i) =>  i.id !== removeId)
    })
  }
  updateRow=(updateId,newTitle,newNumber)=>{
    this.setState({
      data: this.state.data.map(e => (e.id === updateId ? {...e,title: newTitle,Number: newNumber} : e))
    });
  }
  addNewRow=(title, number)=>{
    var maxid = 0;
    this.state.data.map((e)=>{     
        if (e.id > maxid) maxid = e.id;
        return maxid   
    });
    this.setState(e => ({
      data: [...e.data, {id: maxid+1, title: title, Number: number}]
  }));
  }
  render(){
    const columns = [
      {
        name: 'ID',
        selector: row => row.id,
        sortable: true,
    },
      {
          name: 'Title',
          selector: row => row.title,
          sortable: true,
      },
      {
          name: 'Number',
          selector: row => row.Number,
          sortable: true,
      },
      {
        name: '',
        selector: row => <EditButton updateFunc={this.updateRow} rowId={row.id}/>,
        maxWidth: '100px',
        minWidth: '100px',
        width: '100px',
    },
    {
      name: '',
      selector: row => <DeleteButton removeFunc={this.removeRow} rowId={row.id}/>,
      maxWidth: '100px',
      minWidth: '100px',
      width: '100px',
    },
    ];
  return (
    <div className="main">
      <AddNewButton addNewFunc={this.addNewRow}/>
   <div className="dataTable">
    <DataTable
              responsive={true}
              customStyles={customStyles}
              columns={columns}
              data={this.state.data}
              theme="solarized"
              highlightOnHover
              pagination
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 15, 25, 50]}
              paginationComponentOptions={{
                rowsPerPageText: 'Records per page:',
                rangeSeparatorText: 'out of',
              }}
    />
   </div>
   </div>
  );
}
}

export default App;
