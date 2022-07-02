import React, { useState } from "react";
import { Button, FormControl, Input, Modal, TextArea, useToast } from "native-base";
import {
  strategyOptions,
  tickerOptions,
  timeframeOptions,
} from "../util/constants";
import CustomSelect from "./CustomSelect";
import { supabase } from "../App";

export default function AddTradeModal({ show, setShowModal ,user, setUpdateList, updateList}) {
  const toast = useToast();
  const [formData, setFormData] = useState({
    ticker: "",
    strategy: "",
    timeframe: "",
    risk: "",
    profit: "",
    imageUrl: "",
    note: "",
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const {data,error } = await supabase.from('trades').insert([{user_id : user.id, ticker : formData.ticker,timeframe : formData.timeframe,risk:formData.risk,profit:formData.profit,image_url:formData.imageUrl,note:formData.note, stratergy:formData.strategy}]);
    console.log(formData);
    console.log(error, data);
    toast.show({
      title: "Trade Added",
      placement: "bottom",
    });
    setUpdateList(!updateList);
    setShowModal(false);
    

  };

  return (
    <Modal isOpen={show} onClose={() => setShowModal(false)} size="lg">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Add Trade</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Ticker</FormControl.Label>
            <CustomSelect
              options={tickerOptions}
              placeholder="Select Stock Symbol"
              name="ticker"
              handleChange={handleChange}
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Strategy</FormControl.Label>
            <CustomSelect
              options={strategyOptions}
              placeholder="Select Strategy"
              name="strategy"
              handleChange={handleChange}
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Timeframe</FormControl.Label>
            <CustomSelect
              options={timeframeOptions}
              placeholder="Select Timeframe"
              name="timeframe"
              handleChange={handleChange}
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Risk</FormControl.Label>
            <Input
              size="lg"
              placeholder="Risk"
              value={formData.risk}
              onChangeText={(v) => handleChange("risk", v)}
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Profit</FormControl.Label>
            <Input
              size="lg"
              placeholder="Profit"
              keyboardType="numeric"
              value={formData.profit}
              onChangeText={(v) => handleChange("profit", v)}
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Image Url</FormControl.Label>
            <Input
              size="lg"
              placeholder="Trade Setup Image"
              value={formData.imageUrl}
              onChangeText={(v) => handleChange("imageUrl", v)}
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Note</FormControl.Label>
            <TextArea
              size="lg"
              placeholder="Note"
              value={formData.note}
              onChangeText={(v) => handleChange("note", v)}
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
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
