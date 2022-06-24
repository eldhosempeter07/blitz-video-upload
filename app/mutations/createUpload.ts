import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateUpload = z.object({
  title: z.string(),
  video_location: z.string(),
})

// POST operation. Creating a data entry in file upload table

export default resolver.pipe(resolver.zod(CreateUpload), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const file = await db.fileUpload.create({ data: input })

  return file
})
