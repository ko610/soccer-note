"use client"

import { startOfMonth, addDays, subMonths, addMonths, format, isAfter } from 'date-fns';
import { AppBar, Typography, styled, Tabs, Tab, IconButton, Stack } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EventIcon from '@mui/icons-material/Event';
import ClearIcon from '@mui/icons-material/Clear'
import { dateFormat } from '@/utils/date/dateFormat';
import { isToday } from '@/utils/date/isToday';
import { theme } from '@/styles/theme';
import dayjs from 'dayjs';

const barStyle = {
    width: "100%",
    bgcolor: "white",
    color: "black",
    mx: "auto",
    position: "fixed",
    zIndex: "100",
    boxShadow: "none",
    borderBottom: "solid 1px rgb(219, 219, 219)",
    pl: { md: "90px", lg: "250px" },
    touchAction: "none"
}

type PageProps = {
    date: string
    setDate: (date: string) => void
    showCalendar: boolean
    setShowCalendar: (show: boolean) => void
}

export default function NoteHeader({ date, setDate, showCalendar, setShowCalendar }: PageProps) {
    const currentMonth = startOfMonth(new Date());
    const currentDate = new Date();
    
    const handleDateChange = (newDate: Date) => {
        if (!isAfter(newDate, dayjs(currentDate).toISOString())) {
            setDate(dayjs(newDate).format('YYYY-MM-DD'));
        }
    };

    const handleMonthChange = (newDate: Date) => {
        const nextMonthDate = startOfMonth(newDate);
        if (!isAfter(nextMonthDate, dayjs(currentMonth).toISOString())) {
            setDate(dayjs(nextMonthDate).format('YYYY-MM-DD'));
        }
    };

    const previousDate = () => handleDateChange(addDays(date, -1));
    const nextDate = () => handleDateChange(addDays(date, 1));
    const previousMonth = () => handleMonthChange(subMonths(date, 1));
    const nextMonth = () => handleMonthChange(addMonths(date, 1));
    
    const isNextMonthDisabled = isAfter(startOfMonth(addMonths(date, 1)), currentMonth);
    const isNextDateDisabled = !showCalendar && isToday(date);
    
    return (
        <AppBar sx={barStyle} position="static">
            <Stack sx={{ height: 45, px: 1, width: "100%", maxWidth: "550px", mx: "auto" }} direction="row" justifyContent="space-between" alignItems="center" >
                <IconButton 
                    size='large'
                    onClick={() => showCalendar ? previousMonth() : previousDate()}
                    sx={{ width: 40, height: 40 }}
                >
                    <ArrowLeftIcon />
                </IconButton>
                <Stack direction="row" alignItems="center">
                    <IconButton 
                        onClick={() => setShowCalendar(!showCalendar)} 
                        sx={{ mr: 1 }}
                    >
                        {showCalendar ? <ClearIcon/> : <EventIcon />}
                    </IconButton>
                    <Typography component="h2" fontSize={15}>
                        {showCalendar 
                            ? format(date, 'yyyy年 M月')
                            : dateFormat(dayjs(date).toISOString())
                        }
                    </Typography>
                </Stack>
                <IconButton 
                    size='large'
                    onClick={() => showCalendar ? nextMonth() : nextDate()}
                    sx={{ width: 40, height: 40 }}
                    disabled={isNextDateDisabled || (showCalendar && isNextMonthDisabled)}
                >
                    <ArrowRightIcon />
                </IconButton>
            </Stack>
        </AppBar>
    );
}

interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

interface StyledTabProps {
    label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
))(() => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: theme.palette.secondary.main,
    '&.Mui-selected': {
        color: theme.palette.primary.main,
    },
}));

const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
        variant="fullWidth"
        centered
    />
))(() => ({
    mx: "auto",
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
    height: 32,
    minHeight: 32,
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: theme.palette.primary.main,
    },
    '& .MuiTabs-flexContainer': {
        height: 32,
        minHeight: 32,
    },
    '& .MuiButtonBase-root': {
        height: 32,
        minHeight: 32,
    },
}));
