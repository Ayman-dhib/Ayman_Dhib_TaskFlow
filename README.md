<div align="center">

# ✅ TaskFlow

**Project and task management app built with Angular**

![Angular](https://img.shields.io/badge/Angular_22-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

</div>

## Overview

TaskFlow organizes projects, their tasks and the people working on them. I built it during my Angular course labs at ISIMS. It uses a feature-based Angular architecture with services, a project store, reusable components, custom pipes and directives, and a mock REST API powered by `json-server`.

## Features

- **Projects**: create, edit and browse projects in list or card view
- **Tasks**: task list per project, with **overdue** tasks highlighted automatically
- **Users**: team members and the projects they belong to
- **Favorites and recent projects**: quick access to what you use most
- **Notifications** for user actions
- **Light/dark theme**
- **Custom pipes**: deadline, initials, truncate
- **Custom directives**: highlight, overdue, tooltip

## Tech stack

| Layer | Technologies |
|---|---|
| Front-end | Angular 22, TypeScript, RxJS, Tailwind CSS 4 |
| Mock API | json-server (`db.json`) |
| Tests | Vitest |

## Getting started

```bash
npm install
npm run dev     # starts json-server (port 3000) and Angular (port 4200) together
```

Or run them separately: `npm run server`, then `npm start`. Run the tests with `npm test`.

## Project structure

```
src/app/
  core/services/      projects, users, favorites, recent projects, notifications, theme
  features/projects/  project list, card and form, task list and items, models, store
  features/users/     user list, user card, projects grouped by user
  shared/             empty state, view toggle, pipes, directives
```

---

Built by [Ayman Dhib](https://www.linkedin.com/in/ayman-dhib/)
