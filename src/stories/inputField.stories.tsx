import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import InputField, { type InputFieldProps } from "../components/inputField";

const meta: Meta<InputFieldProps> = {
  title: "Components/InputField",
  component: InputField,
  argTypes: {
    variant: {
      control: "radio",
      options: ["filled", "outlined", "ghost"],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    type: {
      control: "radio",
      options: ["text", "password"],
    },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    loading: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<InputFieldProps>;


export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    helperText: "We'll never share your email.",
    variant: "outlined",
    size: "md",
  },
};


export const Invalid: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    errorMessage: "Invalid email address",
    invalid: true,
    variant: "outlined",
  },
};


export const Disabled: Story = {
  args: {
    label: "Username",
    placeholder: "Disabled input",
    disabled: true,
    variant: "filled",
  },
};

export const Loading: Story = {
  args: {
    label: "Search",
    placeholder: "Loading...",
    loading: true,
    variant: "ghost",
    disabled: true,
  },
};

export const Password: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <InputField
        {...args}
        type="password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    label: "Password",
    placeholder: "Enter your password",
    variant: "outlined",
    size: "md",
  },
};
