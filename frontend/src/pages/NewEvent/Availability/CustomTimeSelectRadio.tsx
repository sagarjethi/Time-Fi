import React from "react";
import { Radio, FormControlLabel } from "@material-ui/core";
import { typedAdornField } from "../../../shared/AdornText";

type OnChangeCB = (event: { target: { value: string } }, value: string) => void;

export type CustomTimeSelectRadioProps = {
  onChange: OnChangeCB;
  value: string;
};

const CustomAdornField = typedAdornField("custom");

const initialState = { value: "85" };
export class CustomTimeSelectRadio extends React.Component<
  CustomTimeSelectRadioProps,
  typeof initialState
> {
  state = initialState;

  updateOnEdit = (cb: OnChangeCB) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.persist();
    this.setState({ value: event.target.value }, () => {
      cb(event, this.state.value);
    });
  };

  updateOnSelect = (cb: OnChangeCB) => (e: any) =>
    cb({ target: { value: this.state.value } }, this.state.value);

  render() {
    const { value, onChange } = this.props;
    return (
      <FormControlLabel
        value={value}
        control={
          <Radio
            onChange={this.updateOnSelect(onChange)}
            checked={this.state.value === value}
          />
        }
        label={
          <CustomAdornField
            defaultValue={this.state.value}
            children={"custom"}
            onChange={this.updateOnEdit(onChange)}
            onFocus={this.updateOnSelect(onChange)}
          />
        }
        onChange={onChange as any}
      />
    );
  }
}
