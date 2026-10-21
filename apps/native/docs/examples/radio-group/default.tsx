import { RadioGroup, RadioGroupItem } from "@paneui/ui-native";

export default function RadioExample() {
  return (
    <RadioGroup label="Delivery" defaultValue="email">
      <RadioGroupItem value="email" label="Email" />
      <RadioGroupItem value="inbox" label="Inbox" />
      <RadioGroupItem value="sms" label="Text message" disabled />
    </RadioGroup>
  );
}
