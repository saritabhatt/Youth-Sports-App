# CLAUDE.md — Youth Sports App

## Project Overview

Youth Sports App is a web application for managing youth sports leagues, teams, players, schedules, and related activities. This file provides guidance for AI assistants working on the codebase.

> **Status:** This project is in its initial setup phase. The repository has been initialized but application code has not yet been added. This document should be updated as the project structure evolves.

## Repository Structure

```
Youth-Sports-App/
├── .gitattributes        # Git line-ending normalization
└── CLAUDE.md             # This file — AI assistant guide
```

As the project grows, update this section to reflect the actual directory layout (e.g., `src/`, `public/`, `tests/`, `docs/`, config files).

## Getting Started

### Prerequisites

_To be defined._ Typical requirements for a web-based youth sports app may include:

- Node.js (LTS) or Python 3.x
- A package manager (npm, yarn, pnpm, or pip)
- A database (PostgreSQL, SQLite, MongoDB, etc.)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Youth-Sports-App

# Install dependencies (update once a package manager is chosen)
# npm install
# pip install -r requirements.txt
```

### Running the Application

```bash
# Start development server (update with actual command)
# npm run dev
# python manage.py runserver
```

### Running Tests

```bash
# Run test suite (update with actual command)
# npm test
# pytest
```

## Development Workflow

### Branching Strategy

- **main** — stable, production-ready code
- **Feature branches** — use the pattern `feature/<short-description>` or `claude/<description>-<id>` for AI-assisted work
- Create pull requests against `main` for all changes

### Commit Conventions

- Write clear, imperative-mood commit messages (e.g., "Add player registration form")
- Keep commits focused — one logical change per commit
- Reference issue numbers where applicable (e.g., "Fix #42: correct score calculation")

### Code Style

_To be configured._ Once linting and formatting tools are added (ESLint, Prettier, Black, Ruff, etc.), document the commands here:

```bash
# Lint
# npm run lint

# Format
# npm run format
```

## Key Conventions

### General Principles

1. **Keep it simple** — avoid over-engineering; build what is needed now
2. **Security first** — validate all user input; never expose secrets in code or commits
3. **Accessibility** — follow WCAG guidelines for UI components
4. **Testing** — write tests alongside new features; maintain test coverage

### File and Naming Conventions

- Use consistent casing (decide on camelCase, PascalCase, or snake_case per language)
- Group related files by feature or domain rather than by file type when possible
- Keep configuration files at the project root

### Environment Variables

- Use `.env` files for local configuration (never commit these)
- Document required variables in a `.env.example` file
- Access secrets only through environment variables, never hardcode them

## Architecture

_To be defined as the project takes shape._ Document the following when established:

- **Frontend framework** (React, Vue, Angular, etc.)
- **Backend framework** (Express, Django, FastAPI, etc.)
- **Database** and ORM/query layer
- **Authentication** strategy
- **API design** (REST, GraphQL, etc.)
- **State management** approach
- **Deployment** target and CI/CD pipeline

## Domain Concepts

The application revolves around these core entities:

| Entity     | Description                                      |
|------------|--------------------------------------------------|
| League     | An organized sports league with seasons           |
| Team       | A group of players competing together             |
| Player     | A youth athlete registered in the system          |
| Coach      | An adult responsible for a team                   |
| Game       | A scheduled match between two teams               |
| Season     | A time period during which a league operates      |
| Venue      | A location where games are played                 |
| Guardian   | A parent or guardian linked to a player            |

## AI Assistant Guidelines

When working on this codebase:

1. **Read before writing** — always read existing files before proposing changes
2. **Minimal changes** — only modify what is necessary to accomplish the task
3. **No guessing** — if the project structure or conventions are unclear, explore first
4. **Update this file** — when adding new frameworks, tools, or significant structure, update CLAUDE.md to reflect the current state
5. **Security awareness** — never commit `.env` files, API keys, or credentials
6. **Test your changes** — run the test suite before considering work complete
7. **Follow existing patterns** — match the style and conventions already in use in the codebase
