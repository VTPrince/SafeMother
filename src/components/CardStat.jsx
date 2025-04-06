import React from "react";
import { Card, CardContent, Typography, Box, Container, Grid2 } from "@mui/material";

export const CardStat = ({title ='',value = ''}) => {
    return (
        <>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" >
                                {title}
                            </Typography>
                            <Typography>
                                {value}
                            </Typography>
                        </CardContent>
                    </Card>
        </>
    )
}