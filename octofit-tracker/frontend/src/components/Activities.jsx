import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Activities({ apiBaseUrl }) {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchCollection(apiBaseUrl, 'activities')
      .then((items) => {
        if (isMounted) {
          setActivities(items)
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
    return <p className="text-secondary">Loading activities...</p>
  }

  if (error) {
    return <div className="alert alert-warning">Unable to load activities: {error}</div>
  }

  return (
    <section>
      <div className="section-heading">
        <h1>Activities</h1>
        <p>Recent workout logs from OctoFit members.</p>
      </div>
      <div className="row g-3">
        {activities.map((activity) => (
          <div className="col-md-6" key={activity._id || `${activity.username}-${activity.activityDate}`}>
            <article className="data-card h-100">
              <div className="d-flex justify-content-between gap-3">
                <div>
                  <h2>{activity.type}</h2>
                  <p className="text-secondary">{activity.username}</p>
                </div>
                <span className="metric">{activity.durationMinutes} min</span>
              </div>
              <div className="card-meta">
                <span>{activity.caloriesBurned} calories</span>
                <span>{activity.activityDate ? new Date(activity.activityDate).toLocaleDateString() : 'No date'}</span>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Activities
