import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Teams({ apiBaseUrl }) {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : `${apiBaseUrl}/api/teams/`

  useEffect(() => {
    let isMounted = true

    fetchCollection(apiEndpoint, 'teams')
      .then((items) => {
        if (isMounted) {
          setTeams(items)
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
    return <p className="text-secondary">Loading teams...</p>
  }

  if (error) {
    return <div className="alert alert-warning">Unable to load teams: {error}</div>
  }

  return (
    <section>
      <div className="section-heading">
        <h1>Teams</h1>
        <p>Training groups moving toward shared weekly goals.</p>
      </div>
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-lg-4" key={team._id || team.name}>
            <article className="data-card h-100">
              <h2>{team.name}</h2>
              <p>{team.description}</p>
              <div className="card-meta">
                <span>{team.memberCount} members</span>
                <span>{team.weeklyGoalMinutes} min goal</span>
              </div>
              <p className="captain">Captain: {team.captain}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Teams
