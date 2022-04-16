const scaleSize = (value: number) => value * 0.8

export const theme = {
  colors: {
    black: "#112633",
    red: "#C84C2B",
    white: "#EEEBE7",
    orange: "#F78C5A",
    navy: "#18414B",
    sand: "#D99E7F",
    lightBg: "#F8F7F7",
  },
  fonts: {
    sancreek: "Sancreek",
    antonio: "Antonio",
  },
  styles: {
    largeCard: {
      containerCard: { width: scaleSize(242), height: scaleSize(327) },
      innerCard: {
        width: scaleSize(228),
        height: scaleSize(307),
        borderRadius: scaleSize(15),
      },
      symbol: {
        width: scaleSize(75),
        height: scaleSize(75),
        marginY: scaleSize(50),
      },
      fontSize: { back: scaleSize(35), front: scaleSize(35) },
    },
    mediumCard: {
      containerCard: { width: scaleSize(180), height: scaleSize(245) },
      innerCard: {
        width: scaleSize(165),
        height: scaleSize(230),
        borderRadius: scaleSize(10),
      },
      symbol: {
        width: scaleSize(30),
        height: scaleSize(30),
        marginY: scaleSize(30),
      },
      fontSize: { back: scaleSize(30), front: scaleSize(30) },
    },
    smallCard: {
      containerCard: { width: scaleSize(140), height: scaleSize(185) },
      innerCard: {
        width: scaleSize(128),
        height: scaleSize(172),
        borderRadius: scaleSize(10),
      },
      symbol: {
        width: scaleSize(30),
        height: scaleSize(30),
        marginY: scaleSize(30),
      },
      fontSize: { back: scaleSize(26), front: scaleSize(20) },
    },
  },
}
