import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './AdminView.css';

interface Faculty {
  fid: number;
  email: string;
  schoolid?: number; // This field is not fetched from the query, so make it optional
  sname: string;
  ishidden: boolean;
  prefname: string;
  url: string;
  thestatement?: string; // Optional field
  lastupdated?: string;  // Optional field
}

const App: React.FC = () => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [rowData, setRowData] = useState<Faculty[]>([]);

  const columnDefs: ColDef[] = [
    {
      headerName: '',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 50,
    },
    { headerName: 'FID', field: 'fid', sortable: true, filter: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    { headerName: 'School', field: 'sname', sortable: true, filter: true },
    { headerName: 'Preferred Name', field: 'prefname', sortable: true, filter: true },
    { headerName: 'URL', field: 'url', sortable: true, filter: true },
    { headerName: 'The Statement', field: 'thestatement', sortable: true, filter: true }, // Optional field
    { headerName: 'Last Updated', field: 'lastupdated', sortable: true, filter: true }, // Optional field
  ];

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const onExportCSV = () => {
    if (gridApi) {
      gridApi.exportDataAsCsv({
        onlySelected: true,
        processCellCallback: (params) => {
          if (params.column.getColId() === 'prefname') {
            return params.value;
          } else if (params.column.getColId() === 'sname') {
            return params.value;
          }
          return null;
        },
        columnKeys: ['prefname', 'sname'],
      });
    }
  };

  const onExportExcel = () => {
    if (gridApi) {
      gridApi.exportDataAsExcel({
        onlySelected: true,
        processCellCallback: (params) => {
          if (params.column.getColId() === 'prefname') {
            return params.value;
          } else if (params.column.getColId() === 'sname') {
            return params.value;
          }
          return null;
        },
        columnKeys: ['prefname', 'sname'],
      });
    }
  };

  useEffect(() => {
    fetch('http://localhost:3001/faculty')
      .then(response => response.json())
      .then(data => setRowData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="app-container">
      <div className="header">
        <h1>Marist College Faculty Directory</h1>
      </div>
      <div className="button-container">
        <button onClick={onExportCSV}>Export Selected to CSV</button>
        <button onClick={onExportExcel}>Export Selected to Excel</button>
      </div>
      <div className="ag-theme-alpine" style={{ height: '600px', width: '90%', margin: '0 auto' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          rowSelection="multiple"
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};

export default App;
