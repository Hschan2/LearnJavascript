interface createAtProps {
  createdAt: string | number | Date;
}

function formattedDate({ createdAt }: createAtProps) {
  const createdDate = new Date(createdAt)
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split(".");
  return `${createdDate[0]}년 ${createdDate[1]}월 ${createdDate[2]}일`;
}

export default formattedDate;
