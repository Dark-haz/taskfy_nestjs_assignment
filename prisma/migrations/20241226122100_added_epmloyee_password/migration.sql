/*
  Warnings:

  - The primary key for the `Availability` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `availability_id` on the `Availability` table. All the data in the column will be lost.
  - The primary key for the `Employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `employee_id` on the `Employee` table. All the data in the column will be lost.
  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `project_id` on the `Project` table. All the data in the column will be lost.
  - The primary key for the `WorkLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `worklog_id` on the `WorkLog` table. All the data in the column will be lost.
  - Added the required column `id` to the `Availability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `employee_id` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `id` to the `WorkLog` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Availability" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employee_id" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "start_time" DATETIME NOT NULL,
    "end_time" DATETIME NOT NULL,
    CONSTRAINT "Availability_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Availability" ("date", "employee_id", "end_time", "start_time") SELECT "date", "employee_id", "end_time", "start_time" FROM "Availability";
DROP TABLE "Availability";
ALTER TABLE "new_Availability" RENAME TO "Availability";
CREATE TABLE "new_Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);
INSERT INTO "new_Employee" ("email", "name", "role") SELECT "email", "name", "role" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "allocated_hours" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Project_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("allocated_hours", "description", "employee_id", "name", "status") SELECT "allocated_hours", "description", "employee_id", "name", "status" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE TABLE "new_WorkLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employee_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "hours_logged" REAL NOT NULL,
    "log_date" DATETIME NOT NULL,
    CONSTRAINT "WorkLog_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WorkLog_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WorkLog" ("employee_id", "hours_logged", "log_date", "project_id") SELECT "employee_id", "hours_logged", "log_date", "project_id" FROM "WorkLog";
DROP TABLE "WorkLog";
ALTER TABLE "new_WorkLog" RENAME TO "WorkLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
