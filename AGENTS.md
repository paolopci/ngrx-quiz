# Repository Guidelines

## Project Structure & Module Organization

This repository is an Angular 19 application named `ngrx-quiz`. Application code lives in `src/app`, with UI components under `src/app/components`, shared state under `src/app/store`, data fixtures under `src/app/data`, models under `src/app/models`, pipes under `src/app/pipes`, services under `src/app/services`, and SCSS partials under `src/app/styles`. Global styles are in `src/styles.scss`; static assets are served from `public`.

Keep feature files grouped by concern, using the existing Angular naming pattern: `toolbar.component.ts`, `toolbar.component.html`, `toolbar.component.scss`, `quiz.store.ts`, and `question.model.ts`.

## Build, Test, and Development Commands

- `npm start`: runs the Angular development server with the default development configuration.
- `npm run build`: creates a production build in `dist/ngrx-quiz`.
- `npm run watch`: rebuilds continuously using the development configuration.
- `npm test`: runs Karma/Jasmine unit tests through Angular CLI.
- `npm run ng -- <command>`: runs Angular CLI commands through the local project version.

## Coding Style & Naming Conventions

Use TypeScript strict mode and Angular strict templates; avoid `any` unless there is a clear boundary reason. Follow `.editorconfig`: UTF-8, two-space indentation, final newline, and trimmed trailing whitespace. TypeScript uses single quotes.

Use kebab-case for file names, PascalCase for classes and interfaces, camelCase for variables/functions, and descriptive names for signals, stores, and services. Prefer standalone, typed Angular APIs and keep RxJS subscriptions lifecycle-safe.

## Testing Guidelines

Use Jasmine/Karma for unit tests. Place specs beside the implementation as `*.spec.ts`, for example `color-name.pipe.spec.ts` or `quiz.store.spec.ts`. Cover state transitions, services, pipes, and component template behavior when changing user-visible quiz flow.

Before submitting changes, run `npm test` for behavior changes and `npm run build` for template/type checking.

## Commit & Pull Request Guidelines

No Git history is available in this workspace, so use concise imperative commit messages such as `Add quiz store state` or `Fix color naming pipe`.

Pull requests should include a short summary, affected areas, test results, and screenshots or recordings for UI changes. Link related issues when available and call out any breaking changes, dependency updates, or configuration changes.

## Security & Configuration Tips

Do not commit generated folders such as `node_modules`, `.angular`, or `dist`. Keep secrets out of source files and prefer environment-specific configuration for deploy-time values.
