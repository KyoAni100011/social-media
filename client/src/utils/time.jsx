const formatTimeDifference = (timeStr) => {
  const targetTime = new Date(timeStr);
  const currentTime = new Date();

  const timeDifference = currentTime - targetTime;
  const seconds = Math.round(timeDifference / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const months = Math.round(days / 30);

  switch (true) {
    case seconds < 60:
      return `${seconds} s ago`;
    case minutes < 60:
      return `${minutes} m ago`;
    case hours < 24:
      return `${hours} h ago`;
    case days < 30:
      return `${days} d ago`;
    default:
      return `${months} m ago`;
  }
};

const formatDate = (date) => {
  const originalDate = new Date(date);

  const day = originalDate.getUTCDate();
  const month = originalDate.getUTCMonth() + 1; // Months are zero-based, so we add 1
  const year = originalDate.getUTCFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

export { formatTimeDifference, formatDate };
