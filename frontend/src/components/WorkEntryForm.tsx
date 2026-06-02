import { useState, useEffect } from "react";
import { createWorkEntry, updateWorkEntry } from "../api/workEntryApi";
import { type WorkEntry } from "../types/WorkEntry";
import { WORK_TYPES } from "../constants/workTypes";

interface Props{
    onSuccess: () => void;
    editingEntry: WorkEntry | null;
    setEditingEntry: (value: WorkEntry | null) => void;
}

export default function WorkEntryForm({
    onSuccess,
    editingEntry,
    setEditingEntry
  }: Props) {
    const [date, setDate] = useState("");
    const [workType, setWorkType] = useState("");
    const [volume, setVolume] = useState("");
    const [unit, setUnit] = useState("");
    const [performer, setPerformer] = useState("");

    useEffect(() => {
        if (editingEntry) {
            setDate(editingEntry.date.split("T")[0]);          
            setWorkType(editingEntry.workType);
            setVolume(editingEntry.volume.toString());
            setUnit(editingEntry.unit);
            setPerformer(editingEntry.performer);
        }
    }, [editingEntry]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            date,
            workType,
            volume: Number(volume),
            unit,
            performer
        };

        if (editingEntry) {
            await updateWorkEntry(editingEntry.id!, payload);
            setEditingEntry(null); // exit edit mode
        } else {
            await createWorkEntry(payload);
        }

        onSuccess(); // refresh list

        alert("Entry added successfully");

        setDate("");
        setWorkType("");
        setVolume("");
        setUnit("");
        setPerformer("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Work Entry</h2>

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            /><br />
            <select
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                required
            >
                <option value="">
                    Select Work Type
                </option>

                {WORK_TYPES.map((type) => (
                    <option
                        key={type}
                        value={type}
                    >
                        {type}
                    </option>
                ))}
            </select> <br/>

            <input
                type="number"
                placeholder="Volume"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                required
            /> <br />

            <input
                type="text"
                placeholder="Unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                required
            /> <br />

            <input
                type="text"
                placeholder="Performer"
                value={performer}
                onChange={(e) => setPerformer(e.target.value)}
                required
            /> <br />

            <button type="submit">
                Save
            </button>
        </form>
    );
}