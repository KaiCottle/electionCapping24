import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './AdminView.css';

interface Faculty {
  fid: number;
  email: string;
  schoolid: number;
  sname: string;
  ishidden: boolean;
  prefname: string;
  url: string;
}

const App: React.FC = () => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  const rowData: Faculty[] = [
    {
      "fid": 1,
      "email": "maurice.shepard@marist.edu",
      "schoolid": 102,
      "sname": "School of Business",
      "ishidden": true,
      "prefname": "Maurice Shepard",
      "url": "http://marist.edu/faculty/mauriceshepard"
    },
    {
      "fid": 2,
      "email": "doris.miller@marist.edu",
      "schoolid": 103,
      "sname": "School of Liberal Arts",
      "ishidden": true,
      "prefname": "Doris Miller",
      "url": "http://marist.edu/faculty/dorismiller"
    },
    {
      "fid": 3,
      "email": "bonnie.graham@marist.edu",
      "schoolid": 105,
      "sname": "School of Communication and the Arts",
      "ishidden": true,
      "prefname": "Bonnie Graham",
      "url": "http://marist.edu/faculty/bonniegraham"
    },
    {
      "fid": 4,
      "email": "stacy.harris@marist.edu",
      "schoolid": 101,
      "sname": "School of Science",
      "ishidden": false,
      "prefname": "Stacy Harris",
      "url": "http://marist.edu/faculty/stacyharris"
    },
    {
      "fid": 5,
      "email": "jason.davenport@marist.edu",
      "schoolid": 102,
      "sname": "School of Business",
      "ishidden": true,
      "prefname": "Jason Davenport",
      "url": "http://marist.edu/faculty/jasondavenport"
    },
    {
      "fid": 6,
      "email": "michael.rodriguez@marist.edu",
      "schoolid": 101,
      "sname": "School of Science",
      "ishidden": true,
      "prefname": "Michael Rodriguez",
      "url": "http://marist.edu/faculty/michaelrodriguez"
    },
    {
      "fid": 7,
      "email": "jillian.tapia@marist.edu",
      "schoolid": 105,
      "sname": "School of Communication and the Arts",
      "ishidden": true,
      "prefname": "Jillian Tapia",
      "url": "http://marist.edu/faculty/jilliantapia"
    },
    {
      "fid": 8,
      "email": "tracie.cain@marist.edu",
      "schoolid": 102,
      "sname": "School of Business",
      "ishidden": true,
      "prefname": "Tracie Cain",
      "url": "http://marist.edu/faculty/traciecain"
    },
    {
      "fid": 9,
      "email": "rebecca.parker@marist.edu",
      "schoolid": 102,
      "sname": "School of Business",
      "ishidden": false,
      "prefname": "Rebecca Parker",
      "url": "http://marist.edu/faculty/rebeccaparker"
    },
    {
      "fid": 10,
      "email": "ryan.young@marist.edu",
      "schoolid": 104,
      "sname": "School of Social and Behavioral Sciences",
      "ishidden": true,
      "prefname": "Ryan Young",
      "url": "http://marist.edu/faculty/ryanyoung"
    },
    {
      "fid": 11,
      "email": "jessica.watson@marist.edu",
      "schoolid": 103,
      "sname": "School of Liberal Arts",
      "ishidden": false,
      "prefname": "Jessica Watson",
      "url": "http://marist.edu/faculty/jessicawatson"
    },
    {
      "fid": 12,
      "email": "steven.fowler@marist.edu",
      "schoolid": 104,
      "sname": "School of Social and Behavioral Sciences",
      "ishidden": true,
      "prefname": "Steven Fowler",
      "url": "http://marist.edu/faculty/stevenfowler"
    },
    {
      "fid": 13,
      "email": "sandra.ross@marist.edu",
      "schoolid": 101,
      "sname": "School of Science",
      "ishidden": false,
      "prefname": "Sandra Ross",
      "url": "http://marist.edu/faculty/sandraross"
    },
    {
      "fid": 14,
      "email": "philip.holmes@marist.edu",
      "schoolid": 106,
      "sname": "School of Computer Science and Math",
      "ishidden": true,
      "prefname": "Philip Holmes",
      "url": "http://marist.edu/faculty/philipholmes"
    },
    {
      "fid": 15,
      "email": "nancy.burke@marist.edu",
      "schoolid": 104,
      "sname": "School of Social and Behavioral Sciences",
      "ishidden": false,
      "prefname": "Nancy Burke",
      "url": "http://marist.edu/faculty/nancyburke"
    },
    {
      "fid": 16,
      "email": "kevin.riley@marist.edu",
      "schoolid": 105,
      "sname": "School of Communication and the Arts",
      "ishidden": false,
      "prefname": "Kevin Riley",
      "url": "http://marist.edu/faculty/kevinriley"
    },
    {
      "fid": 17,
      "email": "patricia.smith@marist.edu",
      "schoolid": 101,
      "sname": "School of Science",
      "ishidden": true,
      "prefname": "Patricia Smith",
      "url": "http://marist.edu/faculty/patriciasmith"
    },
    {
      "fid": 18,
      "email": "shawn.evans@marist.edu",
      "schoolid": 106,
      "sname": "School of Computer Science and Math",
      "ishidden": true,
      "prefname": "Shawn Evans",
      "url": "http://marist.edu/faculty/shawnevans"
    },
    {
      "fid": 19,
      "email": "charles.woods@marist.edu",
      "schoolid": 102,
      "sname": "School of Business",
      "ishidden": false,
      "prefname": "Charles Woods",
      "url": "http://marist.edu/faculty/charleswoods"
    },
    {
      "fid": 20,
      "email": "karen.murphy@marist.edu",
      "schoolid": 103,
      "sname": "School of Liberal Arts",
      "ishidden": true,
      "prefname": "Karen Murphy",
      "url": "http://marist.edu/faculty/karenmurphy"
    }
  ];

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
