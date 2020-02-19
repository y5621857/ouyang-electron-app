/**
 * author: YangYi
 * Email: 229655153@qq.com
 * Date: 2020-02-18
 * Time: 21:15
 */
export const flattenArr=(arr)=>{
  return arr.reduce((map,item)=>{
    map[item.id]=item;
    return map;
  },{});
};

export const objToArr=(obj)=>{
  return Object.keys(obj).map((key)=>obj[key]);
};
