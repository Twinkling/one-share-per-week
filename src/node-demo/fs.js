const fs = require('fs');


const write = (env) => {
    const config = {
        appid: 'ssdds',
        third: '1qwer',
        env: `${env}`,
    };
    return `export default ${JSON.stringify(config)}`; 
}

const text = write('test');

fs.writeFileSync('./env.js', text);