import { useState, useEffect } from 'react'

function calculateRemaining(targetTimestamp) {
  const now = new Date()
  let target
  if (targetTimestamp?.toDate) {
    target = targetTimestamp.toDate()
  } else if (targetTimestamp instanceof Date) {
    target = targetTimestamp
  } else {
    target = new Date()
    target.setHours(22, 0, 0, 0) // fallback: 10:00 PM tonight
  }

  const diff = target - now
  if (diff <= 0) {
    return 'Ended'
  }

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s left`
}

export default function SpecialBanner({ specialItem, onAdd }) {
  const [timeLeft, setTimeLeft] = useState(() =>
    calculateRemaining(specialItem?.specialEndsAt),
  )

  // Personal Feature (Digit 5): Live countdown from Firestore specialEndsAt Timestamp
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(calculateRemaining(specialItem?.specialEndsAt))
    }, 1000)

    return () => clearInterval(timerId)
  }, [specialItem?.specialEndsAt])

  if (!specialItem) return null

  return (
    <div className="special-banner">
      <div className="special-banner-header">
        <span className="special-tag">⭐ Today&apos;s Daily Special</span>
        <span className="special-countdown">⏳ Ends in: {timeLeft}</span>
      </div>
      <div className="special-content">
        <div className="special-details">
          <h3 className="special-name">{specialItem.name}</h3>
          <p className="special-desc">{specialItem.description}</p>
          <div className="special-pricing">
            <span className="category-tag">{specialItem.category}</span>
            <span className="special-price">RM {specialItem.price.toFixed(2)}</span>
          </div>
        </div>
        <button
          type="button"
          className="btn-add special-btn"
          disabled={!specialItem.available}
          onClick={() => onAdd(specialItem)}
        >
          {specialItem.available ? 'Add special to cart' : 'Sold out'}
        </button>
      </div>
    </div>
  )
}
