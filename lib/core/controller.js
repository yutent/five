/**
 * 控制器基类
 * @authors yutent (yutent@doui.cc)
 * @date    2016-01-02 23:19:16
 *
 */

"use strict";

const view = new (require('dojs-template'))({cache: false})

class Controller {

    constructor(obj){
        this.name = obj.req.app;
        this.request = obj.req;
        this.response = obj.res;

        //启用SESSION
        let ssid = this.cookie('NODESSID');
        if(!ssid){
            ssid = Session.start(ssid);
            this.cookie('NODESSID', ssid, {httpOnly: true, domain: dojs.session.domain})
        }else{
            //ssid非法或过期时，需要重写
            if(ssid !== Session.start(ssid)){
                this.cookie('NODESSID', Session.ssid, {httpOnly: true, domain: dojs.session.domain})
            }
        }
        
    }

    //定义一个变量，类似于smarty，把该
    assign(key, val){
        key += ''
        if(!key)
            return

        if(val === undefined || val === null)
            val = ''

        view.assign(key, val)
    }

    //模板渲染, 参数是模板名, 可不带后缀, 默认是 .tpl
    render(file){
        view.render(VIEWS + file)
            .then(html => {
                this.response.render(html)
            }).catch(err => {
                this.response.error(err)
            })
    }

    //针对框架定制的debug信息输出
    xdebug(err){
        let msg = err
        if(dojs.debug)
            msg = err.stack || err

        this.response.append('X-debug', msg + '')
    }

    cookie(key, val, options){
        let Coo = new Cookie(this.request.req, this.response.res)
        let opts = {domain: dojs.domain}
        
        if(typeof key !== 'string')
            throw new Error(`argument key must be a string in cookie() ${typeof key} given`)

        if(arguments.length === 1)
            return Coo.get(key)

        val += ''
        opts = opts.merge(options)

        if(opts.expires)
            opts.maxAge = opts.expires

        if(!val)
            opts.maxAge = -1

        Coo.set(key, val, opts)
    }


    

}


module.exports = Controller