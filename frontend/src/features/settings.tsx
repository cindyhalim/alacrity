import { FrontendWebsocketActions } from "alacrity-shared"
import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Box, Flex, Text } from "rebass"
import { actions } from "src/redux/slice"
import { useAppSelector } from "src/redux/utils"
import { theme } from "src/theme"
import { useWSContext } from "src/utils/websocket-context"
import { Button } from "../components/button"

const SettingsIcon: React.FC<{ isActive: boolean; onClick: () => void }> = ({
  isActive,
  onClick,
}) => {
  return (
    <Box
      sx={{ cursor: "pointer", position: "absolute", left: 0, bottom: 0, padding: 20, zIndex: 100 }}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 25 25">
        <path
          fill={isActive ? theme.colors.white : theme.colors.navy}
          d="M24 13.616v-3.232c-1.651-.587-2.694-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.561.742-2.433 1.375-3.707.847h-.001c-1.269-.526-1.435-1.576-2.019-3.219h-3.232c-.582 1.635-.749 2.692-2.019 3.219h-.001c-1.271.528-2.132-.098-3.707-.847l-2.285 2.285c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02v3.232c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847h.001c1.27.526 1.436 1.579 2.019 3.219h3.232c.582-1.636.75-2.69 2.027-3.222h.001c1.262-.524 2.12.101 3.698.851l2.285-2.286c-.744-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"
        />
      </svg>
    </Box>
  )
}

const SettingsContent = () => {
  const roomId = useAppSelector((state) => state.roomId)
  const { sendMessage } = useWSContext()
  const dispatch = useDispatch()
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const handleEndGame = () => {
    dispatch(actions.setIsGameLoading(true))
    sendMessage({
      action: FrontendWebsocketActions.GameEnded,
      roomId,
    })
  }

  return (
    <motion.div initial={false} onClick={() => setIsExpanded(!isExpanded)}>
      <Flex
        sx={{
          cursor: "pointer",
          border: `3px solid ${theme.colors.white}`,
          borderRadius: 10,
          padding: 28,
          minWidth: 500,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text sx={{ fontFamily: theme.fonts.antonio, fontSize: 30, color: theme.colors.white }}>
          END GAME
        </Text>
        <AnimatePresence>
          {isExpanded && (
            <motion.section
              key="end-game"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.5, ease: "backInOut" }}
            >
              <Flex
                sx={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  sx={{
                    fontSize: 16,
                    color: theme.colors.white,
                    marginRight: 20,
                  }}
                >
                  Are you sure you want to end this game?
                </Text>
                <Button onClick={handleEndGame}>YES</Button>
              </Flex>
            </motion.section>
          )}
        </AnimatePresence>
      </Flex>
    </motion.div>
  )
}

export const Settings = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const handleOnIconClick = () => {
    setIsVisible(!isVisible)
  }

  return (
    <>
      <SettingsIcon isActive={isVisible} onClick={handleOnIconClick} />
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="settings"
            initial="hide"
            animate="show"
            exit="hide"
            variants={{
              show: { opacity: 1 },
              hide: { opacity: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Flex
              sx={{
                width: "100%",
                height: "100vh",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: theme.colors.navy,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SettingsContent />
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
