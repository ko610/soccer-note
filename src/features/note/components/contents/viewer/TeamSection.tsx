import { GameTeamType } from "@/types/note/game/GameTeam";
import { Stack, Typography, List } from "@mui/material";

type PageProps = {
    teams: GameTeamType[];
}

export default function TeamSection({ teams }: PageProps) {
    return (
        <>
            {teams && teams[0]?.team &&
                <List sx={{ mx: 2 }}>
                    {teams.map((team, index) => (
                    <Stack key={index} direction="row" justifyContent="space-between" sx={{ my: 1 }}>
                            <Stack direction="row" alignItems="center" >
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12, mr: 1 }}>
                                VS
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: 14, color: "black" }}>
                                {String(team.team)}
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" sx={{ mr: 2 }}>
                            <Typography variant="body2" sx={{ fontSize: 16, color: "black" }}>
                                {String(team.score1)}
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: 16, mx: "6px", color: "black", transform: "scale(2, 1)" }}>
                                -
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: 16, color: "black" }}>
                                {String(team.score2)}
                            </Typography>
                        </Stack>
                    </Stack>
                        ))
                    }
                </List>
            }
        </>
    )
}