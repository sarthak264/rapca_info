import { Create, SimpleForm, TextInput, SelectInput } from "react-admin";

export const TripCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <SelectInput
        source="tz"
        choices={[
          {
            type: "jdr1:region",
            _id: "6177fd8e7812647706e10985",
            title: "City of Toronto",
            tz: "America/Toronto",
          },
          {
            type: "jdr1:region",
            _id: "61861fb854c7cc55caa6ba3b",
            title: "City of Vancouver",
            tz: "America/Vancouver",
          },
          {
            type: "jdr1:region",
            _id: "61862832b4954127907c4fbf",
            title: "Alaska",
            tz: "America/Anchorage",
          },
          {
            type: "jdr1:region",
            _id: "6188fe06325a606961d7a3ee",
            title: "Mumbai",
            tz: "Asia/Kolkata",
          },
          {
            type: "jdr1:region",
            _id: "619b0db47825136ca726d61f",
            title: "New York",
            tz: "America/New_York",
          },
          {
            type: "jdr1:region",
            _id: "61a77b7f89d08dd30cd02472",
            title: "New York",
            tz: "America/New_York",
          },
        ]}
        optionText={(choice) => choice.tz}
        optionValue="tz"
      />
    </SimpleForm>
  </Create>
);
