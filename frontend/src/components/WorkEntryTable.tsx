import { type WorkEntry } from "../types/WorkEntry";

interface Props {
  entries: WorkEntry[];
  onDelete: (id: number) => void;

  from: string;
  to: string;
  setFrom: (value: string) => void;
  setTo: (value: string) => void;

  onFilter: () => void;
  onClear: () => void;
}

export default function WorkEntryTable({
  entries,
  onDelete,
  from,
  to,
  setFrom,
  setTo,
  onFilter,
  onClear
}: Props) {
  return (
    <div>
        {/* Filter */}
        <div style={{ marginBottom: "20px" }}>
            <h3>Filter by Date</h3>

            <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
            />

            <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
            />

            <button onClick={onFilter}>Filter</button>

            <button onClick={onClear}>Clear</button>
        </div>

        {/* Entries Tabel */}
        <table>
        <thead>
            <tr>
            <th>Date</th>
            <th>Work Type</th>
            <th>Volume</th>
            <th>Unit</th>
            <th>Performer</th>
            <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            {entries.map((entry) => (
            <tr key={entry.id}>
                <td>{entry.date}</td>
                <td>{entry.workType}</td>
                <td>{entry.volume}</td>
                <td>{entry.unit}</td>
                <td>{entry.performer}</td>

                <td>
                <button
                    onClick={() => {
                    if (entry.id) {
                        onDelete(entry.id);
                    }
                    }}
                >
                    Delete
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
}
