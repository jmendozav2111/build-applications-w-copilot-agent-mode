import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Users({ apiBaseUrl }) {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : `${apiBaseUrl}/api/users/`

  useEffect(() => {
    let isMounted = true

    fetchCollection(apiEndpoint, 'users')
      .then((items) => {
        if (isMounted) {
          setUsers(items)
          setError('')
        }
      })
      .catch((fetchError) => {
        if (isMounted) {
          setError(fetchError.message)
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [apiEndpoint])

  if (isLoading) {
    return <p className="text-secondary">Loading users...</p>
  }

  if (error) {
    return <div className="alert alert-warning">Unable to load users: {error}</div>
  }

  return (
    <section>
      <div className="section-heading">
        <h1>Users</h1>
        <p>Member profiles and their current fitness goals.</p>
      </div>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Goal</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id || user.username || user.email}>
                <td>{user.displayName || user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.fitnessGoal || user.goal}</td>
                <td>{user.teamName || user.team}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Users
