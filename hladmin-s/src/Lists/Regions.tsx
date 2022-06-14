import * as React from "react";
import { List, Datagrid, TextField } from "react-admin";

export const RegionList = (props: any) => (
  <List {...props} bulkActionButtons={false} exporter={false}>
    <Datagrid rowClick='edit'>
      <TextField source='tz' />
      <TextField source='title' />
    </Datagrid>
  </List>
);

//    filters={[<TextInput source='q' label='Search' alwaysOn />]}
