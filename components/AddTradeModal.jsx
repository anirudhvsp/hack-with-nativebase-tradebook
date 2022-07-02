import { Button, FormControl, Input, Modal, TextArea } from "native-base";
import React from "react";
import {
  strategyOptions,
  tickerOptions,
  timeframeOptions,
} from "../util/constants";
import CustomSelect from "./CustomSelect";

export default function AddTradeModal({ show, setShowModal }) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <Modal
      isOpen={show}
      onClose={() => setShowModal(false)}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      size="lg"
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Add Trade</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Ticker</FormControl.Label>
            <CustomSelect
              options={tickerOptions}
              placeholder="Select Stock Symbol"
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Strategy</FormControl.Label>
            <CustomSelect
              options={strategyOptions}
              placeholder="Select Strategy"
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Timeframe</FormControl.Label>
            <CustomSelect
              options={timeframeOptions}
              placeholder="Select Timeframe"
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Risk</FormControl.Label>
            <Input placeholder="Risk" type="number" />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Profit</FormControl.Label>
            <Input placeholder="Profit" />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Image Url</FormControl.Label>
            <Input placeholder="Trade Setup Image" />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Note</FormControl.Label>
            <TextArea h={20} placeholder="Description" />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                setShowModal(false);
              }}
            >
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
