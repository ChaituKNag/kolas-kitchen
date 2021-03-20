const Parser = require('rss-parser');
exports.handler = async function(event, context) {
    let parser = new Parser();
    let feed = await parser.parseURL("https://www.youtube.com/feeds/videos.xml?channel_id=UCSaeN_KJDnsdPdC--bcOsGA");
    return {
        statusCode: 200,
        body: JSON.stringify({
            feed
        })
    }
}