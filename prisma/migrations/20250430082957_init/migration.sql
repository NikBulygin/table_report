-- CreateTable
CREATE TABLE "Shop12" (
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
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Shop2" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numberVagonOrTank" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "perMetVklCert" REAL NOT NULL,
    "perTioCert" REAL NOT NULL,
    "perH2oCert" REAL NOT NULL,
    "H2OWeight" REAL NOT NULL,
    "DryWeight" REAL NOT NULL,
    "MetalTon" REAL NOT NULL,
    "MinusMetal" REAL NOT NULL,
    "standart80Tio2" REAL NOT NULL,
    "InvoiceDate" DATETIME NOT NULL,
    "InvoiceNumber" TEXT NOT NULL,
    "GtdDate" DATETIME NOT NULL,
    "GtdNumber" TEXT NOT NULL,
    "MiroDocument" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
