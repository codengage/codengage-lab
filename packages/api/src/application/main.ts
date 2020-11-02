import 'dotenv/config'
import { createServer } from 'http'
import app from './app'

const main = async () => {
  const server = createServer(app.callback())

  server.listen(process.env.APP_PORT, () => {
    console.log(`server running at http://localhost:${process.env.APP_PORT}`)
  })
}

main()
