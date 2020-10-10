const fs = require('fs')

fs.writeFileSync(
    './.env',
    `REACT_APP_API_URL=${process.env.REACT_APP_API_URL}\n`
)
