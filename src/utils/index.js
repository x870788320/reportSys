


//首字母大写
export const firstCharUpper = str => str.charAt(0).toUpperCase() + str.slice(1); 


//判断数据类型
const _toString = Object.prototype.toString;
export const toRawType = value => _toString.call(value).slice(8, -1)

//日期时间
const formatNum = n => n.toString()[1] ? n : '0' + n
export const formatDate = date => {
  if( toRawType(date) == 'String' || toRawType(date) == 'Number' ){
    date = new Date(date - 0);
  }
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  return [year, month, day].map(formatNum).join('-') + ' ' + [hour, minute, second].map(formatNum).join(':')
}
