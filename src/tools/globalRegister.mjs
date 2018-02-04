import log from './logger'
import {success, error} from './resEnum'
import helper from './helper'
import config from './config'

{
	global.$config = config;
	
	global.$log = new log();
	global.$helper = new helper();
	
	global.$success = success;
	global.$error = error;
}