function formatTime() {
  let date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  let week = date.getDay()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + formatWeek(week);
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatWeek(w) {
  let arr = ['一','二','三','四','五','六','日'];
  let ind = w - 1;

  return arr.indexOf(arr[ind]) > -1 ? ' 星期' + arr[ind] : '';
}

module.exports = {
  formatTime: formatTime
}
