export const initialStae = {
    user: {
      id: "",
      name: "",
      email: "",
      password: "",
    },
    applications: [],
    tempApplication: {
      id: "",
      company: "",
      job_title: "",  
      location: "",
      posting_link: "",
      date_applied: new Date(),
      notes: "",
      status: "",
    },
    tableState: {
      rows_selected_length: 0,
      rows_selected: [],
    },
  };