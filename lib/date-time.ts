import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';


dayjs.extend(utc);

export const formatRelativeDate = (dateStr: string) => {
    const dayjsDate = dayjs.utc(dateStr).local().startOf("day");
    const today = dayjs().startOf("day");
    const diff = today.diff(dayjsDate, "day");

    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return `${diff} days ago`;
};

export const formatDateTime = (date: string | Date): string => {
    return dayjs(date).format('MMM D, YYYY h:mm A');
};

export const formatDate = (date: string | Date): string => {
    return dayjs(date).format('MMM D, YYYY');
};