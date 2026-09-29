# User import spec

## Goal

Import users from a CSV into the users table.

## Trigger

An admin uploads a CSV file from the admin panel.

## Behavior

- The file is read and each row is inserted into the users table.
- Valid rows are imported.
- The admin sees a summary of how many rows were imported.

## Acceptance criteria

- A valid CSV imports successfully.
- The summary count matches the number of valid rows.

## Notes

- The CSV has columns: name, email, role.
- Large files should not time out.
