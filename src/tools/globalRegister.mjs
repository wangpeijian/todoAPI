import log from './logger'
import {success, error}  from './resEnum'
import helper from './helper'

export default function (){
	global.$log = log;
	global.$helper = helper;
	global.$success = success;
	global.$error = error;
}