import { Box, Stack, InputLabel, TextField, IconButton, Divider } from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { theme } from '@/styles/theme';

type Team = {
    team: string;
    score1: string;
    score2: string;
}

type TeamFieldSectionProps = {
    teams: Team[];
    setTeams: (teams: Team[]) => void;
}

export const TeamFieldSection = ({ teams, setTeams }: TeamFieldSectionProps) => {
    const addTeam = () => {
        setTeams([...teams, { team: "", score1: "", score2: "" }]);
    };

    const deleteTeam = (index: number) => {
        const newTeams = teams.filter((_, i) => i !== index);
        setTeams(newTeams);
    };

    const updateTeam = (index: number, field: keyof Team, value: string) => {
        const newTeams = [...teams];
        newTeams[index] = { ...newTeams[index], [field]: value };
        setTeams(newTeams);
    };

    return (
        <Box sx={{ my: 1 }}>
            <Stack spacing={2} direction="row" justifyContent="space-between" sx={{ alignItems: "center", mb: 1 }}>
                <InputLabel sx={{ mb: 1, fontSize: 13, color: "black" }}>対戦チーム</InputLabel>
                <IconButton size="small" sx={{ color: theme.palette.primary.main }} onClick={addTeam}>
                    <AddCircleOutlineIcon sx={{ width: "20px", height: "20px" }} />
                </IconButton>
            </Stack>
            {teams.map((team, index) => (
                <Box key={index} sx={{ position: "relative" }}>
                    <Stack sx={{ my: 2, alignItems: "center" }} direction="row" spacing={1} alignContent="flex-start">
                        <InputLabel sx={{ fontSize: 13, color: "black", minWidth: "25px" }}>VS</InputLabel>
                        <Box>
                            <Stack direction="row" spacing={0} alignItems="center" justifyContent="flex-start">
                                <InputLabel sx={{ fontSize: 13, color: "black", minWidth: "60px" }}>チーム名</InputLabel>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    value={team.team}
                                    onChange={newValue => updateTeam(index, "team", newValue.target.value)}
                                    sx={{ '& .MuiInputBase-input': { fontSize: 13 } }}
                                />
                            </Stack>
                            <Stack direction="row" spacing={0} alignItems="center" justifyContent="flex-start">
                                <InputLabel sx={{ fontSize: 13, color: "black", minWidth: "60px" }}>スコア</InputLabel>
                                <Stack sx={{ alignItems: "center" }} direction="row" spacing={0} alignContent="flex-start">
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        value={team.score1}
                                        onChange={newValue => updateTeam(index, "score1", newValue.target.value)}
                                        sx={{ '& .MuiInputBase-input': { fontSize: 13 } }}
                                    />
                                    <InputLabel sx={{ fontSize: 17, color: "black", mx: 2, width: "40px" }}>ー</InputLabel>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        value={team.score2}
                                        onChange={newValue => updateTeam(index, "score2", newValue.target.value)}
                                        sx={{ '& .MuiInputBase-input': { fontSize: 13 } }}
                                    />
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                    {index !== 0 && !team.team && !team.score1 && !team.score2 && (
                        <IconButton 
                            onClick={() => deleteTeam(index)} 
                            sx={{ position: "absolute", right: "-5px", top: "-5px", p: 0, backgroundColor: "white !important" }}
                        >
                            <HighlightOffIcon sx={{ width: "20px", height: "20px" }} />
                        </IconButton>
                    )}
                    {index !== teams.length - 1 && <Divider />}
                </Box>
            ))}
        </Box>
    )
} 