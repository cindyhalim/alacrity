import * as env from "env-var"

export const config = {
  websocketUrl: env.get("REACT_APP_WEBSOCKET_URL").required().asString(),
}
