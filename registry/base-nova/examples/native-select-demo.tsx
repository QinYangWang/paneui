import { Field, FieldLabel } from "@/registry/base-nova/ui/field"
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@/registry/base-nova/ui/native-select"

export default function NativeSelectDemo() {
  return (
    <Field className="w-56">
      <FieldLabel htmlFor="region">Region</FieldLabel>
      <NativeSelect id="region" defaultValue="hkg">
        <NativeSelectOptGroup label="Asia Pacific">
          <NativeSelectOption value="hkg">Hong Kong</NativeSelectOption>
          <NativeSelectOption value="sin">Singapore</NativeSelectOption>
          <NativeSelectOption value="nrt">Tokyo</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Americas">
          <NativeSelectOption value="iad">Virginia</NativeSelectOption>
          <NativeSelectOption value="sfo">San Francisco</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </Field>
  )
}
