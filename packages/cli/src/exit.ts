function exit(message: string, exitCode: number = 1): void {
	process.stdout.write(message + "\n");
	process.exit(0);
}

export { exit }