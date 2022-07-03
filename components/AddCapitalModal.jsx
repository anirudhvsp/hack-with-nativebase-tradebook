import React, { useState } from "react";
import { Button, FormControl, Input, Modal, TextArea, useToast, Spinner, Text } from "native-base";
import {
  getInputProps,
  strategyOptions,
  tickerOptions,
  timeframeOptions,
} from "../util/constants";
import CustomSelect from "./CustomSelect";
import { supabase } from "../App";

export default function AddCapitalModal({
  show,
  setShowModal,
  user,
  setUpdateList,
  updateList,
}) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const emptyForm = {
    capital: ""
  };
  const [formData, setFormData] = useState(emptyForm);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const { data, error } = await supabase.auth.update({
        data: {capital: formData.capital}
    });
    console.log(formData);
    console.log(error, data);
    toast.show({
      title: "Capital Added",
      placement: "bottom",
    });
    setLoading(false);
    setFormData(emptyForm);
    setUpdateList(!updateList);
    setShowModal(false);
  };

  return (
    <Modal isOpen={show} onClose={() => setShowModal(false)} size="lg">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Update Capital</Modal.Header>
        <Modal.Body>
          <FormControl mt="3">
            <FormControl.Label display="none">Capital</FormControl.Label>
            <Input
              {...getInputProps}
              size="lg"
              placeholder="Add Initial Capital"
              value={formData.capital}
              onChangeText={(v) => handleChange("capital", v)}
            />
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
              bg="black"
              _hover={{
                bg: "gray.700",
              }}
              onPress={handleSubmit}
            >
             {loading ? (<Spinner color="white" />) : (<Text color="white">Submit</Text>)}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
