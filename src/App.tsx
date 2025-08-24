import './App.css'
import DataTable, {type Column} from "./components/dataTable";
import { useState } from "react";


interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const sampleData: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 28 },
];

const App = () => {
  const [selected, setSelected] = useState<User[]>([]);

  return (
    <div>
      <div className="p-6">
        <DataTable
          data={sampleData}
          columns={columns}
          selectable
          onRowSelect={setSelected}
        />
        {selected.length > 0 && (
          <div className="mt-4">
            <h2 className="font-semibold mb-2">Selected Users:</h2>
            <ul className="list-disc pl-5">
              {selected.map((user) => (
                <li key={user.id}>
                  {user.name} ({user.email}, Age: {user.age})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default App