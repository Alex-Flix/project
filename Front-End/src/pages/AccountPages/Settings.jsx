import { Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "../../components/Account  Component/settings.css";
import ChangePassword from "../../pages/AccountPages/ChangePassword";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { deleteUser } from "../../api/apiData";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Settings() {
  const [modalShow, setModalShow] = useState(false);
  const [modalInput, setModalInput] = useState("");
  const navigate = useNavigate();
  const loader = useSelector((state) => state.loader);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalInput === "DELETE") {
      deleteUser().then((data) => {
        if (data?.message) {
          setModalShow(false);
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
    } else setModalShow(false);
  };
  return (
    <>
      <div id="account" className="w-75 mx-auto text-capitalize py-4 px-0">
        <Accordion className="text-light">
          <Accordion.Item eventKey="0">
            <Accordion.Header className=" fw-bold">
              change password
            </Accordion.Header>
            <Accordion.Body className="p-0 text-capitalize">
              <ChangePassword />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header className=" fw-bold text-capitalize">
              deactivate account
            </Accordion.Header>
            <Accordion.Body className="p-3">
              <Button
                variant="danger text-capitalize"
                onClick={() => setModalShow(true)}
              >
                deactivate account
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter" className="p-2">
            Delete Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="p-3  lead fw-medium">
            Deleting your account will remove all of your information. This cannot be undone.
          </p>
          <Form onSubmit={handleSubmit} className="px-4">
            <Form.Group className="mb-3 row" controlId="formGroup">
              <Form.Label className="text-muted p-2">
                To confirm this, type "DELETE"
              </Form.Label>
              <div className="col-8">
                <Form.Control
                  type="text"
                  onChange={(e) => setModalInput(e.target.value)}
                />
              </div>
              <Button variant="danger" type="submit" className="col-4">
                {loader ? "Delete Account" : "Waiting......"}
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Settings;
