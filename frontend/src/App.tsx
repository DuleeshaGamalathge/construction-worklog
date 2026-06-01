import { useEffect, useState } from 'react'
import './App.css'
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


  return (
    <div>
      <h1>Work Entries</h1>

      <WorkEntryForm onSuccess={loadEntries} />

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
      />
    </div>
  );
}

export default App
