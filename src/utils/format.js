/**
 * formate
 * money rate word secret
 */

const format = {
  //  格式化日期 或者使用moment
  date: function(d, formatStr) {
    // 转换成Date类型
    var date = new Date(d);
    console.log(date);
    var opt = {
      YYYY: date.getFullYear(),
      MM: addZero(date.getMonth() + 1),
      M: date.getMonth() + 1,
      dd: addZero(date.getDate()),
      d: date.getDate(),
      HH: addZero(date.getHours()),
      h: date.getHours(),
      mm: addZero(date.getMinutes()),
      m: date.getMinutes(),
      ss: addZero(date.getSeconds()),
      s: date.getSeconds()
    };

    // 如果是个位数则前面添加0
    function addZero(value) {
      return value < 10 ? "0" + value : value;
    }

    // 遍历替换
    for (var k in opt) {
      formatStr = formatStr.replace(k, opt[k]);
    }

    console.log(formatStr);
    return formatStr;
  }
};

export default format;
