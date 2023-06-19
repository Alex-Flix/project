import React from 'react'

import { Modal, Button } from "react-bootstrap";
export default function ConfirmOrderForm({
    showModal,
    setShowModal,
    handleSubmit,
    formData,
    handleChange,
    errors
}) {
  return (<div>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Additional Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="cityInput" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="cityInput"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            {errors.city && <div className="error">{errors.city}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="streetInput" className="form-label">
              Street
            </label>
            <input
              type="text"
              className="form-control"
              id="streetInput"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
            />
            {errors.street && (
              <div className="error">{errors.street}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="buildingInput" className="form-label">
              Building
            </label>
            <input
              type="number"
              className="form-control"
              id="buildingInput"
              name="building"
              value={formData.building}
              onChange={handleChange}
              required
            />
            {errors.building && (
              <div className="error">{errors.building}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="notesInput" className="form-label">
              Notes
            </label>
            <textarea
              className="form-control"
              id="notesInput"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="phoneInput" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              className="form-control"
              id="phoneInput"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && (
              <div className="error">{errors.phone}</div>
            )}
          </div>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  </div>
  )
}
