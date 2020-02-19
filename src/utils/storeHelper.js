/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-19
 * Time: 12:23
 */
const Store = window.require("electron-store");
const appStore = new Store();

export const getItem=(name)=>{
  return appStore.get(name);
};

export const setItem=(name, value)=>{
  return appStore.set(name,value);
};

export default {
  getItem,
  setItem
};
