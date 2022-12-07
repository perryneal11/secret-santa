import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { send } from "./sdk/send.sdk";

function App() {
  const [attendees, setAttendees] = useState([
    { name: "Person One", email: "personone@gmail.com", id: (Math.random() + 1).toString(36).substring(7)},
    { name: "Person Two", email: "persontwo@gmail.com", id: (Math.random() + 1).toString(36).substring(7)},
  ]);
  const [limit, setLimit] = useState(0);
  const [initiator, setInitiator] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [eventID, setEventId] = useState((Math.random() + 1).toString(36).substring(7))
  

  let handleChange = (i, e) => {
    let newFormValues = [...attendees];
    console.log(e.target);
    newFormValues[i][e.target.name] = e.target.value;
    setAttendees(newFormValues);
  };

  let handleRangeChange = (e) => {
    setLimit(e.target.value);
  };

  let addFormFields = (e) => {
    e.preventDefault();
    setAttendees([...attendees, { name: "", email: "" , id: (Math.random() + 1).toString(36).substring(7)}]);
  };

  let removeFormFields = (i, e) => {
    e.preventDefault();
    let newFormValues = [...attendees];
    newFormValues.splice(i, 1);
    setAttendees(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    send.invite(initiator, location, date, limit, attendees, eventID).then((result) => console.log(result)).catch(error => console.log(error))
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <h1>Secret Santa Creator</h1>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group className="mb-3" controlId="initiatorName">
                <Form.Label>Initiators Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={initiator}
                  onChange={(e) => setInitiator(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="eventDate">
                <Form.Label>Date of gift exchange</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="eventLocation">
                <Form.Label>location of gift exchange</Form.Label>
                <Form.Control
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="spendingAmount">
                <Form.Label>Maximum amount to spend</Form.Label>
                <Form.Text>${limit.toString()}</Form.Text>
                <Form.Range
                  value={limit}
                  min="20"
                  max="200"
                  onChange={(e) => handleRangeChange(e)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Attendees">
                {attendees.map((attendee, index) => {
                  return (
                    <InputGroup className="mb-3" key={index}>
                      <InputGroup.Text>Name and Email</InputGroup.Text>
                      <Form.Control
                        aria-label="name"
                        name="name"
                        placeholder="name"
                        defaultValue={attendee.name || ""}
                        onChange={(e) => handleChange(index, e)}
                      />
                      <Form.Control
                        key={index}
                        aria-label="email"
                        placeholder="email"
                        name="email"
                        defaultValue={attendee.email || ""}
                        onChange={(e) => handleChange(index, e)}
                      />

                      {index < 2 ? (
                        <Button
                          variant="outline-danger"
                          type="submit"
                          onClick={(e) => removeFormFields(index, e)}
                          disabled
                        >
                          Remove
                        </Button>
                      ) : (
                        <Button
                          variant="outline-danger"
                          onClick={(e) => removeFormFields(index, e)}
                        >
                          Remove
                        </Button>
                      )}
                    </InputGroup>
                  );
                })}
                <Button
                  variant="primary"
                  type="submit"
                  onClick={(e) => addFormFields(e)}
                >
                  +
                </Button>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </div>
  );
}

export default App;
