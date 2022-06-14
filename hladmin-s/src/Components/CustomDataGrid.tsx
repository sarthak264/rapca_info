import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TablePagination,
} from "@material-ui/core";

const CustomDatagrid = (propsDataGrid: {
  dataGridValues: any;
  children: any;
}) => {
  const { children, dataGridValues } = propsDataGrid;
  const {
    dataKey,
    ids,
    total,
    rowsPerPage,
    setRowsPerPage,
    setNewPage,
    newPage,
  } = dataGridValues;

  const handleChangePage = (event: any, page: any) => {
    setNewPage(page);
  };

  const handleChangeRowsPerPage = (event: any) => {
    const vlrDecimal = parseInt(event.target.value, 10);
    setRowsPerPage(vlrDecimal);

    setNewPage(0);
  };

  return (
    <>
      <Table style={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            {children &&
              children.map(({ props }: any) => (
                <TableCell>
                  {props && props.label ? props.label : props.source}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {ids &&
            ids.map((id: any) => (
              <TableRow>
                {React.Children.map(children, (child) => (
                  <TableCell>
                    {React.cloneElement(
                      child,
                      { record: dataKey[id] },
                      child.props.children ? child.props.children : null
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10]}
        component='div'
        count={total}
        rowsPerPage={rowsPerPage}
        page={newPage}
        onPageChange={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage='Results per Page:'
      />
    </>
  );
};

export default CustomDatagrid;
