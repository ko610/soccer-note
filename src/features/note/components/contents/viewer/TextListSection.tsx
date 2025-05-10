import { List } from "@mui/material";

import { Typography } from "@mui/material";

import { Box } from "@mui/material";

type PageProps = {
    title: string;
    list: string[];
    color: string;
}

export default function TextListSection({ title, list, color }: PageProps) {
    return (
        <Box sx={{ px: 2, mb: 3, mt: 2 }}>
            <Typography sx={{ fontSize: 12, mb: 1, fontWeight: "bold", color: color }}>
                {title}
            </Typography>
            {list[0] ?
                <List sx={{ px: 0, my: 1, py: 0 }}>
                    {list.map((item, index) => (
                        <Box key={index}>
                            {
                                item != undefined &&
                                item.split('\n').map((line, index) => (
                                    <Typography
                                        key={index}
                                        variant="body2"
                                        sx={{ 
                                            fontSize: 14,
                                            color: "black",
                                            ml: index === 0 ? 0 : 2
                                        }}
                                    >
                                        {index === 0 && "・"}{line}
                                    </Typography>
                                ))
                            }
                        </Box>
                    ))
                    }
                </List >
                :
                <Typography variant="body2" sx={{ px: 1, width: "100px", fontSize: 14, color: "black" }}>
                    なし
                </Typography>
            }
        </Box>
    )
}