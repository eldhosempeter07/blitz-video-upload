import db from "db"

// function to get documents from FileUpload table
export default async function getUploads(val) {
  if (val) {
    // query to get  document's title  contain search value
    return await db.fileUpload.findMany({ where: { title: { contains: val } } })
  } else {
    // query to get all document
    return await db.fileUpload.findMany()
  }
}
