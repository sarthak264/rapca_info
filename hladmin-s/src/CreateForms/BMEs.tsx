import { useEffect, useState } from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  useDataProvider,
  Record,
  NumberInput,
  minLength,
  maxValue,
  minValue,
} from "react-admin";
import { useForm } from "react-final-form";
import Map from "../Components/Map";

export const BMECreate = (props: any) => {
  const dataProvider = useDataProvider();
  const [regions, setRegions] = useState<Record[]>([]);

  useEffect(() => {
    dataProvider
      .getList("region", {
        pagination: { page: 1, perPage: 10 },
        sort: { field: "region", order: "asc" },
        filter: {},
      })
      .then(({ data }) => {
        setRegions(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source='name' validate={[minLength(10)]} />
        <SelectInput
          source='bme_type'
          choices={[{ name: "food_bank" }]}
          optionText={(choice) => choice.name}
          optionValue='name'
        />
        <SelectInput
          source='region_id'
          choices={regions}
          optionText={(choice) => choice.title}
          optionValue='id'
        />

        <AutoAddress />
      </SimpleForm>
    </Create>
  );
};

const AutoAddress = () => {
  const form = useForm();
  const setAddress = (address: string) => {
    form.change("address", address);
  };
  const setCoOrd = (lat: string, lang: string) => {
    form.change("longitude", lang);
    form.change("latitude", lat);
  };

  return (
    <>
      <Map
        setAddress={setAddress}
        setCoOrd={setCoOrd}
        googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyDeS8q_bNjtTnT8CH3uy7nRKzPKL8ginJ0&libraries=places'
        loadingElement={<div style={{ height: `100%` }} />}
      />
      <TextInput
        source='address'
        multiline
        validate={[minLength(25)]}
        style={{ display: "block" }}
      />
      <NumberInput
        source='longitude'
        validate={[maxValue(180), minValue(-180)]}
        style={{ display: "block" }}
      />
      <NumberInput
        source='latitude'
        validate={[maxValue(90), minValue(-90)]}
        style={{ display: "block" }}
      />
    </>
  );
};
