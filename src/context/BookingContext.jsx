import { createContext, useContext, useState, useEffect } from 'react'

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal  = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeModal() }
    if (isOpen) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <BookingContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  return useContext(BookingContext)
}
