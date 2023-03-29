import React from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";

const Header = ({
    seed,
    setSeed,
    locale,
    setLocale,
    handleSubmit,
    handleRandomSeed,
    corruptionLevel,
    setCorruptionLevel
}) => {
    const sliderMin = 0;
    const sliderMax = 10;
    const sliderStep = 1;
    const maxCorruptionLevel = 1000;

    const handleCorruptionLevelChange = (value) => {
        const floatValue = parseFloat(value.replace(",", "."));
        const clampedValue = Math.min(Math.max(floatValue, sliderMin), maxCorruptionLevel);
        setCorruptionLevel(value);
    };

    const handleSliderChange = (value) => {
        const floatValue = parseFloat(value);
        const newCorruptionLevel = Math.min(
            Math.max(floatValue * sliderStep, sliderMin),
            maxCorruptionLevel
        );
        setCorruptionLevel(newCorruptionLevel);
    };

  return (
    <header className="mb-3">
      <h1>Data Generator</h1>
      <Form onSubmit={handleSubmit} className="mb-3">
        <Form.Group controlId="formSeed">
          <Form.Label>Seed:</Form.Label>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Enter seed"
              value={seed}
              onChange={(event) => setSeed(event.target.value)}
            />
            <Button variant="outline-secondary" onClick={handleRandomSeed}>
              Random
            </Button>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="formLocale">
          <Form.Label>Locale:</Form.Label>
          <Form.Control
            as="select"
            value={locale}
            onChange={(event) => {setLocale(event.target.value)}}
          >
            <option value="cz">Czech</option>
            <option value="de">German</option>
            <option value="en">United States</option>
            <option value="es">Spanish</option>
            <option value="it">Italian</option>
            <option value="pl">Polish</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formCorruptionLevelSlider">
          <Form.Label>Choose corruption level (0-10):</Form.Label>
          <div className="d-flex justify-content-between">
            <div>{sliderMin}</div>
            <div>{sliderMax/2}</div>
            <div>{sliderMax}</div>
          </div>
          <input
            type="range"
            className="form-range mt-1"
            min={sliderMin}
            max={sliderMax}
            step={sliderStep}
            value={corruptionLevel / sliderStep}
            onChange={(event) => handleSliderChange(event.target.value)}
          />
          <div>{corruptionLevel}</div>
        </Form.Group>
        <Form.Group controlId="formCorruptionLevelInput">
          <Form.Label>Corruption Level (direct input, 0-1000):</Form.Label>
          <InputGroup>
            <FormControl
              type="number"
              placeholder="Enter corruption level (1-1000)"
              value={corruptionLevel}
              onChange={(event) => handleCorruptionLevelChange(event.target.value)}
              min={sliderMin}
              max={maxCorruptionLevel}
              step={0.01} 
            />
            <InputGroup.Text id="basic-addon2">/1000</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Button variant="primary" type="submit">
          Generate
        </Button>
      </Form>
    </header>
 

  );
  

};

export default Header;
