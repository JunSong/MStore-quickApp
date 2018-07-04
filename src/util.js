/**
 * 显示菜单
 */
function showMenu () {
  const prompt = require('@system.prompt')
  const router = require('@system.router')
  const appInfo = require('@system.app').getInfo()
  prompt.showContextMenu({
    itemList: ['保存桌面', '关于', '取消'],
    success: function (ret) {
      switch (ret.index) {
      case 0:
        // 保存桌面
        createShortcut()
        break
      case 1:
        // 关于
        router.push({
          uri: '/About',
          params: {
            name: appInfo.name,
            icon: appInfo.icon
          }
        })
        break
      case 2:
        // 取消
        break
      default:
        prompt.showToast({
          message: 'error'
        })
      }
    }
  })
}

/**
 * 创建桌面图标
 * 注意：使用加载器测试`创建桌面快捷方式`功能时，请先在`系统设置`中打开`应用加载器`的`桌面快捷方式`权限
 */
function createShortcut () {
  const prompt = require('@system.prompt')
  const shortcut = require('@system.shortcut')
  shortcut.hasInstalled({
    success: function (ret) {
      if (ret) {
        prompt.showToast({
          message: '已创建桌面图标'
        })
      } else {
        shortcut.install({
          success: function () {
            prompt.showToast({
              message: '成功创建桌面图标'
            })
          },
          fail: function (errmsg, errcode) {
            prompt.showToast({
              message: `${errcode}: ${errmsg}`
            })
          }
        })
      }
    }
  })
}

function sizeFormat(value) {
  let sizeUnit = ['B', 'KB', "MB", "GB"],
    map = {
      kb1: 1024,
      mb1: 1048576,
      mb100: 104857600,
      gb1: 1073741824,
      gb10: 10737418240
    };
    try {
      if (value < map.kb1) {
        return `${parseInt(value)}${sizeUnit[0]}`;
      }
      if (value < map.mb1) {
        return `${parseInt(value / map.kb1)}${sizeUnit[1]}`;
      }
      if (value < map.mb100) {
        return `${(value / map.mb1).toFixed(1)}${sizeUnit[2]}`;
      }
      if (value < map.gb1) {
        return `${parseInt(value / map.mb1)}${sizeUnit[2]}`;
      }
      if (value < map.gb10) {
        return `${(value / map.gb1).toFixed(1)}${sizeUnit[3]}`;
      }
      return `${parseInt(value / map.gb1)}${sizeUnit[3]}`;
    } catch (e) {
      return '';
    }
}

function countFormat(value){
  if (value < 1000) {
    return '少于1千';
  } else if (1e3 <= value && value < 1e4) { //一千到一万
    return new String(value).substr(0, 1) + '千';
  } else if (value >= 1e4 && value < 1e8) { //一万到一亿
    return (value / 1e4).toFixed(0) + '万';
  } else {
    return (value / 1e8).toFixed(0) + '亿';
  }
}

export default {
  showMenu,
  createShortcut,
  sizeFormat,
  countFormat
}
