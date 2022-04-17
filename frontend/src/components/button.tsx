import React from "react"
import { Button as RButton, ButtonProps, SxStyleProp } from "rebass"
import { theme } from "../theme"

type ButtonType = "room" | "game"

type ButtonTypeStyle = { [key in ButtonType]: SxStyleProp }
interface IButtonProps extends ButtonProps {
  active?: boolean
  type?: ButtonType
}

export const Button: React.FC<IButtonProps> = (props) => {
  const type = props.type || "room"

  const activeStyle: ButtonTypeStyle = {
    room: {
      backgroundColor: theme.colors.white,
      color: theme.colors.navy,
    },
    game: {
      backgroundColor: theme.colors.red,
      color: theme.colors.white,
    },
  }

  const style: ButtonTypeStyle = {
    room: {
      border: `3px solid ${theme.colors.white}`,
      color: theme.colors.white,
      fontSize: 14,
      ":hover": {
        backgroundColor: `${theme.colors.white}80`,
      },
    },
    game: {
      border: `3px solid ${theme.colors.red}`,
      color: theme.colors.red,
      fontSize: 26,
      ":hover": {
        color: theme.colors.white,
        backgroundColor: theme.colors.red,
      },
    },
  }

  return (
    <RButton
      {...props}
      sx={{
        fontFamily: theme.fonts.antonio,
        paddingX: 28,
        paddingY: 10,
        cursor: "pointer",
        backgroundColor: "transparent",
        borderRadius: 10,
        ...style[type],
        ":active": activeStyle[type],
        ...(props.active && activeStyle[type]),
        ...props.sx,
      }}
    />
  )
}
