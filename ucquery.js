//IIFE闭包
(function(){
  //函数对象，调用这个函数返回一个ucQuery对象
  function ucQuery(selector) {
    //构建一个init构造函数的对象
    return new ucQuery.fn.init(selector);
  }

  //存放ucQuery的所有的方法
  ucQuery.fn = {
    //构造ucQuery对象, ucQuery是一个类数组对象
    init: function(selector) {
      //使用CSS选择器选择元素
      var elements = document.querySelectorAll(selector);
      //将选中的元素都放到ucQuery对象上
      for (var i = 0; i < elements.length; i++) {
        this[i] = elements[i];
      }
      //设置ucQuery对象的长度
      this.length = elements.length;
    },
    //DOM方法集
    //css方法获取或者设置样式，当获取样式则无法进行链式调用
    css: function() {
      //如果只有一个参数
      if (arguments.length === 1) {
        //如果第一个参数是字符串类型，则返回对应的CSS样式
        if (typeof arguments[0] === 'string') {

          var obj = this[0];
          var property = arguments[0];
          //能力检测
          if (window.getComputedStyle) {
            property = property.replace(/([A-Z])/g, function(match, $1) {
              return "-" + $1.toLowerCase();
            });
            return window.getComputedStyle(obj)[property];
          } else {
            //IE只认识驼峰
            property = property.replace(/\-([a-z])/g, function(match, $1) {
              return $1.toUpperCase();
            });
            return obj.currentStyle[property];
          }

        //如果第一个参数是对象类型，则批量设置CSS样式
        } else if(typeof arguments[0] === 'object') {

          //遍历所有的元素
          for (var i = 0; i < this.length; i++) {
            //设置多个CSS样式
            for (var property in arguments[0]) {
              this[i].style[property] = arguments[0][property];
            }
          }
          //使调用此方法后可以继续链式调用
          return this;

        }
      //如果一共有两个参数，则设置一个CSS样式
      } else if(arguments.length === 2) {

        for (var i = 0; i < this.length; i++) {
          this[i].style[arguments[0]] = arguments[1];
        }
        return this;

      }

      //抛出错误
      throw new Error('必须传入1个参数');
    },
    //可以获取和设置html
    html: function() {
      //当不传递参数的时候，获取第一个元素的html内容
      if (arguments.length === 0) {
        return this[0].innerHTML;
      } else if(arguments.length === 1) {
        for (var i = 0; i < this.length; i++) {
          this[i].innerHTML = arguments[0];
        }
        return this;
      }
    },
    //设置或获取属性
    attr: function() {
      //当只有一个参数的时候
      if (arguments.length === 1) {
        //如果第一个参数是字符串则获取第一个元素的属性值
        if (typeof arguments[0] === 'string') {
          var attribute = arguments[0];
          return this[0].getAttribute(attribute);
        //如果第一个参数是对象，则批量设置属性
        } else if (typeof arguments[0] === 'object') {
          for (var i = 0; i < this.length; i++) {
            for (var attribute in arguments[0]) {
              this[i].setAttribute(attribute, arguments[0][attribute]);
            }
          }
          return this;
        }
      } else if (arguments.length === 2) {
        for (var i = 0; i < this.length; i++) {
          this[i].setAttribute(arguments[0], arguments[1]);
        }
        return this;
      }
    },
    //事件：
    //click
    click: function(fn) {
      for (var i = 0; i < this.length; i++) {
        this[i].addEventListener('click', function(){
          fn.call(this);
        });
      }
      return this;
    },
    //拙劣的模仿   添加  dbclick事件
    dbclick: function(fn) {
      for (var i = 0; i < this.length; i++) {
        this[i].addEventListener('dbclick', function() {
          fn.call(this);
        });
        return this;
      }
    },

  }
  //使ucQuery对象能够调用ucQuery.fn对象里面的所有方法
  ucQuery.fn.init.prototype = ucQuery.fn;
  //将ucQuery暴露出去
  window.$ = window.ucQuery = ucQuery;
})();
