import { useEffect, useState } from "react";

export const useGetDate = () => {
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        setDate(new Date());
    }, []);

    return { date: date as Date, setDate };
};