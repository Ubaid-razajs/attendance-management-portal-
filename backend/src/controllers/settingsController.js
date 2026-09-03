import SchoolSettings from '../models/SchoolSettings.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const getSettings = asyncHandler(async (_req, res) => {
  let data = await SchoolSettings.findOne()
  if (!data) data = await SchoolSettings.create({})
  res.json({ success: true, data })
})

export const updateSettings = asyncHandler(async (req, res) => {
  let data = await SchoolSettings.findOne()
  if (!data) data = new SchoolSettings()
  Object.assign(data, req.body)
  await data.save()
  res.json({ success: true, data })
})
