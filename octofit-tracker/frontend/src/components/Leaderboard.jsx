import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Leaderboard({ apiBaseUrl }) {
  const [leaderboard, setLeaderboard] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const apiEndpoint = `${apiBaseUrl}/api/leaderboard/`

  useEffect(() => {
    let isMounted = true

    fetchCollection(apiEndpoint, 'leaderboard')
      .then((items) => {
        if (isMounted) {
          setLeaderboard(items)
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
    return <p className="text-secondary">Loading leaderboard...</p>
  }

  if (error) {
    return <div className="alert alert-warning">Unable to load leaderboard: {error}</div>
  }

  return (
    <section>
      <div className="section-heading">
        <h1>Leaderboard</h1>
        <p>Weekly standings across teams and members.</p>
      </div>
      <div className="list-group shadow-sm">
        {leaderboard.map((entry) => (
          <article className="list-group-item leaderboard-row" key={entry._id || entry.username}>
            <span className="rank">#{entry.rank}</span>
            <div>
              <h2>{entry.username}</h2>
              <p>{entry.teamName}</p>
            </div>
            <div className="text-end ms-auto">
              <strong>{entry.points}</strong>
              <p>{entry.weeklyMinutes} min</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard
