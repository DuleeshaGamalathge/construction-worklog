import { useEffect, useState } from 'react'
import './App.css'
import { getWorkEntries, deleteWorkEntry } from "./api/workEntryApi";
import WorkEntryForm from "./components/WorkEntryForm";
import { type WorkEntry } from "./types/WorkEntry";

function App() {
  const [entries, setEntries] = useState<WorkEntry[]>([]);

  const loadEntries = async () => {
    const data = await getWorkEntries();
    setEntries(data);
  };

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <div>
      <h1>Work Entries</h1>

      <WorkEntryForm onSuccess={loadEntries} />

      {entries.map((e) => (
        <div key={e.id}>
          {e.date} - {e.workType} - {e.volume} {e.unit} - {e.performer}

          <button
            onClick={async () => {
              if (!e.id) return;

              await deleteWorkEntry(e.id);
              loadEntries(); // refresh list
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App
