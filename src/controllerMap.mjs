/**
 * Created by peijian.wang on 2016/2/2.
 */
import user from './controllers/cUserController'
import todo from './controllers/cTodoController'
import wx from './controllers/wxController'

const controllerMap = new Map();

controllerMap.set("user", new user());
controllerMap.set("todo", new todo());
controllerMap.set("wx", new wx());

export {controllerMap}