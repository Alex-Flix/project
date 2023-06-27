import React from "react";

import { Modal, Button } from "react-bootstrap";
export default function ConfirmOrderForm({
  showModal,
  setShowModal,
  handleSubmit,
  formData,
  handleChange,
  errors,
}) {
  return (
    <div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="mt-5"
      >
        <Modal.Header closeButton className="">
          <Modal.Title>Additional Info</Modal.Title>
        </Modal.Header>
        <Modal.Body className="alex-bg text-white">
          <form onSubmit={handleSubmit} noValidate className="p-2">
            <div className="mb-3 ">
              <label
                htmlFor="cityInput"
                className="form-label text-secondary ms-1 mt-1"
              >
                City
              </label>
              <input
                type="text"
                className="form-control text-light bg-transparent"
                id="cityInput"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              {errors.city && (
                <div className="error text-danger mt-2">{errors.city}</div>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="streetInput"
                className="form-label ms-1 text-secondary "
              >
                Street
              </label>
              <input
                type="text"
                className="form-control text-light bg-transparent"
                id="streetInput"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
              />
              {errors.street && (
                <div className="error text-danger mt-1">{errors.street}</div>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="buildingInput"
                className="form-label ms-1 text-secondary "
              >
                Building
              </label>
              <input
                type="number"
                className="form-control text-light bg-transparent"
                id="buildingInput"
                name="building"
                value={formData.building}
                onChange={handleChange}
                required
              />
              {errors.building && (
                <div className="error text-danger mt-2">{errors.building}</div>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="notesInput"
                className="form-label ms-1 text-secondary "
              >
                Notes
              </label>
              <textarea
                className="form-control text-light bg-transparent"
                id="notesInput"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
            <div className="mb-3">
              <label
                htmlFor="phoneInput"
                className="form-label ms-1 text-secondary "
              >
                Phone
              </label>
              <input
                type="tel"
                className="form-control text-light bg-transparent"
                id="phoneInput"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && (
                <div className="error text-danger mt-2">{errors.phone}</div>
              )}
            </div>
            <Button
              variant="primary"
              type="submit"
              disabled={
                formData.city.trim() === "" ||
                formData.street.trim() === "" ||
                formData.building.trim() === "" ||
                formData.phone.trim() === "" ||
                Object.values(errors).some((error) => error)
              }
            >
              Submit
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
