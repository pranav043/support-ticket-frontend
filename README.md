# Support Ticket Management System

Support TIX, a cutting-edge support ticket management system developed with the MERN stack. This seamless platform automates ticket creation and assignment through a round-robin algorithm, ensuring fair distribution among agents. With its sleek and straightforward UI, Support TIX simplifies the support process, offering a clean interface for efficient ticket resolution.

Server Side Repo Link: https://github.com/pranav043/support-ticket-backend


## Deployment

Project deployed live at: https://support-tix.vercel.app/

## Screenshots

HomeScreen Screenshot

![App Screenshot](https://i.ibb.co/VWtKtb6/support-tix.png)


## Run Locally

To run the project locally, run below commands. Make sure to start server first & set env's

```bash
  git clone https://github.com/pranav043/support-ticket-frontend.git
```

```bash
  cd support-ticket-frontend
```

```bash
  npm install
```

```bash
  npm start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_GET_TICKETS`=http://localhost:8000/api/support-tickets

`VITE_CREATE_TICKET`=http://localhost:8000/api/support-tickets

`VITE_CREATE_AGENT`=http://localhost:8000/api/support-agents

