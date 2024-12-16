## ELECTION CAPPING 24

# Manual Database Update Guide

**This guide provides steps to manually update faculty information in the database, such as name changes due to marriage or other profile updates.**

---

## Table of Contents

1. [Overview](#overview)
2. [Database Access](#database-access)
3. [Backup the Database](#backup-the-database)
4. [Update Process](#update-process)
5. [Verification](#verification)
6. [Additional Notes](#additional-notes)
7. [Use Case Examples](#use-case-example:-last-name-change)
   (#use-case-example:-updating-faculty-table)

---

## Overview

Faculty members log in using their Marist school email, which serves as a primary key. While most updates are automated through the platform, manual updates may be required for cases like:

- Last name changes (e.g., due to marriage).
- Updating department or role information.
- Correcting typos in profile data.

This guide ensures manual updates are executed safely and accurately.

---

## Database Access

To access the database, you will need the following:

1. **PostgreSQL client** installed on your system.
2. **Database credentials**  For userid/password access to any existing instance, contact the Joint Study IT students via Algozzine. For creating your own access, follow a simple password construct you won't forget, notify Algozzine of what that password is, and do NOT document it in your github repo documention

### Connect to the Database:

Run the following command in your terminal:

```bash
psql -h <ip_address> -U <username> -d election_capping
```

---

### Backup the Database

- Before making any changes make sure you create a backup to avoid any accidental data loss: pg_dump -h <ip_address> -U <username> -d election_capping -f backup.sql

### Update Process

**1.Query User Current Info**

- To view the current profile information, use the following SQL query:

```bash
SELECT * FROM people WHERE email = 'faculty_email@marist.edu';
```

**2.Update Fields**

- To update, for example, last name do:

```bash
UPDATE people
SET lname = 'NewLastName'
WHERE email = 'faculty_email@marist.edu';
```

- To update other information (e.g., department or preferred name):

```bash
UPDATE faculty
SET prefname = 'NewPreferredName', schoolid = 2
WHERE fid = (
    SELECT pid FROM people WHERE email = 'faculty_email@marist.edu'
);
```

**3.Commit Changes**

- PostgreSQL automatically commits changes, but if using a transaction block, use:

```bash
COMMIT;
```

---

### Verification

- After updating, verify the changes by re-querying the database:

```bash
SELECT * FROM people WHERE email = 'faculty_email@marist.edu';
```

- Check if the updated information appears correctly. Ensure there are no discrepancies in dependent tables

---

### Additional notes

- **Consistency**: Ensure updates are consistent across all related tables, such as people, faculty, and committeeassignments.
- **Primary Key (Email)**: Since the email is a primary key, it must not change. If it needs to be updated, contact Marist IT for assistance.
- **Audit Log**: Keep a record of changes made for auditing purposes. Example:

```bash
echo "Updated lname for faculty_email@marist.edu to NewLastName on $(date)" >> change_log.txt
```

- **Testing Environment**: Test updates in a staging environment before applying them to production.

---

### Use Case Example: Last Name Change

- If a faculty member get married or wants their name changed here are some steps to follow:

**Step 1**: Query the current information

```bash
SELECT * FROM people WHERE email = 'jane.doe@marist.edu';
```

**Step 2**: Update the last name

```bash
UPDATE people
SET lname = 'Smith'
WHERE email = 'jane.doe@marist.edu';
```

**Step 3**: Update the email

```bash
UPDATE people
SET lname = 'Smith'
WHERE email = 'jane.doe@marist.edu';
```

**Step 4**: Verify Update

- Re-query the database to ensure the changes were successful:

```bash
SELECT * FROM people WHERE email = 'jane.smith@marist.edu';
```

### Use Case Example: Updating faculty table (using FID)

This guide outlines the steps to update records in the database for the `people` and `faculty` tables.

- Use the **`PID`** to update records in the `people` table.
- Use the **`FID`** to update records in the `faculty` table.

---

## Updating the `people` Table (Using `PID`)

### Steps to Update Information

1. **Query the Current Record**  
   To confirm the data for a specific `PID`:
   ```sql
   SELECT * FROM people WHERE pid = 101;
   ```
2. **Update the record**
   Use the UPDATE statement with the WHERE pid = ... clause.

- **Example: Changing Last Name**
  Suppose John Doe's last name changes to Smith due to marriage:
  ```sql
  UPDATE people
  SET lname = 'Smith'
  WHERE pid = 101;
  ```

3. **Verify Changes**
   Run the query again to confirm the update:

```sql
SELECT * FROM people WHERE pid = 101;
```

**Example Output:**

```sql
pid | fname  | lname  | email
----+--------+--------+-------------------
 101 | John   | Smith  | john.smith@marist.edu
```

---

## Updating the `faculty` Table (Using `FID`)

### Steps to Update Information

1. **Query the Current Record**  
   To confirm the data for a specific `FID`:
   ```sql
   SELECT * FROM faculty WHERE fid = 201;
   ```

- **Example Output:**

```sql
fid  | department       | role
-----+------------------+-----------
 201 | Computer Science | Chair
```

2. **Update the Record**
   Use the UPDATE statement with the WHERE fid = ... clause.

- **Example: Changing Department**
  If the faculty member's department changes:

```sql
UPDATE faculty
SET department = 'Mathematics'
WHERE fid = 201;
```

- **Example: Changing Role**
  If the faculty member steps down as Chair:

```sql
UPDATE faculty
SET role = 'Professor'
WHERE fid = 201;
```

3. **Verify Changes**
   Run the query again to confirm the update:

```sql
SELECT * FROM faculty WHERE fid = 201;
```

**Example Output**

```sql
fid  | department   | role
-----+--------------+-----------
 201 | Mathematics  | Professor
```
