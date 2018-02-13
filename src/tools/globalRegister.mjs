import log from './logger'
import {success, error, redirect} from './resEnum'
import helper from './helper'
import crypto from './cryptoTool'
import config from './config'
import {get, post} from './httpTool'

{
	global.$config = config;
    global.$crypto = crypto;
	
	global.$log = new log();
	global.$helper = new helper();


	
	global.$success = success;
	global.$error = error;
    global.$redirect = redirect;

    global.$post = post;
    global.$get = get;
}