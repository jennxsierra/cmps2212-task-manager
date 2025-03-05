# Task Manager App

This project is a Task Manager web application that demonstrates server-side rendering using Node.js, Express, and EJS, along with custom CSS styling that mimics a retro Windows98 aesthetic. Watch [this demo video on YouTube](https://youtu.be/5CqyP1htr5g) to see the app in action.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
  - [Adding Tasks](#1-adding-tasks)
  - [Toggling Task Completion](#2-toggling-task-completion)
  - [Deleting Tasks](#3-deleting-tasks)
  - [Searching Tasks](#4-searching-tasks)
  - [Filtering Tasks](#5-filtering-tasks)
  - [Sorting Tasks](#6-sorting-tasks)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- **View Tasks:** Display a list of tasks stored in memory.
- **Add Task:** Create new tasks with a title, description, and priority.
- **Toggle Task Completion:** Mark tasks as complete or reopen them.
- **Delete Task:** Remove tasks from the list.
- **Search Tasks:** Filter tasks by title or description.
- **Filter Tasks:** Filter by task status (All, Completed, Incomplete).
- **Sort Tasks:** Sort tasks by priority (Low to High, High to Low) with an option to clear the sorting and revert to the default order.

## Installation

> [!NOTE]
> You will need to have [Node.js](https://nodejs.org/en/) (version 14 or later is recommended) and [npm](https://www.npmjs.com/) (comes with Node.js) installed on your machine.

### Steps

1. **Clone the Repository**

   ```markdown
   bash
   git clone https://github.com/yourusername/task-manager-app.git
   cd task-manager-app
   ```

2. **Install Dependencies**

   ```markdown
   bash
   npm install
   ```

3. **Run the Application**

   Start the app using one of these commands:

   ```markdown
   bash
   npm start
   ```

   or

   ```markdown
   bash
   node app.js
   ```

4. **Access the App**

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```markdown
.
├── app.js # Main entry point for the application
├── LICENSE
├── package.json
├── package-lock.json
├── public # Static assets (images, stylesheets, scripts)
│   └── styles.css # Custom CSS for styling the app
├── README.md
├── routes # Route handlers for the application
│   └── tasks.js # Task-related routes
└── views # EJS templates for rendering the UI
├── error.ejs # Error page
└── index.ejs # Main page for the Task Manager app
```

## Usage

### 1. Adding Tasks

- Fill in the **Add New Task** form by providing a title.
- Select a priority (`Low`, `Medium`, or `High`). The default is `Low`.
- Optionally, enter a description.
- Click `Add Task` to create the new task.

### 2. Toggling Task Completion

- Each task displays a `Complete` button (or `Reopen` if already completed).
- Clicking this button toggles the task's completion status.

### 3. Deleting Tasks

- Click the `Delete` button next to a task to remove it from the list.

### 4. Searching Tasks

- Use the search bar at the top of the task list.
- Enter keywords to search tasks by title or description.
- Click `Search` to update the list.

### 5. Filtering Tasks

- Under the search bar, the filter options (`All`, `Completed`, `Incomplete`) appear on the left.
- Choose the desired filter option and click `Apply Filter`.
- Hidden inputs preserve the search query and current sort state when filtering.

### 6. Sorting Tasks

- On the right side of the filter/sort container, use the sort dropdown to select a sort order:
  - `Low to High`: Sorts tasks by priority from low to high.
  - `High to Low`: Sorts tasks by priority from high to low.
- Click `Sort` to apply the selected sort.
- Click `Clear Sort` to remove the sorting and revert to the default order (sorted by task ID).

> [!TIP]
> You can combine search, filter, and sort functionalities in a single request:
>
> - Enter a keyword in the search bar.
> - Choose a task status (`All`, `Completed`, `Incomplete`).
> - Select a priority order.
> - Click the respective buttons in each form, and hidden inputs ensure that your search query, filter, and sort values are preserved across requests.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- This project was developed as part of an assignment for the **[CMPS2212] GUI Programming** course under the Associate of Information Technology program at the [University of Belize](https://www.ub.edu.bz/).
- Shout out to [The Monospace Web](https://owickstrom.github.io/the-monospace-web/) for inspiring the aesthetic of the application.
- Special thanks to Mr. Dalwin Lewis for his guidance and support.
