import { Form, Container, Row } from "react-bootstrap";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [ver, setVer] = useState(0);
  const [varianta, setVarianta] = useState("C");
  const [seed, setSeed] = useState(0);
  const [conta, setConta] = useState(0);
  const [stocuri, setStocuri] = useState(0);
  const calculateKey = (pcodcd, plver, plprg, mcodn) => {
    const mlcod =
      pcodcd
        .substring(0, 6)
        .split("")
        .reduce((result, current, index) => {
          return result + current.charCodeAt() * (index + 1);
        }, 0) +
      mcodn * plver +
      plprg.charCodeAt();
    return parseInt((Math.sqrt(mlcod * Math.sqrt(mlcod)) % 1) * 1000000);
  };
  const variantaHandler = (e) => {
    setVarianta(e.target.value);
  }
  const verHandler = (e) => {
    setVer(e.target.value);
  };
  const seedHandler = (e) => {
    setSeed(e.target.value);
  };
  useEffect(() => {
    if (!!seed && !!ver) {
      setConta(calculateKey(seed, ver, varianta, 6));
      setStocuri(calculateKey(seed, ver, "S", 6));
    }
  }, [ver, seed, varianta]);
  return (
    <Container>
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="formVarianta">
            <Form.Select
              className="mb-3"
              controlId="formVarianta"
              aria-label="Default select example"
              onChange={variantaHandler}
            >
              <option value="C">C</option>
              <option value="P">PS</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formVer">
            <Form.Label>Versiune</Form.Label>
            <Form.Control
              type="text"
              placeholder="ex: 553"
              onChange={verHandler}
            />
            <Form.Text className="text-muted">
              Ultimele 3 cifre din versiune.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSeed">
            <Form.Label>Codul de identificare</Form.Label>
            <Form.Control
              type="text"
              placeholder="ex: 000A3945"
              onChange={seedHandler}
            />
            <Form.Text className="text-muted">
              Codul scris cu majuscule si fara spatii
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="CodactivareConta">
            <Form.Label>Cod activare Conta</Form.Label>
            <Form.Control type="text" value={conta} readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="CodactivareConta">
            <Form.Label>Cod activare stocuri</Form.Label>
            <Form.Control type="text" value={stocuri} readOnly />
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
}

export default App;
