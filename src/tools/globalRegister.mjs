import log from './logger'
import {success, error}  from './resEnum'
import helper from './helper'
import config from './config'

export default function (){
	global.$log = log;
	global.$helper = helper;
	global.$config = config;
	
	global.$success = success;
	global.$error = error;
}