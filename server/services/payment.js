const https = require('https')

function payment(email, amount) {
    const params = JSON.stringify({
        email,
        amount,
    })

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
        },
    }

    const req = https
        .request(options, (res) => {
            let data = ''

            res.on('data', (chunk) => {
                data += chunk
            })

            res.on('end', () => {
                console.log(JSON.parse(data))
            })
        })
        .on('error', (error) => {
            console.error(error)
        })

    req.write(params)
    req.end()
}
