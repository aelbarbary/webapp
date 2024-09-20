import { Icon } from "@iconify/react"
import { Typography } from "@mui/material"

interface Props {
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2"
    text: string
    icon: string
}
export default function IconHeading({ variant, text, icon }: Props) {
    return (
        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }} variant={variant}>
            <Icon icon={icon} /> {text}
        </Typography>
    )
}