# Contributing to Balatro Clone

Thank you for your interest in contributing to this project!

## Development Workflow

This project is a monorepo managed with npm workspaces. All dependencies are installed at the root level.

### Installing Dependencies

To install all dependencies for all packages, run the following command from the project root:

```bash
npm install
```

### Building the Project

To build all packages, run the following command from the project root:

```bash
npm run build
```

This will execute the `build` script in each package's `package.json` file.

### Running Tests

To run all tests for all packages, run the following command from the project root:

```bash
npm test
```

This will execute the `test` script in each package's `package.json` file.

## Continuous Integration (CI)

This project uses GitHub Actions for Continuous Integration. The CI workflow is defined in `.github/workflows/ci.yml`.

The CI pipeline is triggered on every push and pull request to the `main` branch. It performs the following steps:
1.  Checks out the repository.
2.  Sets up Node.js 20.
3.  Installs all dependencies.
4.  Builds all packages.
5.  Runs all tests.

Please ensure that all tests are passing before submitting a pull request.