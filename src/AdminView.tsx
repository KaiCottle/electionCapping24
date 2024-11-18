import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './AdminView.css';

interface Faculty {
  fid: number;
  email: string;
  schoolid?: number;
  sname: string;
  ishidden: boolean;
  prefname: string;
  url: string;
  thestatement?: string;
  lastupdated?: string;
}

const App: React.FC = () => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [rowData, setRowData] = useState<Faculty[]>([]);
  const [electionName, setElectionName] = useState<string>('');

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
    { headerName: 'The Statement', field: 'thestatement', sortable: true, filter: true },
    { headerName: 'Last Updated', field: 'lastupdated', sortable: true, filter: true },
  ];

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const onExportCSV = () => {
    if (gridApi) {
      // Get all selected nodes
      const selectedNodes = gridApi.getSelectedNodes();
  
      // Filter the selected nodes to only those currently displayed (visible) in the grid
      const displayedSelectedRows = selectedNodes
        .filter((node) => node.displayed)
        .map((node) => node.data);
  
      // Map the rows to the CSV data format
      const csvData = displayedSelectedRows.map((row) => {
        const combinedStatement = `${row.thestatement || ''}
  
  <a href="${row.url || ''}" target="_blank">${row.prefname}'s bio on marist.edu<br> Please note - if you are on an Android Phone, don't click! Otherwise you will exit the election</a>`;
        
        return [
          electionName,
          row.prefname,
          'Click the "i" for more information on this candidate',
          `"${combinedStatement}"`,
        ];
      });
  
      // Prepare the CSV rows
      const csvRows = [
        ['Election Name', 'Preferred Name', 'Short Description', 'Statement'],
        ...csvData,
      ];
  
      // Convert the CSV rows to content
      const csvContent = csvRows.map((e) => e.join('\t')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const fileName = electionName ? `${electionName}.csv` : 'faculty_export.csv';
  
      // Trigger the CSV download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    }
  };
  

  useEffect(() => {
    fetch('https://facelect.capping.ecrl.marist.edu/faculty')
      .then(response => response.json())
      .then(data => setRowData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="app-container">
      <div className="header">
        <h1>Marist College Faculty Directory</h1>
      </div>
      <div className="input-card">
        <label htmlFor="electionName">Election Name:</label>
        <input
          type="text"
          id="electionName"
          value={electionName}
          onChange={(e) => setElectionName(e.target.value)}
          placeholder="Enter Election Name"
        />
      </div>
      <div className="button-container">
        <button className="fancy-button" onClick={onExportCSV}>Export Selected to CSV</button>
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
