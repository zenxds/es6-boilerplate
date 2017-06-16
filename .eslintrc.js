module.exports = {
  "extends": "airbnb-base",
  "plugins": [
    "import"
  ],
  "rules": {
    "no-console": "off",
    // 行尾必须加分号
    "semi": "off",
    // 文件末尾必须留空行
    "eol-last": "off",
    // IE8在数组或对象的末尾元素后加逗号会抛出错误
    "comma-dangle": "off"
  }
};