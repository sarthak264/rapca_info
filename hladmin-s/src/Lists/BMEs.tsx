import { useState } from "react";
import { List, Datagrid, TextField, TextInput, Pagination } from "react-admin";

export const BMEList = (props: any) => {
  console.log({ props });
  return (
    <List
      {...props}
      bulkActionButtons={false}
      exporter={false}
      filters={[<TextInput source='q' label='Search' alwaysOn />]}
      perPage={10}
    >
      <Datagrid rowClick='edit'>
        <TextField source='address' />
        <TextField source='bme_type' />
        <TextField source='name' />
      </Datagrid>
    </List>
  );
};
