const state = {
  items: [],
  itemsAll: [],
  headers: [
    {
      text: "ID",
      align: "center",
      sortable: true,
      value: "id",
    },
    {
      text: "Name",
      align: "start",
      sortable: true,
      value: "name",
    },
    // {
    //   text: "Description",
    //   align: "center",
    //   sortable: true,
    //   value: "description",
    // },
    {
      text: "Qty",
      align: "center",
      sortable: true,
      value: "quantity",
    },
    {
      text: "ID Category",
      align: "center",
      sortable: true,
      value: "categoryId",
    },
    {
      text: "Price",
      align: "center",
      sortable: true,
      value: "priceTaxExcluded",
    },
    {
      text: "Status",
      align: "center",
      sortable: true,
      value: "status",
    },
    { text: "Actions", value: "actions", sortable: false },
  ],
  status: [
    {
      id: "0",
      name: "Inactive",
    },
    {
      id: "1",
      name: "Active",
    },
  ],
};
export default state;
