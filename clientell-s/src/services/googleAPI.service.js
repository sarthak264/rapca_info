import axios from "axios";

const GoogleAPIService = {
  getMeetingDates: ({ sort, accountId, date_from, date_to }) => {
    return axios.post(
      `/google_api/calendar_event_dates?sort=${sort}${
        date_from ? `&date_from=${date_from}` : ""
      }${date_to ? `&date_to=${date_to}` : ""}`,
      { salesforce_account_id: accountId }
    );
  },
  getMeetingData: ({ sort, accountId, date, page }) => {
    return axios.post(
      `/google_api/calendar_event_list?sort=${sort}&date_from=${date}&date_to=${date}&page=${page}`,
      { salesforce_account_id: accountId }
    );
  },
  getMailDates: ({ sort, accountId, date_from, date_to, has_mail_sent }) => {
    return axios.post(
      `/google_api/mail_dates?sort=${sort}${
        date_from ? `&date_from=${date_from}` : ""
      }${date_to ? `&date_to=${date_to}` : ""}${
        has_mail_sent ? `&has_mail_sent=${has_mail_sent}` : ""
      }`,
      { salesforce_account_id: accountId }
    );
  },
  getMailData: ({ sort, accountId, date, page }) => {
    return axios.post(
      `/google_api/mail_list?sort=${sort}&date_from=${date}&date_to=${date}&page=${page}`,
      { salesforce_account_id: accountId }
    );
  },
};

export default GoogleAPIService;
