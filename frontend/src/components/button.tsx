import React from "react"
import { Button as RButton, ButtonProps } from "rebass"
import { theme } from "../theme"

interface IButtonProps extends ButtonProps {
  active?: boolean
}

export const Button: React.FC<IButtonProps> = (props) => {
  const activeStyle = {
    backgroundColor: theme.colors.white,
    color: theme.colors.navy,
  }
  return (
    <RButton
      {...props}
      sx={{
        border: `3px solid ${theme.colors.white}`,
        color: theme.colors.white,
        fontFamily: theme.fonts.antonio,
        fontSize: 14,
        paddingX: 28,
        paddingY: 10,
        cursor: "pointer",
        backgroundColor: "transparent",
        borderRadius: 10,
        ":hover": {
          backgroundColor: `${theme.colors.white}80`,
        },
        ":active": activeStyle,
        ...(props.active && activeStyle),
        ...props.sx,
      }}
    />
  )
}
