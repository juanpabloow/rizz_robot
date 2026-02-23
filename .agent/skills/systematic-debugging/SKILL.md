---
name: systematic-debugging
description: Provides a structured approach to identifying, isolating, and fixing software bugs. Use this when the project encounters errors, unexpected behavior, or failing tests.
---

# Systematic Debugging

This skill defines a rigorous process for resolving technical issues to ensure fixes are reliable and do not introduce regressions.

## When to use this skill
- Use this when a user reports a specific bug or error message.
- Use this when automated tests are failing without an obvious cause.
- Use this to investigate performance bottlenecks or unexpected system behavior.

## How to use it
Follow these steps to ensure a systematic resolution:

### Step 1: Reproduction
- **Observe the failure:** Clearly identify what the expected behavior was versus the actual result.
- **Create a reproduction case:** Develop the smallest possible script or test case that consistently triggers the bug.

### Step 2: Isolation
- **Identify the boundaries:** Determine which components or lines of code are involved in the failure.
- **Hypothesize:** Formulate a theory on why the bug is occurring based on logs, stack traces, and state observation.

### Step 3: Resolution
- **Implement the fix:** Apply the minimum change necessary to resolve the root cause.
- **Verify:** Run the reproduction case again to ensure the bug is gone.

### Step 4: Prevention
- **Regression Testing:** Add a permanent unit or integration test to prevent the bug from returning.
- **Cleanup:** Remove any temporary logging or print statements used during the investigation.

## Debugging Checklist
- [ ] Is there a minimal reproduction case?
- [ ] Have the logs and stack traces been fully analyzed?
- [ ] Does the fix address the root cause rather than just the symptom?
- [ ] Has a regression test been added to the test suite?