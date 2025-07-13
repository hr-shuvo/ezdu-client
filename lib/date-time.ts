import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';


dayjs.extend(utc);

// export const formatRelativeDate = (dateStr: string) => {
//     const dayjsDate = dayjs.utc(dateStr).local().startOf("day");
//     const today = dayjs().startOf("day");
//     const diff = today.diff(dayjsDate, "day");
//
//     if (diff === 0) return "Today";
//     if (diff === 1) return "Yesterday";
//     return `${diff} days ago`;
// };

export const formatRelativeDate = (dateStr: string) => {
    const now = dayjs();
    const date = dayjs.utc(dateStr).local();
    const diffInSeconds = now.diff(date, "second");
    const diffInMinutes = now.diff(date, "minute");
    const diffInHours = now.diff(date, "hour");
    const diffInDays = now.startOf("day").diff(date.startOf("day"), "day");
    const diffInMonths = now.diff(date, "month");
    const diffInYears = now.diff(date, "year");

    if (diffInSeconds < 60) return "A few seconds ago";
    if (diffInMinutes < 5) return "A few minutes ago";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInHours < 6) return `${diffInHours} hours ago`;

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
};

export const formatDateTime = (date: string | Date): string => {
    return dayjs(date).format('MMM D, YYYY h:mm A');
};

export const formatDate = (date: string | Date): string => {
    return dayjs(date).format('MMM D, YYYY');
};