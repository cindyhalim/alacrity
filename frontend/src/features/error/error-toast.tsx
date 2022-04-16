import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Box, Flex, Text } from "rebass"
import { actions } from "src/redux/slice"
import { useAppSelector } from "src/redux/utils"
import { theme } from "src/theme"

export const ErrorToast: React.FC = () => {
  const showErrorToast = useAppSelector((state) => state?.showErrorToast)
  const dispatch = useDispatch()

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(actions.setShowErrorToast(false))
    }, 3000)

    return () => clearTimeout(timeout)
  }, [dispatch])

  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 1,
        width: "100%",
      }}
    >
      <AnimatePresence>
        {showErrorToast && (
          <motion.div
            key="toast"
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
                backgroundColor: theme.colors.red,
                borderRadius: "10px",
                marginTop: 40,
                width: "550px",
                marginX: "auto",
                minHeight: 50,
                color: theme.colors.white,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                sx={{
                  fontSize: 16,
                  fontFamily: theme.fonts.antonio,
                }}
              >
                Something went wrong! Please try again
              </Text>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}
