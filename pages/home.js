import { useRef } from "react";
import PersonaModel, { PersonaListModel } from "../models/persona.model";
import useModel from "../hooks/useModel";
import {
  Button,
  Row,
  Col,
  Card,
  CardTitle,
  Container,
  FormGroup,
  Input,
  Label,
  CardBody,
} from "reactstrap";

import gsap from "gsap";
import { useLayoutEffect } from "react/cjs/react.production.min";

export default function Home() {
  const personasList = useModel(
    new PersonaListModel([
      { name: "nombre1", age: 10 },
      { name: "nombre2", age: 11 },
      { name: "nombre3", age: 12 },
    ])
  );

  return (
    <Container>
      <Card className={"mb-5 mt-2"}>
        <CardBody>
          <CardTitle>Personas List:</CardTitle>
          <PersonaList personasList={personasList} />
        </CardBody>
      </Card>
      <>
        <Card>
          <CardBody>
            <CardTitle>Add a new one:</CardTitle>
            <Form onSave={(newPersona) => personasList.add(newPersona)} />
          </CardBody>
        </Card>
      </>
    </Container>
  );
}

const Form = ({ onSave }) => {
  const newPersona = useModel(new PersonaModel({ name: "", age: 0 }));

  return (
    <>
      <Row>
        <Col>
          <FormGroup floating>
            <Input
              id="name"
              name="name"
              placeholder="Name"
              type="text"
              value={newPersona.name}
              onChange={(e) => (newPersona.name = e.target.value)}
            />
            <Label for="name">Name</Label>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup floating>
            <Input
              id="age"
              name="age"
              placeholder="Age"
              type="Number"
              value={newPersona.age}
              onChange={(e) => (newPersona.age = e.target.value)}
            />
            <Label for="age">Age</Label>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Row>
          <Col>
            <Button
              onClick={(e) => {
                onSave(newPersona);
                newPersona.name = "";
                newPersona.age = "";
              }}
            >
              agregar
            </Button>
          </Col>
        </Row>
      </Row>
    </>
  );
};

const fade = (el, onComplete) => {
  gsap.to(el, {
    duration: 0.3,
    opacity: 0,
    onComplete: function () {
      onComplete && onComplete();
    },
  });
};

const PersonaList = ({ personasList }) => {
  const refArray = useRef([]);

  const handleDelete = (persona, key) => {
    const ref = refArray.current.find((el) => {
      return Array.from(el.classList).includes(key);
    });
    fade(ref, () => personasList.remove(persona));
    refArray.current.splice(refArray.current.indexOf(ref), 1);
  };

  const addToRefs = (ref) => {
    if (ref && !refArray.current.includes(ref)) refArray.current.push(ref);
  };

  return (
    <>
      {personasList.personas &&
        personasList.personas.map((persona) => {
          const key = `${persona.name}`;

          return (
            <div key={key} ref={addToRefs} className={`${key}`}>
              <Container className={`border p-2 mb-1`}>
                <Row>
                  <Col xs="6">name: {persona.name}</Col>
                  <Col xs="4">age: {persona.age}</Col>
                  <Col>
                    <Button
                      onClick={(e) => {
                        console.log(e);
                        handleDelete(persona, key);
                      }}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Container>
            </div>
          );
        })}
      {!personasList.personas.length && (
        <>
          <Container className={`border p-2 mb-1`}>
            <Row>
              <Col xs="8" className={"text-align-center"}>
                No Results
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};
