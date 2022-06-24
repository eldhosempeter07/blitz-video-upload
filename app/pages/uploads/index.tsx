import logout from "app/auth/mutations/logout"
import getUploads from "app/queries/getFileupload"
import { BlitzPage, Link, useMutation, useQuery } from "blitz"
import { Suspense, useState } from "react"

const UploadForm: BlitzPage = () => {
  const [logoutMutation] = useMutation(logout)
  const [search, setSearch] = useState("")
  const [searchText, setSearchText] = useState("")
  const [uploads] = useQuery(getUploads, searchText)

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link href={`/uploads/add`}>
          <a
            style={{
              background: "#6700eb",
              border: "none",
              color: "#fff",
              borderRadius: "3px",
              padding: "0.4rem",
              marginLeft: "0.3rem",
              marginRight: "1rem",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            <strong>Add New</strong>
          </a>
        </Link>
        <button
          style={{
            background: "#6700eb",
            border: "none",
            color: "#fff",
            borderRadius: "3px",
            padding: "0.4rem",
            marginLeft: "0.3rem",
            marginRight: "1rem",
            cursor: "pointer",
          }}
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
      </div>
      <br />
      <br />
      {uploads?.length > 0 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault(), setSearchText(search)
          }}
        >
          <input
            type="text"
            style={{ padding: "0.3rem" }}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
          <button
            style={{
              cursor: "pointer",
              background: "#6700eb",
              border: "none",
              color: "#fff",
              borderRadius: "3px",
              padding: "0.4rem",
              marginLeft: "0.3rem",
            }}
          >
            Search
          </button>
        </form>
      ) : null}
      {uploads?.length ? (
        uploads.map((upload) => (
          <div style={{ color: "#6700eb", textAlign: "center", width: "500px" }}>
            <h2>{upload.title}</h2>
            <video width="400" controls>
              <source src={`${window.location.origin}/${upload.video_location}`} type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          </div>
        ))
      ) : (
        <p>No data found</p>
      )}
    </div>
  )
}

const Upload: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback="Loading ...">
        <UploadForm />
      </Suspense>
    </div>
  )
}

export default Upload
