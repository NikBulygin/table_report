import { prisma } from '~/server/utils/prisma'
import type { Shop2 } from '@prisma/client'
import { mapGamepadToXbox360Controller } from '@vueuse/core'
import { h } from 'vue'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  console.log('body', body)

  const { edited = [], new: newRows = [] } = body

  console.log('edited', edited)
  console.log('newRows', newRows)
  const allRows = [
    ...(Array.isArray(edited) ? edited : [edited]),
    ...(Array.isArray(newRows) ? newRows : [newRows])
  ]

  console.log('allRows', allRows)

  const result = await prisma.$transaction(async tx => {
    try {
      const createdRecords: Shop2[] = []

      for (const row of allRows) {
        if (!row.invoiceNumber) {
          continue
        }
        console.log('row', row)
        const invoice = await tx.shop2Invoice.upsert({
          where: {
            InvoiceNumber: row.invoiceNumber
          },
          create: {
            InvoiceNumber: row.invoiceNumber,
            InvoiceDate: new Date(row.invoiceDate),
            MiroDocument: row.dockumentNumberMiro,
            GtdNumber: row.gtdNumber,
            TotalWeight: 0
          },
          update: {}
        })

        const gtd = await tx.shop2GTD.upsert({
          where: {
            GtdNumber: row.gtdNumber
          },
          create: {
            GtdNumber: row.gtdNumber,
            GtdDate: new Date(row.gtdDate)
          },
          update: {}
        })

        const weight = row.weight || 0
        const H2OWeight = (weight * row.perH2oCert) / 100

        const dryWeight = weight - H2OWeight
        const metalTon = (dryWeight * row.perMetVklCert) / 100
        const minusMetalTon = dryWeight - metalTon
        const standart80Tio2 = minusMetalTon * row.perTioCert * 0.8

        const shop2Record = await tx.shop2.upsert({
          where: {
            id: row.id || -1
          },
          create: {
            numberVagonOrTank: row.numberVagonOrTank,
            weight: row.weight,
            perMetVklCert: row.perMetVklCert,
            perTioCert: row.perTioCert,
            perH2oCert: row.perH2oCert,
            H2OWeight: H2OWeight,
            DryWeight: dryWeight,
            MetalTon: metalTon,
            MinusMetal: minusMetalTon,
            standart80Tio2: standart80Tio2,
            InvoiceNumber: row.InvoiceNumber
          },

          update: {
            numberVagonOrTank: row.numberVagonOrTank,
            weight: row.weight,
            perMetVklCert: row.perMetVklCert,
            perTioCert: row.perTioCert,
            perH2oCert: row.perH2oCert,
            H2OWeight: H2OWeight,
            DryWeight: dryWeight,
            MetalTon: metalTon,
            MinusMetal: minusMetalTon,
            standart80Tio2: standart80Tio2
          }
        })

        createdRecords.push(shop2Record)
      }

      const InvoiceNumbers = [
        ...new Set(allRows.map(row => row.InvoiceNumber))
      ]

      for (const invoiceNumber of InvoiceNumbers) {
        const records = await tx.shop2.findMany({
          where: {
            InvoiceNumber: invoiceNumber
          }
        })
        const total = records.reduce(
          (sum: number, record: Shop2) => sum + record.standart80Tio2,
          0
        )
        await tx.shop2Invoice.update({
          where: {
            InvoiceNumber: invoiceNumber
          },
          data: {
            TotalWeight: total
          }
        })
      }
      return createdRecords
    } catch (error) {
      console.error('Error in transaction:', error)
      return 500
    }
  })
  return {
    succes: true,
    data: result
  }
})
