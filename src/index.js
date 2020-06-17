import directive from './directive'

const install = function (Vue) {
  Vue.directive("line-clamp", directive)
}

export default {
  install
}