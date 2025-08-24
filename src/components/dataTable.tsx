import React, { useState } from "react";
import { FcGenericSortingAsc } from "react-icons/fc";
import { FcGenericSortingDesc } from "react-icons/fc";

export interface Column<T> {
    key: string;
    title: string;
    dataIndex: keyof T;
    sortable?: boolean;
}

export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    loading?: boolean;
    selectable?: boolean;
    onRowSelect?: (selectedRows: T[]) => void;
}

function DataTable<T extends { id: string | number }>({
    data,
    columns,
    loading = false,
    selectable = false,
    onRowSelect,
}: DataTableProps<T>) {
    const [sortConfig, setSortConfig] = useState<{
        key: keyof T;
        direction: "asc" | "desc";
    } | null>(null);

    const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
        new Set()
    );

    // Sorting logic
    const sortedData = React.useMemo(() => {
        if (!sortConfig) return data;
        return [...data].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];
            if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig]);

    // Handle sorting toggle
    const handleSort = (key: keyof T) => {
        setSortConfig((prev) =>
            prev && prev.key === key
                ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
                : { key, direction: "asc" }
        );
    };

    // Handle row selection
    const handleSelect = (id: string | number) => {
        const newSelection = new Set(selectedRows);
        if (newSelection.has(id)) {
            newSelection.delete(id);
        } else {
            newSelection.add(id);
        }
        setSelectedRows(newSelection);
        onRowSelect && onRowSelect(data.filter((row) => newSelection.has(row.id)));
    };

    return (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
            {loading ? (
                <div className="flex justify-center items-center py-6">
                    <span className="animate-spin border-4 border-gray-400 border-t-transparent rounded-full w-8 h-8"></span>
                </div>
            ) : data.length === 0 ? (
                <div className="text-center text-gray-500 py-6">No data available</div>
            ) : (
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="bg-gray-100">
                            {selectable && <th className="p-3"></th>}
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className="p-3 cursor-pointer"
                                    onClick={() => col.sortable && handleSort(col.dataIndex)}
                                >
                                    <div className="flex items-center gap-1">
                                        {col.title}
                                        {col.sortable && sortConfig?.key === col.dataIndex && (
                                            <span>
                                                {sortConfig.direction === "asc" ? <FcGenericSortingAsc/> : <FcGenericSortingDesc/>}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((row) => (
                            <tr
                                key={row.id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                {selectable && (
                                    <td className="p-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.has(row.id)}
                                            onChange={() => handleSelect(row.id)}
                                        />
                                    </td>
                                )}
                                {columns.map((col) => (
                                    <td key={col.key} className="p-3">
                                        {String(row[col.dataIndex])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default DataTable;
