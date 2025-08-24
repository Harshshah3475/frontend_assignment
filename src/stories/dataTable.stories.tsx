import type { Meta, StoryObj } from "@storybook/react";
import DataTable, {type Column} from "../components/dataTable";

// Example data type
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Example columns
const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

// Example data
const sampleData: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 28 },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
  argTypes: {
    loading: { control: "boolean" },
    selectable: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof DataTable<User>>;

// ✅ Default Table
export const Default: Story = {
  args: {
    data: sampleData,
    columns: columns,
  },
};

// ✅ With Row Selection
export const Selectable: Story = {
  args: {
    data: sampleData,
    columns: columns,
    selectable: true,
  },
};

// ✅ Loading State
export const Loading: Story = {
  args: {
    data: [],
    columns: columns,
    loading: true,
  },
};

// ✅ Empty State
export const Empty: Story = {
  args: {
    data: [],
    columns: columns,
  },
};
