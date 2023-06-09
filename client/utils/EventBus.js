/**
 * 事件总线机制完整代码
 */
export default class EventBus {
  static stores = {};  //{key:Array}
  constructor() {
      return {}
  }

  /**
   * 订阅事件
   * $on('event',cb)、$on('event',cb,this)
   * 
   * @param {String} event 事件名称
   * @param {Function} fn 回调函数
   * @param {Object} ctx this指向
   */
  static $on(event, fn, ctx) {
    console.log("$on", event)
      if (typeof fn != "function") {
          console.error('fn must be a function')
          return
      }

      ctx && fn.bind(ctx);

      this.stores[event] ? this.stores[event].push(fn) : this.stores[event] = [fn];
  }

  /**
   * 发布事件数据
   * $emit('event')、$emit('event','data')
   * 
   * @param {String} event 事件名称
   * @param {any} data 响应数据
   */
  static $emit(event, data) {
    console.log("$emit", event, this.stores[event]);
    if (this.stores[event]) {
        this.stores[event].forEach(fn => {
            fn && fn(data);
        });
    }
  }

  /**
   * 订阅一次事件
   * $once('event',cb)
   * 
   * @param {String} event 事件名称
   * @param {Function} fn 回调函数
   */
  $once(event, fn) {
      let _this = this;
      function handler(args) {
          fn.apply(_this, [args])
          _this.$off(event)
      }
      this.$on(event, handler)
  }

  /**
   * 取消事件绑定
   * $off()、$off('event')、$off('event',cb)
   * 
   * @param {String} event 事件名称
   * @param {Function} fn 回调函数
   */
  $off(event, fn) {

      // all
      if (!arguments.length) {
          this.stores = {};
          return;
      }

      // no this event
      if (!this.stores[event]) return;


      // has event and no fn fn
      if (arguments.length == 1) {
          delete this.stores[event];
          return;
      }

      // both has event and fn
      for (let i = 0; i < this.stores[event].length; i++) {
          let cb = this.stores[event][i];
          if (cb == fn) {
              this.stores[event].splice(i, 1);
              break;
          }
      }
  }
}
