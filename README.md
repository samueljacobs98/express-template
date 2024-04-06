# Express Template

The goal of this project is to provide a simple and easy to use template for creating a server using Express.js.

## Approach

- **Maintainable**: The code is organized in a way that makes it easy to maintain.
- **Scalable**: The code is organized in a way that makes it easy to scale. New endpoints and versions can be added easily.
<!-- TODO: - **Testable**: The code is organized in a way that makes it easy to test.  -->

## Features

- **Configurable**: A simple config interface that can be extended easily and adding them to the `src/api/config/index.ts` file.
- **Logging**: A simple logging interface that can enable consistent application logging.
- **Error Handling**: A DomainError class that can be extended to create custom errors and a request wrapper that can be used to handle errors in a consistent way.
- **Request Validation**: A simple way to validate requests with `zod` schemas and a validator function.
- **Versioning**: A simple way to add new versions.
  <!-- TODO: - **API Documentation**: A simple way to add documentation to the API. -->
  <!-- TODO: - **Testing**: A simple way to test the API. -->
  <!-- TODO: - **API Monitoring**: A simple way to monitor the API. -->

<!-- TODO ## CLI Tool

A CLI companion tool is provided [here]() for creating new express APIs using this template.
The CLI tool includes many options to configure the API to your needs. See the [CLI documentation]() for more information. -->
