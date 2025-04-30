-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shop12" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vagonNumber" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "tio2Analysis" REAL NOT NULL,
    "h2oAnalysis" REAL NOT NULL,
    "recalculatedWeight" REAL NOT NULL,
    "InvoiceDate" DATETIME NOT NULL,
    "InvoiceNumber" TEXT NOT NULL,
    "GtdDate" DATETIME NOT NULL,
    "GtdNumber" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Shop12" ("GtdDate", "GtdNumber", "InvoiceDate", "InvoiceNumber", "createdAt", "h2oAnalysis", "id", "recalculatedWeight", "tio2Analysis", "updatedAt", "vagonNumber", "weight") SELECT "GtdDate", "GtdNumber", "InvoiceDate", "InvoiceNumber", "createdAt", "h2oAnalysis", "id", "recalculatedWeight", "tio2Analysis", "updatedAt", "vagonNumber", "weight" FROM "Shop12";
DROP TABLE "Shop12";
ALTER TABLE "new_Shop12" RENAME TO "Shop12";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
