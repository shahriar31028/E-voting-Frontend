import React from "react";
import { render } from "react-dom";
import ReactTable from "react-table";

class Testlogin extends React.Component {
  constructor() {
    super();
    this.state = {
      //data: makeData()
    };
  }
  render() {
    //const { data } = this.state;
    return (
      <div>
        <ReactTable
         // data={data}
          columns={[
            {
              Header: "Name",
              columns: [
                {
                  Header: "First Name",
                  accessor: "firstName"
                },
                {
                  Header: "Last Name",
                  accessor: "lastName"
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "Age",
                  accessor: "age"
                }
              ]
            }
          ]}
          defaultSorted={[
            {
              id: "age",
              desc: true
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />

      </div>
    );
  }
}

export default Testlogin
