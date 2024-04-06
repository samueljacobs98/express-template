export class Logger {
  fileName: string;

  private constructor(fileName: string) {
    this.fileName = fileName;
  }

  /**
   * Create a new Logger instance.
   * @param fileName The name of the file to log to.
   * @returns A new Logger instance.
   */
  static new(fileName: string): Logger {
    return new Logger(fileName);
  }

  /**
   * Prefix a function with the fileName.
   * @param functionName The name of the function.
   * @returns The function name prefixed with the fileName.
   */
  private prefix(functionName: string): string {
    return `[${this.fileName}][${functionName}]`;
  }

  /**
   * Log an error with a function name.
   * @param functionName The name of the function.
   * @param args The arguments to log.
   */
  log(functionName: string, ...args: any[]): void {
    console.log(this.prefix(functionName), ...args);
  }

  /**
   * Log an error with a function name.
   * @param functionName The name of the function.
   * @param args The arguments to log.
   */
  error(functionName: string, ...args: any[]): void {
    console.error(this.prefix(functionName), ...args);
  }
}
