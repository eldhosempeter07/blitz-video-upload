import createUpload from "app/mutations/createUpload"
import { useRouter, BlitzPage, useMutation, Link } from "blitz"
import { Formik, Form, Field } from "formik"
import { useState } from "react"
import axios from "axios"

const AddNew: BlitzPage = () => {
  const router = useRouter()
  const [createUploadMutation] = useMutation(createUpload)
  const [fileSelected, setFileSelected] = useState<File>()
  interface MyFormValues {
    video_location: string
    title: string
  }
  const initialValues: MyFormValues = { video_location: "", title: "" }
  const [error, setError] = useState("")

  // function to set file to a state variable
  const uploadFile = function (files: FileList | null) {
    const fileList = files
    if (!fileList) return
    setFileSelected(fileList[0])
  }

  return (
    <div style={{ marginLeft: "5rem", marginTop: "2rem" }}>
      <div>
        <Link href={`/`}>
          <a
            style={{
              background: "#6700eb",
              border: "none",
              color: "#fff",
              borderRadius: "3px",
              padding: "0.4rem",
              marginRight: "1rem",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            <strong>Back To Home</strong>
          </a>
        </Link>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          try {
            if (values.title == "" || setFileSelected == null || undefined) {
              return setError("Please enter all the fields")
            } else {
              if (fileSelected?.name == undefined) return setError("Please enter all the fields")
              setError("")
              // call post function
              await createUploadMutation({
                ...values,
                video_location: `/${fileSelected.name}`,
              })
              // call api to upload file to local disk
              let formData = new FormData()
              formData.append("filetoupload", fileSelected)
              axios.post("/api/files/upload", formData, {
                headers: {
                  "Content-type": "multipart/form-data",
                },
              })
              router.push("/")
            }
          } catch (error) {
            alert("Error saving project")
          }
        }}
      >
        <Form>
          <br />
          <br />
          <label htmlFor="video_location">Path</label>
          <br />
          <input
            accept=" video/*"
            id="file"
            name="filetoupload"
            type="file"
            onChange={(event) => {
              uploadFile(event.target.files)
            }}
          />{" "}
          <br />
          <br />
          <label htmlFor="title">Title</label>
          <br />
          <Field style={{ padding: "0.3rem" }} id="title" name="title" placeholder="title" />
          <br />
          <br />
          {error ? <p style={{ color: "red" }}>{error}</p> : null}
          <button
            style={{
              cursor: "pointer",
              background: "#6700eb",
              border: "none",
              color: "#fff",
              borderRadius: "3px",
              padding: "0.7rem 2rem",
            }}
            type="submit"
          >
            Submit
          </button>
        </Form>
      </Formik>
      <style jsx global>{`
        #input {
          width: 100%;
          padding: 12px 20px;
          margin: 8px 0;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default AddNew
