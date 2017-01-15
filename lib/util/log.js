/**
 * 
 * @authors yutent (yutent@doui.cc)
 * @date    2015-11-25 17:48:17
 *
 */
"use strict";


class Log {

    constructor(file, dir){
        let _this = this
        this.basedir = DATA + 'logs/'

        if(!file || (typeof file !== 'string'))
            file = 'run_time.log'

        if(dir && (typeof dir === 'string'))
            this.basedir += dir.replace(/(^\/|\/$)/g, '') + '/'

        if(!Fs.exists(this.basedir))
            Fs.mkdir(this.basedir)

        _this.file = this.basedir + file

    }

    error(str){
        this.save(str, 'error')
    }

    info(str){
        this.save(str, 'info')
    }

    warn(str){
        this.save(str, 'warning')
    }

    debug(str){
        this.save(str, 'debug')
    }

    //写入日志文件
    save(str, type){
        type = type || 'debug'
        Fs.append(this.file, `[${type}] ${gmdate()} ${str} \n`)
    }
}


module.exports = Log