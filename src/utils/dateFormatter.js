export const formatDateTime = (dateString) => {
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = new Date(dateString).toLocaleDateString("en-GB", options);
  const hours = new Date(dateString).getHours();
  const amPm = hours >= 12 ? "PM" : "AM";

  return formattedDate.replace(/(am|pm)/i, amPm);
};
