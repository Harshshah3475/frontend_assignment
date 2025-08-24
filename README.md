
# React Component Development Assignment 

**Focus Area**: UI Components 

**Tech Stack: React** · TypeScript · TailwindCSS · Storybook

**Demo Video**: https://drive.google.com/file/d/1E61W4M9tiCfwz-M8Bmdt9_ymWlvNTy7d/view?usp=sharing 


## SETUP
- Clone the project
- install node modules
```
npm install
```
- Start Dev server and Storybook server
```
npm run dev 
npm run Storybook
````
- Dev server will start at port 5173 and Storybook server at port 6006 (Default ports)

## Approach to tackle problem statements
- Broke down the components in two parts (Input field and Data Table)
- Identified the props needed, ensure both components are type safe and useable at scale.
### 1. Input field
- Designed with variants (`filled`, `outlined`, `ghost`) and sizes (`sm`,` md`, `lg`)
- Implemented states: `disabled`, `invalid`, `loading`.
- Added optional features: `clear button`, `password toggle`.
- Used TailwindCSS utility classes for styling and responsiveness.
- Kept it accessible with proper labels, error messages, and focus styles.
### 1. Data Table
- Built as a generic component using TypeScript generics (`T[]`) to support any data type.
- Added sorting for sortable columns.
- Supported row selection with checkboxes (`selectable prop`).
- Implemented loading state (`spinner`) and empty state (`No data available`).
- Styled with Tailwind for clean and responsive design.