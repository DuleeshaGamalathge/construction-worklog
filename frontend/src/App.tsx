import { useEffect, useState } from 'react'
import './App.css'
import { getWorkEntries } from "./api/workEntryApi";
import WorkEntryForm from "./components/WorkEntryForm";

function App() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getWorkEntries()
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Work Entries</h1>

      <WorkEntryForm />

      {data.map((item, index) => (
        <div key={index}>
          {item.workType} - {item.volume}
        </div>
      ))}
    </div>
  );
}

export default App
