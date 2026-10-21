
import { SegmentedControl } from "@paneui/ui-native";

export default function SegmentedExample() {
  return (
    <SegmentedControl
      label="View"
      defaultValue="week"
      options={[
        { value: "day", label: "Day" },
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
      ]}
    />
  );
}
