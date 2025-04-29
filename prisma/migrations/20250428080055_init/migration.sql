BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Shop2] (
    [id] INT NOT NULL IDENTITY(1,1),
    [numberVagonOrTank] NVARCHAR(1000) NOT NULL,
    [weight] FLOAT(53) NOT NULL,
    [perMetVklCert] FLOAT(53) NOT NULL,
    [perTioCert] FLOAT(53) NOT NULL,
    [perH2oCert] FLOAT(53) NOT NULL,
    [H2OWeight] FLOAT(53) NOT NULL,
    [DryWeight] FLOAT(53) NOT NULL,
    [MetalTon] FLOAT(53) NOT NULL,
    [MinusMetal] FLOAT(53) NOT NULL,
    [standart80Tio2] FLOAT(53) NOT NULL,
    [InvoiceNumber] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Shop2_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Shop2_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Shop2Invoice] (
    [MiroDocument] NVARCHAR(1000) NOT NULL,
    [InvoiceNumber] NVARCHAR(1000) NOT NULL,
    [InvoiceDate] DATETIME2 NOT NULL,
    [TotalWeight] FLOAT(53) NOT NULL,
    [GTDId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Shop2Invoice_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Shop2Invoice_pkey] PRIMARY KEY CLUSTERED ([InvoiceNumber])
);

-- CreateTable
CREATE TABLE [dbo].[Shop2GTD] (
    [id] INT NOT NULL IDENTITY(1,1),
    [GtdNumber] NVARCHAR(1000) NOT NULL,
    [GtdDate] DATETIME2 NOT NULL,
    CONSTRAINT [Shop2GTD_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Shop12] (
    [id] INT NOT NULL IDENTITY(1,1),
    [vagonNumber] NVARCHAR(1000) NOT NULL,
    [weight] FLOAT(53) NOT NULL,
    [tio2Analysis] FLOAT(53) NOT NULL,
    [h2oAnalysis] FLOAT(53) NOT NULL,
    [recalculatedWeight] FLOAT(53) NOT NULL,
    [InvoiceId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Shop12_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Shop12_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Shop12Invoice] (
    [id] INT NOT NULL IDENTITY(1,1),
    [MiroDocument] NVARCHAR(1000) NOT NULL,
    [InvoiceNumber] NVARCHAR(1000) NOT NULL,
    [InvoiceDate] DATETIME2 NOT NULL,
    [GTDId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Shop12Invoice_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Shop12Invoice_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Shop12GTD] (
    [id] INT NOT NULL IDENTITY(1,1),
    [GtdNumber] NVARCHAR(1000) NOT NULL,
    [GtdDate] DATETIME2 NOT NULL,
    CONSTRAINT [Shop12GTD_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Shop2] ADD CONSTRAINT [Shop2_InvoiceNumber_fkey] FOREIGN KEY ([InvoiceNumber]) REFERENCES [dbo].[Shop2Invoice]([InvoiceNumber]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Shop2Invoice] ADD CONSTRAINT [Shop2Invoice_GTDId_fkey] FOREIGN KEY ([GTDId]) REFERENCES [dbo].[Shop2GTD]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Shop12] ADD CONSTRAINT [Shop12_InvoiceId_fkey] FOREIGN KEY ([InvoiceId]) REFERENCES [dbo].[Shop12Invoice]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Shop12Invoice] ADD CONSTRAINT [Shop12Invoice_GTDId_fkey] FOREIGN KEY ([GTDId]) REFERENCES [dbo].[Shop12GTD]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
