import express from 'express'
import dotenv from 'dotenv'
import route from 'routes/route'
import cookieParser from 'cookie-parser'
dotenv.config()
const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(cookieParser()) // cookie-den meluati oxumaq ucun

app.get('/', (req, res) => {
    res.send('AUTHENTICATION ROUTES')
})

app.use('/api/auth', route)

app.use((err: any, req: any, res: any, next: any) => {
    console.error('ERROR:', err);
    return res.status(500).json({
        type: "application/problem+json",
        status: 500,
        title: "Internal Server Error",
        detail: err?.message ?? "Unexpected error"
    })
})

app.listen(PORT, () => {
    console.log(`Server is runnig on http://localhost:${PORT}`)
})