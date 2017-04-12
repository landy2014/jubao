/**
 * ---------------------------------------------------
 *
 *  author: landy
 *  date:   17/3/23
 *
 * ---------------------------------------------------
 */
module.exports = {
  getFormatDay: function(time) {
    time = time || new Date();

    return time.getFullYear() + time.getMonth() + (time.getDate() + 1);
  }
}