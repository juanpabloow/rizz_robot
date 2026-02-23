---
name: project-cleanup
description: Cleans project files and maintains workspace order by identifying and removing unnecessary files, temporary directories, or artifacts from finished processes. Use this to organize the environment after a task or build.
---

# Project Cleanup and Maintenance

This skill provides a systematic approach to keeping the workspace clean and organized.

## When to use this skill
- Use this after finishing a specific process (like a build, test run, or deployment) that leaves behind temporary artifacts.
- Use this when the project root or subdirectories contain "clutter" such as `.log` files, `.tmp` files, or abandoned experiment folders.
- Use this to ensure the project structure adheres to standard conventions and remains easy to navigate.

## How to use it

### Step 1: Audit the Workspace
Scan the current directory and subdirectories for common unnecessary files:
- **Build Artifacts**: Folders like `dist/`, `build/`, `out/`, or `target/` that are no longer needed.
- **Temporary Files**: Files with extensions like `.tmp`, `.bak`, `.log`, or `.swp`.
- **Process Leftovers**: Directories created for specific, now-finished tasks (e.g., `temp-migration-data/`).
- **Dependency Cache**: Unused or corrupted cache folders if applicable.

### Step 2: Verify Process Completion
Before removal, confirm that:
1. The process that created the files is no longer running.
2. The files are not tracked by version control (unless they are explicitly meant to be ignored and removed).
3. The files are not required for the current project state or upcoming tasks.

### Step 3: Execution
- List the identified files and directories to the user for confirmation if the risk of deleting important data is high.
- Use the appropriate system commands to remove files and empty directories.
- If a cleanup script exists in the `scripts/` folder of this skill, run it using `--help` first to understand its parameters before execution.

## Maintenance Checklist
- [ ] Remove all `.log` files from the root.
- [ ] Delete finished process directories.
- [ ] Clear out temporary build artifacts.
- [ ] Ensure the file structure matches the project's intended organization.