/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/lib/logger.ts
var __extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var FrameCollection = function () {
  function FrameCollection() {
    var frames = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      frames[_i] = arguments[_i];
    }
    this.frames = frames;
  }
  FrameCollection.prototype.clear = function () {
    this.frames.length = 0;
  };
  FrameCollection.prototype.push = function (frame) {
    this.frames.push(frame);
  };
  FrameCollection.prototype.filter = function (callbackFn) {
    var result = new FrameCollection();
    var tempFrame;
    for (var i = 0; i < this.frames.length; i++) {
      tempFrame = this.frames[i];
      if (callbackFn(tempFrame, i, this.frames)) {
        result.push(tempFrame);
      }
    }
    return result;
  };
  return FrameCollection;
}();
var TraceCollection = function (_super) {
  __extends(TraceCollection, _super);
  function TraceCollection() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  TraceCollection.prototype.toString = function (format) {
    var trace = [];
    for (var _i = 0, _a = this.frames; _i < _a.length; _i++) {
      var frame = _a[_i];
      trace.push(frame.toString(format));
    }
    return trace.join("\n");
  };
  return TraceCollection;
}(FrameCollection);
var LogCollection = function (_super) {
  __extends(LogCollection, _super);
  function LogCollection() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  LogCollection.prototype.toHtmlString = function () {
    var stack = ["<div style=\"\n                font-size: 15px;\n                font-family: monospace;\n                word-wrap:break-word;\n            \">"];
    for (var i = 0; i < this.frames.length; i++) {
      stack.push(this.frames[i].toHtmlString());
    }
    stack.push('</div>');
    return stack.join('\n');
  };
  LogCollection.prototype.toString = function () {
    var stack = [];
    for (var i = 0; i < this.frames.length; i++) {
      stack.push(this.frames[i].toString());
    }
    return stack.join('\n');
  };
  return LogCollection;
}(FrameCollection);
var TraceStackFrame = function () {
  function TraceStackFrame(line, callerName) {
    this.line = line;
    this.callerName = callerName;
  }
  TraceStackFrame.prototype.getLine = function () {
    return this.line;
  };
  TraceStackFrame.prototype.getCallerName = function () {
    return this.callerName;
  };
  TraceStackFrame.prototype.setCallerName = function (callerName) {
    this.callerName = callerName;
  };
  TraceStackFrame.prototype.toString = function (format) {
    return (format !== null && format !== void 0 ? format : defaultFormatter)(this.line, this.callerName);
  };
  return TraceStackFrame;
}();
var LogStackFrame = function () {
  function LogStackFrame(data, scheme) {
    this.data = data;
    this.scheme = scheme !== null && scheme !== void 0 ? scheme : LoggerSchemes.log;
  }
  LogStackFrame.prototype.getLevel = function () {
    return this.scheme.level;
  };
  LogStackFrame.prototype.getData = function () {
    return this.data;
  };
  LogStackFrame.prototype.toString = function () {
    return this.data;
  };
  LogStackFrame.prototype.toHtmlString = function () {
    var htmlArray = [];
    var startTag = "<span style='color: ".concat(this.scheme.color, ";'>");
    var endTag = "</span></br>";
    for (var _i = 0, _a = this.data.split('\n'); _i < _a.length; _i++) {
      var line = _a[_i];
      line = line.replace(/[<>&"'`\/]/g, function (c) {
        return {
          '<': '&lt;',
          '>': '&gt;',
          '&': '&amp;',
          '"': '&quot;',
          '\'': '&#39;',
          '`': '&#96',
          '\/': '&#x2F'
        }[c];
      });
      htmlArray.push([startTag, line, endTag].join(''));
    }
    return htmlArray.join('\n');
  };
  return LogStackFrame;
}();
var LogLevel;
(function (LogLevel) {
  LogLevel[LogLevel["Debug"] = 0] = "Debug";
  LogLevel[LogLevel["Log"] = 1] = "Log";
  LogLevel[LogLevel["Info"] = 2] = "Info";
  LogLevel[LogLevel["Warn"] = 3] = "Warn";
  LogLevel[LogLevel["Error"] = 4] = "Error";
})(LogLevel || (LogLevel = {}));
var LoggerSchemes = function () {
  function LoggerSchemes() {}
  LoggerSchemes.trace = {
    'displayName': 'TRACE',
    'logFunction': console.verbose,
    'color': 'lightgrey',
    'level': LogLevel.Debug
  };
  LoggerSchemes.debug = {
    'displayName': 'DEBUG',
    'logFunction': console.verbose,
    'color': 'lightgrey',
    'level': LogLevel.Debug
  };
  LoggerSchemes.log = {
    'displayName': ' LOG ',
    'logFunction': console.log,
    'color': 'black',
    'level': LogLevel.Log
  };
  LoggerSchemes.info = {
    'displayName': 'INFO',
    'logFunction': console.info,
    'color': 'green',
    'level': LogLevel.Info
  };
  LoggerSchemes.warn = {
    'displayName': 'WARN',
    'logFunction': console.warn,
    'color': 'yellow',
    'level': LogLevel.Warn
  };
  LoggerSchemes.error = {
    'displayName': 'ERROR',
    'logFunction': console.error,
    'color': 'red',
    'level': LogLevel.Error
  };
  return LoggerSchemes;
}();
var logStack = new LogCollection();
var TOKEN = null;
function getCallerName(index) {
  if (index === void 0) {
    index = 0;
  }
  var trace = sliceStackFrames(getRawStackTrace(), 1, 0);
  var stackFrames = parseTrace(trace);
  if (index < 0) index = 0;
  if (index > stackFrames.length - 1) index = stackFrames.length - 1;
  return stackFrames[index].getCallerName();
}
function getRawStackTrace(endFunction) {
  var stackTrace = {
    stack: ''
  };
  Error.captureStackTrace(stackTrace, endFunction);
  return sliceStackFrames(stackTrace.stack, 1, -2);
}
function getStackTrace(endFunction) {
  var trace = sliceStackFrames(getRawStackTrace(endFunction), 1, 0);
  return new (TraceCollection.bind.apply(TraceCollection, __spreadArray([void 0], parseTrace(trace), false)))();
}
var Record = function () {
  function Record() {}
  Record.prototype.setRecordLevel = function (level) {
    Record.RECORD_LEVEL = level;
  };
  Record.prototype.setDisplayLevel = function (level) {
    Record.DISPLAY_LEVEL = level;
  };
  Record.log = function (message) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    return Record.recLog.apply(Record, __spreadArray([LoggerSchemes.log, message], args, false));
  };
  Record.verbose = function (message) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    return Record.recLog.apply(Record, __spreadArray([LoggerSchemes.debug, message], args, false));
  };
  Record.info = function (message) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    return Record.recLog.apply(Record, __spreadArray([LoggerSchemes.info, message], args, false));
  };
  Record.warn = function (message) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    return Record.recLog.apply(Record, __spreadArray([LoggerSchemes.warn, message], args, false));
  };
  Record.error = function (message) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    return Record.recLog.apply(Record, __spreadArray([LoggerSchemes.error, message], args, false));
  };
  Record.trace = function (data, format) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    var trace = sliceStackFrames(getRawStackTrace(), 1, 0);
    var parsedTrace = new (TraceCollection.bind.apply(TraceCollection, __spreadArray([void 0], parseTrace(trace), false)))();
    return Record.recLog.apply(Record, __spreadArray([LoggerSchemes.trace, "".concat(data, "\n").concat(parsedTrace.toString(format))], args, false));
  };
  Record.recLog = function (scheme, data) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    data = util.format.apply(util, __spreadArray([data], args, false));
    data = "[".concat(scheme.displayName, "] [").concat(getCallerName(3), "]: ").concat(data);
    if (scheme.level >= Record.RECORD_LEVEL) {
      logStack.push(new LogStackFrame(data, scheme));
    }
    if (scheme.level >= Record.DISPLAY_LEVEL) {
      scheme.logFunction(data);
    }
    return data;
  };
  Record.RECORD_LEVEL = LogLevel.Debug;
  Record.DISPLAY_LEVEL = LogLevel.Debug;
  Record.debug = Record.verbose;
  return Record;
}();

function setToken(token) {
  var regResult = /([0-9a-f]*)/.exec(token);
  if (token.length !== 32) {
    return false;
  } else if (regResult === null) {
    return false;
  } else if (regResult[1] !== token) {
    return false;
  }
  TOKEN = token;
  return true;
}
function sendMessage(title, data) {
  var args = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments[_i];
  }
  data = util.format.apply(util, __spreadArray([data], args, false));
  return sendToRemote(title, data);
}
function sendLog(logs, title, clear) {
  logs = logs !== null && logs !== void 0 ? logs : logStack;
  title = title !== null && title !== void 0 ? title : 'logger';
  clear = clear !== null && clear !== void 0 ? clear : true;
  var isSend = sendToRemote(title, logs.toHtmlString());
  if (isSend && clear) {
    logs.clear();
  }
  return isSend;
}
function sliceStackFrames(stackTrace, start, end) {
  if (start === void 0) {
    start = 0;
  }
  if (end === void 0) {
    end = 0;
  }
  if (stackTrace === '') return '';
  var temp = stackTrace.split('\n');
  if (end <= 0) end = temp.length + end;
  if (start < 0) {
    start = 0;
  } else if (start > temp.length - 1) {
    start = temp.length - 1;
  }
  if (end > temp.length) {
    end = temp.length;
  } else if (end <= start) {
    return '';
  }
  temp = temp.slice(start, end);
  return temp.join('\n');
}
function parseTrace(originTrace) {
  var _a;
  var stack = [];
  var originStack = originTrace.split('\n');
  for (var _i = 0, originStack_1 = originStack; _i < originStack_1.length; _i++) {
    var item = originStack_1[_i];
    var result = /\:(\d+)(?: \((.*)\))?/.exec(item);
    stack.push(new TraceStackFrame(Number(result[1]) - 3, (_a = result[2]) !== null && _a !== void 0 ? _a : 'Anonymous functions'));
  }
  stack[stack.length - 1].setCallerName("Outer");
  return stack;
}
function sendToRemote(title, message) {
  if (TOKEN === null) {
    return false;
  }
  var res = http.post("http://www.pushplus.plus/send", {
    title: title,
    token: TOKEN,
    content: message,
    template: 'html'
  });
  return res.statusCode === 200;
}
function defaultFormatter(line, callerName) {
  return "  | at line ".concat(line, ", in <").concat(callerName, ">");
}
;// CONCATENATED MODULE: ./src/global.ts
var _a;


var VERSION = "0.1.0";
var LISTENER_INTERVAL = 100;
var SHORT_WAIT_MS = 300;
var LONG_WAIT_MS = 1000;
var EVENT = events.emitter();
var global_TOKEN = (_a = hamibot.env, _a.TOKEN),
  SHOW_CONSOLE = _a.SHOW_CONSOLE;
if (typeof global_TOKEN === "string" && setToken(global_TOKEN) == false) {
  throw new ConfigInvalidException("The 'Token' field in the configuration is invalid");
}
;// CONCATENATED MODULE: ./src/lib/exception.ts
var exception_extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();


EVENT.on("ERROR", function (err) {
  Record.error(err.toString());
});
var BaseException = function () {
  function BaseException(message) {
    this.traceFilter = undefined;
    this.traceFormatter = undefined;
    this.exceptionType = 'BaseException';
    this.message = message;
    var trace = getStackTrace();
    if (this.traceFilter) {
      trace = trace.filter(this.traceFilter);
    }
    this.traceBack = trace.toString(this.traceFormatter);
    EVENT.emit("ERROR", this);
  }
  BaseException.prototype.toString = function () {
    return "Traceback (most recent call last):\n" + this.traceBack + "\n" + this.exceptionType + (this.message ? ": " + this.message : "") + "\n";
  };
  return BaseException;
}();

var PermissionException = function (_super) {
  exception_extends(PermissionException, _super);
  function PermissionException(message) {
    var _this = _super.call(this, message) || this;
    _this.exceptionType = "PermissionException";
    return _this;
  }
  return PermissionException;
}(BaseException);

var ValueException = function (_super) {
  exception_extends(ValueException, _super);
  function ValueException(message) {
    var _this = _super.call(this, message) || this;
    _this.exceptionType = "ValueException";
    return _this;
  }
  return ValueException;
}(BaseException);

var ConfigInvalidException = function (_super) {
  exception_extends(ConfigInvalidException, _super);
  function ConfigInvalidException(message) {
    var _this = _super.call(this, message + ", please check it again !") || this;
    _this.exceptionType = "ConfigInvalidException";
    return _this;
  }
  return ConfigInvalidException;
}(ValueException);

;// CONCATENATED MODULE: ./src/lib/init.ts



function init() {
  Record.info("Launching...\n\nCurrent script version: ".concat(VERSION, "\n"));
  events.on("exit", function () {
    Record.info("Exit...");
  });
  if (auto.service === null) {
    if (!confirm('Please enable accessibility permission')) {
      throw new PermissionException("Accessibility permission obtaining failure.");
    }
    auto.waitFor();
  } else {
    Record.verbose("Accessibility permissions enabled");
  }
  if (device.height === 0 || device.width === 0) {
    Record.error('Failed to get the screen size. ' + 'Please try restarting the service or re-installing Hamibot');
    exit();
  } else {
    Record.verbose("Screen size: " + device.height + " x " + device.width);
  }
  if (SHOW_CONSOLE) {
    console.show();
    sleep(SHORT_WAIT_MS);
    console.setPosition(0, 100);
    console.setSize(device.width, device.height / 4);
  }
  setScreenMetrics(1080, 2400);
}
;// CONCATENATED MODULE: ./src/index.ts

init();
launchApp('微信');
alert('hello world !');
/******/ })()
;