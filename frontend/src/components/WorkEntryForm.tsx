import { useState, useEffect } from "react";
import { createWorkEntry, updateWorkEntry } from "../api/workEntryApi";
import { type WorkEntry } from "../types/WorkEntry";
import { WORK_TYPES, UNITS } from "../constants/workTypes";

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
            <h2 className="card-header">
                {editingEntry ? "Edit Work Entry" : "Add Work Entry"}
            </h2>

            {/* Date */}
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                required
            /><br />


            {/* Work Type */}
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


            {/* Volume */}
            <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Volume"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                required
            /> <br />


            {/* Unit */}
            <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                required
            >
                <option value="">
                    Select Unit
                </option>

                {UNITS.map((unit) => (
                    <option
                        key={unit}
                        value={unit}
                    >
                        {unit}
                    </option>
                ))}
            </select> <br />


            {/* Performer */}
            <input
                type="text"
                placeholder="Performer"
                value={performer}
                onChange={(e) => setPerformer(e.target.value)}
                minLength={3}
                required
            /> <br />

            <button type="submit" className="primary-btn">
                Save
            </button>
        </form>
    );
}