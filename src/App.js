import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { SendSecretSanta } from "./sdk/SendSecretSanta.sdk";

function App() {
  const [attendees, setAttendees] = useState([{ name: "", email: "" }]);
  const [limit, setLimit] = useState(0);
  const [initiator, setInitiator] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());

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
    setAttendees([...attendees, { name: "", email: "" }]);
  };

  let removeFormFields = (i, e) => {
    e.preventDefault();
    let newFormValues = [...attendees];
    newFormValues.splice(i, 1);
    setAttendees(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    //alert(JSON.stringify(initiator, location, date, limit, attendees));
    SendSecretSanta.sendInvite(initiator, location, date, limit, attendees)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>1 of 1</Col>
        </Row>
      </Container>

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
        <p>{JSON.stringify(initiator)}</p>
        <p>{JSON.stringify(attendees)}</p>
        <p>{JSON.stringify(location)}</p>
        <p>{JSON.stringify(date)}</p>

        <Form.Group className="mb-3" controlId="Attendees">
          {attendees.map((attendee, index) => {
            return (
              <InputGroup className="mb-3" key={index}>
                <InputGroup.Text>Name and Email</InputGroup.Text>
                <Form.Control
                  aria-label="name"
                  name="name"
                  placeholder="name"
                  defaultValue={attendee.email || ""}
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
                <Button
                  variant="outline-danger"
                  type="submit"
                  onClick={(e) => removeFormFields(index, e)}
                >
                  Remove
                </Button>
              </InputGroup>
            );
          })}
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => addFormFields(e)}
        >
          +
        </Button>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
