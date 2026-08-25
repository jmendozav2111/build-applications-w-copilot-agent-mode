import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Workouts({ apiBaseUrl }) {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchCollection(apiBaseUrl, 'workouts')
      .then((items) => {
        if (isMounted) {
          setWorkouts(items)
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
  }, [apiBaseUrl])

  if (isLoading) {
    return <p className="text-secondary">Loading workouts...</p>
  }

  if (error) {
    return <div className="alert alert-warning">Unable to load workouts: {error}</div>
  }

  return (
    <section>
      <div className="section-heading">
        <h1>Workouts</h1>
        <p>Suggested sessions matched to member goals.</p>
      </div>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-6" key={workout._id || workout.title}>
            <article className="data-card h-100">
              <div className="d-flex justify-content-between gap-3">
                <div>
                  <h2>{workout.title}</h2>
                  <p>{workout.focusArea}</p>
                </div>
                <span className="badge text-bg-success">{workout.difficulty}</span>
              </div>
              <div className="card-meta">
                <span>{workout.durationMinutes} min</span>
                <span>{workout.recommendedForGoal}</span>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Workouts
