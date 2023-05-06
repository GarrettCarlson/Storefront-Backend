import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import product_routes from './handlers/products'
import order_routes from './handlers/orders'
import user_routes from './handlers/users'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

product_routes(app)
order_routes(app)
user_routes(app)

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
