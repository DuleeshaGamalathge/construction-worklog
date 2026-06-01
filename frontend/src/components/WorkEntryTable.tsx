import { type WorkEntry } from "../types/WorkEntry";

interface Props {
  entries: WorkEntry[];
  onDelete: (id: number) => void;
}

export default function WorkEntryTable({
  entries,
  onDelete,
}: Props) {
  return (
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
  );
}