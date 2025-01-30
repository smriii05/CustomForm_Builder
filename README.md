
<h1>Drag and Drop Form Builder</h1>

<h2>Setup Instructions</h2>

- Clone the repository:
```
git clone https://github.com/smriii05/Vrit_Task_C.git
```
- Run the following command to initialize the project:
```
mkdir form-builder && cd form-builder && npm create vite@latest . -- --template react-ts
```
- Install node modules and dependencies by running the following command:
```
npm install
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities lucide-react zod
npm install -D @testing-library/react @testing-library/user-event vitest jsdom
```
- Run the project using:

```
npm run dev
```

<h2>Technologies Used</h2>

- React
- TypeScript
- @dnd-kit/core
- @dnd-kit/sortable
- @dnd-kit/utilities
- Tailwind css
- Zod

<h2>Rationale</h2>

- TypeScript was used to enhance code quality, maintainability, and scalability.
- @dnd-kit/utilities package provides helper functions and abstractions to simplify common tasks in drag-and-drop interactions, such as collision detection and measuring item placement. 
- @dnd-kit/core library was used for implementing drag-and-drop functionality.
- @dnd-kit/sortable library extends @dnd-kit/core by providing utilities for sorting draggable items. This was used to enable users to rearrange form components easily, ensuring a smooth and user-friendly experience.
- Tailwind CSS was selected for styling the form builder due to its utility-first approach and flexibility. It eliminates the need for writing extensive custom CSS by providing pre-built classes that can be directly applied to elements. 
- Zod was used for form validation, offering a robust and declarative way to define and validate schemas. It ensures that user input adheres to defined constraints, making the form builder reliable and error-free.

<h2>Known limitations</h2>

- Cannot edit the form components.
- Cannot submit the form and implement response visualization.
- Unit Testing for form logic failed.

<h2>Future Improvements</h2>

- Enable editing for form components.
- Perform testing successfully.
- Implement form response visualization.
- Add form conditional logic.
- Add undo/redo functionality.

<h2>Live Demo: </h2>
https://smriii05.github.io/CustomForm_Builder/

<h2>Demo:</h2>

https://github.com/user-attachments/assets/e73f1d0c-bc9a-4833-b4f7-48a253581b95



