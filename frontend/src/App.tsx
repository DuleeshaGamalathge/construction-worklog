import { useEffect, useState } from 'react'
// import './App.css'
import './styles/app.css'
import { getWorkEntries, deleteWorkEntry } from "./api/workEntryApi";
import WorkEntryForm from "./components/WorkEntryForm";
import WorkEntryTable from "./components/WorkEntryTable";
import { type WorkEntry } from "./types/WorkEntry";

function App() {
  const [entries, setEntries] = useState<WorkEntry[]>([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const loadEntries = async (fromDate?: string, toDate?: string) => {
    const data = await getWorkEntries(fromDate, toDate);
    setEntries(data);
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteWorkEntry(id);
    loadEntries();
  };

  const [editingEntry, setEditingEntry] = useState<WorkEntry | null>(null);
  const handleEdit = (entry: WorkEntry) => {
    setEditingEntry(entry);
  };

  return (
    <div className='app-container'>
      <h1 className="page-title">
        CONSTRUCTION SITE WORK LOG
      </h1>

      <div className="layout-container">

        <div className="card form-card">
          <WorkEntryForm 
            onSuccess={loadEntries}
            editingEntry={editingEntry}
            setEditingEntry={setEditingEntry}
          />
        </div>

        <div className="card table-card">
          <WorkEntryTable
            entries={entries}
            onDelete={handleDelete}
            from={from}
            to={to}
            setFrom={setFrom}
            setTo={setTo}
            onFilter={() => loadEntries(from, to)}
            onClear={() => {
              setFrom("");
              setTo("");
              loadEntries();
            }}
            onEdit={handleEdit}
          />
        </div>

      </div>

    </div>
  );
}

export default App
