function formattedDate( createdAt: string | number | Date) {
  const createdDate = new Date(createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return createdDate.replace(
    /(\d{4})\.(\d{2})\.(\d{2}) (\d{2}:\d{2}:\d{2})/,
    "$1년 $2월 $3일 $4"
  );
}

export default formattedDate;
