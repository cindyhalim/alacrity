import { AnimationControls, motion } from "framer-motion"
import React from "react"

interface IAnimatedCardWrapperProps {
  animate: AnimationControls
  id: string
}
export const AnimatedCardWrapper: React.FC<IAnimatedCardWrapperProps> = ({
  animate,
  id,
  children,
}) => (
  <motion.div key={id} animate={animate}>
    {children}
  </motion.div>
)
