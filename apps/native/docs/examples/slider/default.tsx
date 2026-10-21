import { Field, Slider } from "@paneui/ui-native";

export default function SliderExample() {
  return (
    <Field label="Volume">
      <Slider defaultValue={40} step={5} />
    </Field>
  );
}
