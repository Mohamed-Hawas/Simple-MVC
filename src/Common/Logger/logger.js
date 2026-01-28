
class Logger {
    constructor(){
        if(!Logger.instance)
            Logger.instance = this ;

        return Logger.instance ;
    }

    log(level, msg, metadata = {}){

        const logObject = {
            level: level,
            msg: msg,
            timeStamp: Date.now(),
            ... metadata
        }

        console.log(JSON.stringify(logObject));
    }

    info(msg, metadata = {}){
        this.log('info', msg, metadata)
    }

    error(msg, metadata = {}){
        this.log('error', msg, metadata)
    }

    warn(msg, metadata = {}){
        this.log('warn', msg, metadata)
    }

    debug(msg, metadata = {}){
        this.log('debug', msg, metadata)
    }
}
const logger = new Logger();
module.exports = logger;