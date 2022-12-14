const CronJob = require('cron').CronJob,
    axios = require('axios'),
    genThumb = require('../thumbnail/thumbnail_generator'),
    config = require('../config/config'),
    port = config.rtmp_server.http.port;

const job = new CronJob('*/5 * * * * *', function () {
    axios.get('http://127.0.0.1:' + port + '/api/streams')
        .then(response => {
            let streams = response.data;
            if (typeof (streams['live'] !== undefined)) {
                let live_streams = streams['live'];
                for (let stream in live_streams) {
                    if (!live_streams.hasOwnProperty(stream)) continue;
                    genThumb(stream);
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
}, null, true);

module.exports = job;