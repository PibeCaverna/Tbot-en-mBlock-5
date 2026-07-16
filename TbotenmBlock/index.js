(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.unknown = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  !function (global) {
    "use strict";

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined;
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    var inModule = typeof module === "object";
    var runtime = global.regeneratorRuntime;

    if (runtime) {
      if (inModule) {
        module.exports = runtime;
      }

      return;
    }

    runtime = global.regeneratorRuntime = inModule ? module.exports || {} : {};

    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);
      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    runtime.wrap = wrap;

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    var ContinueSentinel = {};

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {}

    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }

    runtime.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    runtime.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;

        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    runtime.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return Promise.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return Promise.resolve(value).then(function (unwrapped) {
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }

      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    runtime.AsyncIterator = AsyncIterator;

    runtime.async = function (innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
      return runtime.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined) {
        context.delegate = null;

        if (context.method === "throw") {
          if (delegate.iterator.return) {
            context.method = "return";
            context.arg = undefined;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        context[delegate.resultName] = info.value;
        context.next = delegate.nextLoc;

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined;
        }
      } else {
        return info;
      }

      context.delegate = null;
      return ContinueSentinel;
    }

    defineIteratorMethods(Gp);
    Gp[toStringTagSymbol] = "Generator";

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    runtime.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse();
      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      }

      return {
        next: doneResult
      };
    }

    runtime.values = values;

    function doneResult() {
      return {
        value: undefined,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = this._sent = undefined;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },
      stop: function () {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            context.method = "next";
            context.arg = undefined;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function (record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        }

        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          this.arg = undefined;
        }

        return ContinueSentinel;
      }
    };
  }(function () {
    return this || typeof self === "object" && self;
  }() || Function("return this")());
  undefined;
  const disableBlocks = {
    debug: [],
    upload: []
  };
  const mustLoginBlocks = [];

  const triggerBlocksStatus = async (mode, app) => {};

  class ExtImpl {}

  const extTranslationMap = {
    "zh": {
      "tbot": "TBot",
      "extensionName": "TBot",
      "pgm_init": "Iniciar Programa",
      "AIN_SENSOR_FIELDMENU_1_0": "0",
      "AIN_SENSOR_FIELDMENU_1_1": "1",
      "AIN_SENSOR_FIELDMENU_1_2": "2",
      "AIN_SENSOR_FIELDMENU_1_3": "3",
      "AIN_SENSOR_FIELDMENU_1_4": "4",
      "AIN_SENSOR_FIELDMENU_1_5": "5",
      "ain_sensor": "Sensor [fieldMenu_1] ",
      "din_RUN": "Botón RUN",
      "PWM_MOTOR_MOTOR_0": "0",
      "PWM_MOTOR_MOTOR_1": "1",
      "pwm_motor": "Motor [motor] DC [duty_cycle] ",
      "DOUT_LED_ON_OFF_0": "encendidio",
      "DOUT_LED_ON_OFF_1": "apagado",
      "dout_led": "Led [on_off] ",
      "DIN_PB_DIG_SLCT_0": "9",
      "DIN_PB_DIG_SLCT_1": "10",
      "DIN_PB_DIG_SLCT_2": "11",
      "DIN_PB_DIG_SLCT_3": "12",
      "DIN_PB_DIG_STATUS_0": "Alto",
      "DIN_PB_DIG_STATUS_1": "Bajo",
      "din_pb": "Digital [dig_slct] [dig_status] ",
      "dout_pb": "Digital [dig_slct]",
      "tbot": "TBot"
    },
    "de": {
      "tbot": "TBot",
      "extensionName": "TBot",
      "pgm_init": "Iniciar Programa",
      "AIN_SENSOR_FIELDMENU_1_0": "0",
      "AIN_SENSOR_FIELDMENU_1_1": "1",
      "AIN_SENSOR_FIELDMENU_1_2": "2",
      "AIN_SENSOR_FIELDMENU_1_3": "3",
      "AIN_SENSOR_FIELDMENU_1_4": "4",
      "AIN_SENSOR_FIELDMENU_1_5": "5",
      "ain_sensor": "Sensor [fieldMenu_1] ",
      "din_RUN": "Botón RUN",
      "PWM_MOTOR_MOTOR_0": "0",
      "PWM_MOTOR_MOTOR_1": "1",
      "pwm_motor": "Motor [motor] DC [duty_cycle] ",
      "DOUT_LED_ON_OFF_0": "encendidio",
      "DOUT_LED_ON_OFF_1": "apagado",
      "dout_led": "Led [on_off] ",
      "DIN_PB_DIG_SLCT_0": "9",
      "DIN_PB_DIG_SLCT_1": "10",
      "DIN_PB_DIG_SLCT_2": "11",
      "DIN_PB_DIG_SLCT_3": "12",
      "DIN_PB_DIG_STATUS_0": "Alto",
      "DIN_PB_DIG_STATUS_1": "Bajo",
      "din_pb": "Digital [dig_slct] [dig_status] ",
      "dout_pb": "Digital [dig_slct]",
      "tbot": "TBot"
    },
    "es": {
      "tbot": "TBot",
      "extensionName": "TBot",
      "pgm_init": "Iniciar Programa",
      "AIN_SENSOR_FIELDMENU_1_0": "0",
      "AIN_SENSOR_FIELDMENU_1_1": "1",
      "AIN_SENSOR_FIELDMENU_1_2": "2",
      "AIN_SENSOR_FIELDMENU_1_3": "3",
      "AIN_SENSOR_FIELDMENU_1_4": "4",
      "AIN_SENSOR_FIELDMENU_1_5": "5",
      "ain_sensor": "Sensor [fieldMenu_1] ",
      "din_RUN": "Botón RUN",
      "PWM_MOTOR_MOTOR_0": "0",
      "PWM_MOTOR_MOTOR_1": "1",
      "pwm_motor": "Motor [motor] DC [duty_cycle] ",
      "DOUT_LED_ON_OFF_0": "encendidio",
      "DOUT_LED_ON_OFF_1": "apagado",
      "dout_led": "Led [on_off] ",
      "DIN_PB_DIG_SLCT_0": "9",
      "DIN_PB_DIG_SLCT_1": "10",
      "DIN_PB_DIG_SLCT_2": "11",
      "DIN_PB_DIG_SLCT_3": "12",
      "DIN_PB_DIG_STATUS_0": "Alto",
      "DIN_PB_DIG_STATUS_1": "Bajo",
      "din_pb": "Digital [dig_slct] [dig_status] ",
      "dout_pb": "Digital [dig_slct]",
      "tbot": "TBot"
    },
    "fr": {
      "tbot": "TBot",
      "extensionName": "TBot",
      "pgm_init": "Iniciar Programa",
      "AIN_SENSOR_FIELDMENU_1_0": "0",
      "AIN_SENSOR_FIELDMENU_1_1": "1",
      "AIN_SENSOR_FIELDMENU_1_2": "2",
      "AIN_SENSOR_FIELDMENU_1_3": "3",
      "AIN_SENSOR_FIELDMENU_1_4": "4",
      "AIN_SENSOR_FIELDMENU_1_5": "5",
      "ain_sensor": "Sensor [fieldMenu_1] ",
      "din_RUN": "Botón RUN",
      "PWM_MOTOR_MOTOR_0": "0",
      "PWM_MOTOR_MOTOR_1": "1",
      "pwm_motor": "Motor [motor] DC [duty_cycle] ",
      "DOUT_LED_ON_OFF_0": "encendidio",
      "DOUT_LED_ON_OFF_1": "apagado",
      "dout_led": "Led [on_off] ",
      "DIN_PB_DIG_SLCT_0": "9",
      "DIN_PB_DIG_SLCT_1": "10",
      "DIN_PB_DIG_SLCT_2": "11",
      "DIN_PB_DIG_SLCT_3": "12",
      "DIN_PB_DIG_STATUS_0": "Alto",
      "DIN_PB_DIG_STATUS_1": "Bajo",
      "din_pb": "Digital [dig_slct] [dig_status] ",
      "dout_pb": "Digital [dig_slct]",
      "tbot": "TBot"
    },
    "id": {
      "tbot": "TBot",
      "extensionName": "TBot",
      "pgm_init": "Iniciar Programa",
      "AIN_SENSOR_FIELDMENU_1_0": "0",
      "AIN_SENSOR_FIELDMENU_1_1": "1",
      "AIN_SENSOR_FIELDMENU_1_2": "2",
      "AIN_SENSOR_FIELDMENU_1_3": "3",
      "AIN_SENSOR_FIELDMENU_1_4": "4",
      "AIN_SENSOR_FIELDMENU_1_5": "5",
      "ain_sensor": "Sensor [fieldMenu_1] ",
      "din_RUN": "Botón RUN",
      "PWM_MOTOR_MOTOR_0": "0",
      "PWM_MOTOR_MOTOR_1": "1",
      "pwm_motor": "Motor [motor] DC [duty_cycle] ",
      "DOUT_LED_ON_OFF_0": "encendidio",
      "DOUT_LED_ON_OFF_1": "apagado",
      "dout_led": "Led [on_off] ",
      "DIN_PB_DIG_SLCT_0": "9",
      "DIN_PB_DIG_SLCT_1": "10",
      "DIN_PB_DIG_SLCT_2": "11",
      "DIN_PB_DIG_SLCT_3": "12",
      "DIN_PB_DIG_STATUS_0": "Alto",
      "DIN_PB_DIG_STATUS_1": "Bajo",
      "din_pb": "Digital [dig_slct] [dig_status] ",
      "dout_pb": "Digital [dig_slct]",
      "tbot": "TBot"
    },
    "ja": {
      "tbot": "TBot",
      "extensionName": "TBot",
      "pgm_init": "Iniciar Programa",
      "AIN_SENSOR_FIELDMENU_1_0": "0",
      "AIN_SENSOR_FIELDMENU_1_1": "1",
      "AIN_SENSOR_FIELDMENU_1_2": "2",
      "AIN_SENSOR_FIELDMENU_1_3": "3",
      "AIN_SENSOR_FIELDMENU_1_4": "4",
      "AIN_SENSOR_FIELDMENU_1_5": "5",
      "ain_sensor": "Sensor [fieldMenu_1] ",
      "din_RUN": "Botón RUN",
      "PWM_MOTOR_MOTOR_0": "0",
      "PWM_MOTOR_MOTOR_1": "1",
      "pwm_motor": "Motor [motor] DC [duty_cycle] ",
      "DOUT_LED_ON_OFF_0": "encendidio",
      "DOUT_LED_ON_OFF_1": "apagado",
      "dout_led": "Led [on_off] ",
      "DIN_PB_DIG_SLCT_0": "9",
      "DIN_PB_DIG_SLCT_1": "10",
      "DIN_PB_DIG_SLCT_2": "11",
      "DIN_PB_DIG_SLCT_3": "12",
      "DIN_PB_DIG_STATUS_0": "Alto",
      "DIN_PB_DIG_STATUS_1": "Bajo",
      "din_pb": "Digital [dig_slct] [dig_status] ",
      "dout_pb": "Digital [dig_slct]",
      "tbot": "TBot"
    },
    "ja-jph": {
      "tbot": "TBot",
      "extensionName": "TBot",
      "pgm_init": "Iniciar Programa",
      "AIN_SENSOR_FIELDMENU_1_0": "0",
      "AIN_SENSOR_FIELDMENU_1_1": "1",
      "AIN_SENSOR_FIELDMENU_1_2": "2",
      "AIN_SENSOR_FIELDMENU_1_3": "3",
      "AIN_SENSOR_FIELDMENU_1_4": "4",
      "AIN_SENSOR_FIELDMENU_1_5": "5",
      "ain_sensor": "Sensor [fieldMenu_1] ",
      "din_RUN": "Botón RUN",
      "PWM_MOTOR_MOTOR_0": "0",
      "PWM_MOTOR_MOTOR_1": "1",
      "pwm_motor": "Motor [motor] DC [duty_cycle] ",
      "DOUT_LED_ON_OFF_0": "encendidio",
      "DOUT_LED_ON_OFF_1": "apagado",
      "dout_led": "Led [on_off] ",
      "DIN_PB_DIG_SLCT_0": "9",
      "DIN_PB_DIG_SLCT_1": "10",
      "DIN_PB_DIG_SLCT_2": "11",
      "DIN_PB_DIG_SLCT_3": "12",
      "DIN_PB_DIG_STATUS_0": "Alto",
      "DIN_PB_DIG_STATUS_1": "Bajo",
      "din_pb": "Digital [dig_slct] [dig_status] ",
      "dout_pb": "Digital [dig_slct]",
      "tbot": "TBot"
    },
    "ko": {
      "tbot": "TBot",
      "extensionName": "TBot",
      "pgm_init": "Iniciar Programa",
      "AIN_SENSOR_FIELDMENU_1_0": "0",
      "AIN_SENSOR_FIELDMENU_1_1": "1",
      "AIN_SENSOR_FIELDMENU_1_2": "2",
      "AIN_SENSOR_FIELDMENU_1_3": "3",
      "AIN_SENSOR_FIELDMENU_1_4": "4",
      "AIN_SENSOR_FIELDMENU_1_5": "5",
      "ain_sensor": "Sensor [fieldMenu_1] ",
      "din_RUN": "Botón RUN",
      "PWM_MOTOR_MOTOR_0": "0",
      "PWM_MOTOR_MOTOR_1": "1",
      "pwm_motor": "Motor [motor] DC [duty_cycle] ",
      "DOUT_LED_ON_OFF_0": "encendidio",
      "DOUT_LED_ON_OFF_1": "apagado",
      "dout_led": "Led [on_off] ",
      "DIN_PB_DIG_SLCT_0": "9",
      "DIN_PB_DIG_SLCT_1": "10",
      "DIN_PB_DIG_SLCT_2": "11",
      "DIN_PB_DIG_SLCT_3": "12",
      "DIN_PB_DIG_STATUS_0": "Alto",
      "DIN_PB_DIG_STATUS_1": "Bajo",
      "din_pb": "Digital [dig_slct] [dig_status] ",
      "dout_pb": "Digital [dig_slct]",
      "tbot": "TBot"
    },
    "pl": {
      "tbot": "TBot",
      "extensionName": "TBot",
      "pgm_init": "Iniciar Programa",
      "AIN_SENSOR_FIELDMENU_1_0": "0",
      "AIN_SENSOR_FIELDMENU_1_1": "1",
      "AIN_SENSOR_FIELDMENU_1_2": "2",
      "AIN_SENSOR_FIELDMENU_1_3": "3",
      "AIN_SENSOR_FIELDMENU_1_4": "4",
      "AIN_SENSOR_FIELDMENU_1_5": "5",
      "ain_sensor": "Sensor [fieldMenu_1] ",
      "din_RUN": "Botón RUN",
      "PWM_MOTOR_MOTOR_0": "0",
      "PWM_MOTOR_MOTOR_1": "1",
      "pwm_motor": "Motor [motor] DC [duty_cycle] ",
      "DOUT_LED_ON_OFF_0": "encendidio",
      "DOUT_LED_ON_OFF_1": "apagado",
      "dout_led": "Led [on_off] ",
      "DIN_PB_DIG_SLCT_0": "9",
      "DIN_PB_DIG_SLCT_1": "10",
      "DIN_PB_DIG_SLCT_2": "11",
      "DIN_PB_DIG_SLCT_3": "12",
      "DIN_PB_DIG_STATUS_0": "Alto",
      "DIN_PB_DIG_STATUS_1": "Bajo",
      "din_pb": "Digital [dig_slct] [dig_status] ",
      "dout_pb": "Digital [dig_slct]",
      "tbot": "TBot"
    },
    "uk": {
      "tbot": "TBot",
      "extensionName": "TBot",
      "pgm_init": "Iniciar Programa",
      "AIN_SENSOR_FIELDMENU_1_0": "0",
      "AIN_SENSOR_FIELDMENU_1_1": "1",
      "AIN_SENSOR_FIELDMENU_1_2": "2",
      "AIN_SENSOR_FIELDMENU_1_3": "3",
      "AIN_SENSOR_FIELDMENU_1_4": "4",
      "AIN_SENSOR_FIELDMENU_1_5": "5",
      "ain_sensor": "Sensor [fieldMenu_1] ",
      "din_RUN": "Botón RUN",
      "PWM_MOTOR_MOTOR_0": "0",
      "PWM_MOTOR_MOTOR_1": "1",
      "pwm_motor": "Motor [motor] DC [duty_cycle] ",
      "DOUT_LED_ON_OFF_0": "encendidio",
      "DOUT_LED_ON_OFF_1": "apagado",
      "dout_led": "Led [on_off] ",
      "DIN_PB_DIG_SLCT_0": "9",
      "DIN_PB_DIG_SLCT_1": "10",
      "DIN_PB_DIG_SLCT_2": "11",
      "DIN_PB_DIG_SLCT_3": "12",
      "DIN_PB_DIG_STATUS_0": "Alto",
      "DIN_PB_DIG_STATUS_1": "Bajo",
      "din_pb": "Digital [dig_slct] [dig_status] ",
      "dout_pb": "Digital [dig_slct]",
      "tbot": "TBot"
    },
    "zh-hant": {
      "tbot": "TBot",
      "extensionName": "TBot",
      "pgm_init": "Iniciar Programa",
      "AIN_SENSOR_FIELDMENU_1_0": "0",
      "AIN_SENSOR_FIELDMENU_1_1": "1",
      "AIN_SENSOR_FIELDMENU_1_2": "2",
      "AIN_SENSOR_FIELDMENU_1_3": "3",
      "AIN_SENSOR_FIELDMENU_1_4": "4",
      "AIN_SENSOR_FIELDMENU_1_5": "5",
      "ain_sensor": "Sensor [fieldMenu_1] ",
      "din_RUN": "Botón RUN",
      "PWM_MOTOR_MOTOR_0": "0",
      "PWM_MOTOR_MOTOR_1": "1",
      "pwm_motor": "Motor [motor] DC [duty_cycle] ",
      "DOUT_LED_ON_OFF_0": "encendidio",
      "DOUT_LED_ON_OFF_1": "apagado",
      "dout_led": "Led [on_off] ",
      "DIN_PB_DIG_SLCT_0": "9",
      "DIN_PB_DIG_SLCT_1": "10",
      "DIN_PB_DIG_SLCT_2": "11",
      "DIN_PB_DIG_SLCT_3": "12",
      "DIN_PB_DIG_STATUS_0": "Alto",
      "DIN_PB_DIG_STATUS_1": "Bajo",
      "din_pb": "Digital [dig_slct] [dig_status] ",
      "dout_pb": "Digital [dig_slct]",
      "tbot": "TBot"
    },
    "nl": {
      "tbot": "TBot",
      "extensionName": "TBot",
      "pgm_init": "Iniciar Programa",
      "AIN_SENSOR_FIELDMENU_1_0": "0",
      "AIN_SENSOR_FIELDMENU_1_1": "1",
      "AIN_SENSOR_FIELDMENU_1_2": "2",
      "AIN_SENSOR_FIELDMENU_1_3": "3",
      "AIN_SENSOR_FIELDMENU_1_4": "4",
      "AIN_SENSOR_FIELDMENU_1_5": "5",
      "ain_sensor": "Sensor [fieldMenu_1] ",
      "din_RUN": "Botón RUN",
      "PWM_MOTOR_MOTOR_0": "0",
      "PWM_MOTOR_MOTOR_1": "1",
      "pwm_motor": "Motor [motor] DC [duty_cycle] ",
      "DOUT_LED_ON_OFF_0": "encendidio",
      "DOUT_LED_ON_OFF_1": "apagado",
      "dout_led": "Led [on_off] ",
      "DIN_PB_DIG_SLCT_0": "9",
      "DIN_PB_DIG_SLCT_1": "10",
      "DIN_PB_DIG_SLCT_2": "11",
      "DIN_PB_DIG_SLCT_3": "12",
      "DIN_PB_DIG_STATUS_0": "Alto",
      "DIN_PB_DIG_STATUS_1": "Bajo",
      "din_pb": "Digital [dig_slct] [dig_status] ",
      "dout_pb": "Digital [dig_slct]",
      "tbot": "TBot"
    },
    "it": {
      "tbot": "TBot",
      "extensionName": "TBot",
      "pgm_init": "Iniciar Programa",
      "AIN_SENSOR_FIELDMENU_1_0": "0",
      "AIN_SENSOR_FIELDMENU_1_1": "1",
      "AIN_SENSOR_FIELDMENU_1_2": "2",
      "AIN_SENSOR_FIELDMENU_1_3": "3",
      "AIN_SENSOR_FIELDMENU_1_4": "4",
      "AIN_SENSOR_FIELDMENU_1_5": "5",
      "ain_sensor": "Sensor [fieldMenu_1] ",
      "din_RUN": "Botón RUN",
      "PWM_MOTOR_MOTOR_0": "0",
      "PWM_MOTOR_MOTOR_1": "1",
      "pwm_motor": "Motor [motor] DC [duty_cycle] ",
      "DOUT_LED_ON_OFF_0": "encendidio",
      "DOUT_LED_ON_OFF_1": "apagado",
      "dout_led": "Led [on_off] ",
      "DIN_PB_DIG_SLCT_0": "9",
      "DIN_PB_DIG_SLCT_1": "10",
      "DIN_PB_DIG_SLCT_2": "11",
      "DIN_PB_DIG_SLCT_3": "12",
      "DIN_PB_DIG_STATUS_0": "Alto",
      "DIN_PB_DIG_STATUS_1": "Bajo",
      "din_pb": "Digital [dig_slct] [dig_status] ",
      "dout_pb": "Digital [dig_slct]",
      "tbot": "TBot"
    },
    "hr": {
      "tbot": "TBot",
      "extensionName": "TBot",
      "pgm_init": "Iniciar Programa",
      "AIN_SENSOR_FIELDMENU_1_0": "0",
      "AIN_SENSOR_FIELDMENU_1_1": "1",
      "AIN_SENSOR_FIELDMENU_1_2": "2",
      "AIN_SENSOR_FIELDMENU_1_3": "3",
      "AIN_SENSOR_FIELDMENU_1_4": "4",
      "AIN_SENSOR_FIELDMENU_1_5": "5",
      "ain_sensor": "Sensor [fieldMenu_1] ",
      "din_RUN": "Botón RUN",
      "PWM_MOTOR_MOTOR_0": "0",
      "PWM_MOTOR_MOTOR_1": "1",
      "pwm_motor": "Motor [motor] DC [duty_cycle] ",
      "DOUT_LED_ON_OFF_0": "encendidio",
      "DOUT_LED_ON_OFF_1": "apagado",
      "dout_led": "Led [on_off] ",
      "DIN_PB_DIG_SLCT_0": "9",
      "DIN_PB_DIG_SLCT_1": "10",
      "DIN_PB_DIG_SLCT_2": "11",
      "DIN_PB_DIG_SLCT_3": "12",
      "DIN_PB_DIG_STATUS_0": "Alto",
      "DIN_PB_DIG_STATUS_1": "Bajo",
      "din_pb": "Digital [dig_slct] [dig_status] ",
      "dout_pb": "Digital [dig_slct]",
      "tbot": "TBot"
    },
    "ru": {
      "tbot": "TBot",
      "extensionName": "TBot",
      "pgm_init": "Iniciar Programa",
      "AIN_SENSOR_FIELDMENU_1_0": "0",
      "AIN_SENSOR_FIELDMENU_1_1": "1",
      "AIN_SENSOR_FIELDMENU_1_2": "2",
      "AIN_SENSOR_FIELDMENU_1_3": "3",
      "AIN_SENSOR_FIELDMENU_1_4": "4",
      "AIN_SENSOR_FIELDMENU_1_5": "5",
      "ain_sensor": "Sensor [fieldMenu_1] ",
      "din_RUN": "Botón RUN",
      "PWM_MOTOR_MOTOR_0": "0",
      "PWM_MOTOR_MOTOR_1": "1",
      "pwm_motor": "Motor [motor] DC [duty_cycle] ",
      "DOUT_LED_ON_OFF_0": "encendidio",
      "DOUT_LED_ON_OFF_1": "apagado",
      "dout_led": "Led [on_off] ",
      "DIN_PB_DIG_SLCT_0": "9",
      "DIN_PB_DIG_SLCT_1": "10",
      "DIN_PB_DIG_SLCT_2": "11",
      "DIN_PB_DIG_SLCT_3": "12",
      "DIN_PB_DIG_STATUS_0": "Alto",
      "DIN_PB_DIG_STATUS_1": "Bajo",
      "din_pb": "Digital [dig_slct] [dig_status] ",
      "dout_pb": "Digital [dig_slct]",
      "tbot": "TBot"
    },
    "pt": {
      "tbot": "TBot",
      "extensionName": "TBot",
      "pgm_init": "Iniciar Programa",
      "AIN_SENSOR_FIELDMENU_1_0": "0",
      "AIN_SENSOR_FIELDMENU_1_1": "1",
      "AIN_SENSOR_FIELDMENU_1_2": "2",
      "AIN_SENSOR_FIELDMENU_1_3": "3",
      "AIN_SENSOR_FIELDMENU_1_4": "4",
      "AIN_SENSOR_FIELDMENU_1_5": "5",
      "ain_sensor": "Sensor [fieldMenu_1] ",
      "din_RUN": "Botón RUN",
      "PWM_MOTOR_MOTOR_0": "0",
      "PWM_MOTOR_MOTOR_1": "1",
      "pwm_motor": "Motor [motor] DC [duty_cycle] ",
      "DOUT_LED_ON_OFF_0": "encendidio",
      "DOUT_LED_ON_OFF_1": "apagado",
      "dout_led": "Led [on_off] ",
      "DIN_PB_DIG_SLCT_0": "9",
      "DIN_PB_DIG_SLCT_1": "10",
      "DIN_PB_DIG_SLCT_2": "11",
      "DIN_PB_DIG_SLCT_3": "12",
      "DIN_PB_DIG_STATUS_0": "Alto",
      "DIN_PB_DIG_STATUS_1": "Bajo",
      "din_pb": "Digital [dig_slct] [dig_status] ",
      "dout_pb": "Digital [dig_slct]",
      "tbot": "TBot"
    },
    "fi": {
      "tbot": "TBot",
      "extensionName": "TBot",
      "pgm_init": "Iniciar Programa",
      "AIN_SENSOR_FIELDMENU_1_0": "0",
      "AIN_SENSOR_FIELDMENU_1_1": "1",
      "AIN_SENSOR_FIELDMENU_1_2": "2",
      "AIN_SENSOR_FIELDMENU_1_3": "3",
      "AIN_SENSOR_FIELDMENU_1_4": "4",
      "AIN_SENSOR_FIELDMENU_1_5": "5",
      "ain_sensor": "Sensor [fieldMenu_1] ",
      "din_RUN": "Botón RUN",
      "PWM_MOTOR_MOTOR_0": "0",
      "PWM_MOTOR_MOTOR_1": "1",
      "pwm_motor": "Motor [motor] DC [duty_cycle] ",
      "DOUT_LED_ON_OFF_0": "encendidio",
      "DOUT_LED_ON_OFF_1": "apagado",
      "dout_led": "Led [on_off] ",
      "DIN_PB_DIG_SLCT_0": "9",
      "DIN_PB_DIG_SLCT_1": "10",
      "DIN_PB_DIG_SLCT_2": "11",
      "DIN_PB_DIG_SLCT_3": "12",
      "DIN_PB_DIG_STATUS_0": "Alto",
      "DIN_PB_DIG_STATUS_1": "Bajo",
      "din_pb": "Digital [dig_slct] [dig_status] ",
      "dout_pb": "Digital [dig_slct]",
      "tbot": "TBot"
    },
    "tr": {
      "tbot": "TBot",
      "extensionName": "TBot",
      "pgm_init": "Iniciar Programa",
      "AIN_SENSOR_FIELDMENU_1_0": "0",
      "AIN_SENSOR_FIELDMENU_1_1": "1",
      "AIN_SENSOR_FIELDMENU_1_2": "2",
      "AIN_SENSOR_FIELDMENU_1_3": "3",
      "AIN_SENSOR_FIELDMENU_1_4": "4",
      "AIN_SENSOR_FIELDMENU_1_5": "5",
      "ain_sensor": "Sensor [fieldMenu_1] ",
      "din_RUN": "Botón RUN",
      "PWM_MOTOR_MOTOR_0": "0",
      "PWM_MOTOR_MOTOR_1": "1",
      "pwm_motor": "Motor [motor] DC [duty_cycle] ",
      "DOUT_LED_ON_OFF_0": "encendidio",
      "DOUT_LED_ON_OFF_1": "apagado",
      "dout_led": "Led [on_off] ",
      "DIN_PB_DIG_SLCT_0": "9",
      "DIN_PB_DIG_SLCT_1": "10",
      "DIN_PB_DIG_SLCT_2": "11",
      "DIN_PB_DIG_SLCT_3": "12",
      "DIN_PB_DIG_STATUS_0": "Alto",
      "DIN_PB_DIG_STATUS_1": "Bajo",
      "din_pb": "Digital [dig_slct] [dig_status] ",
      "dout_pb": "Digital [dig_slct]",
      "tbot": "TBot"
    },
    "tk": {
      "tbot": "TBot",
      "extensionName": "TBot",
      "pgm_init": "Iniciar Programa",
      "AIN_SENSOR_FIELDMENU_1_0": "0",
      "AIN_SENSOR_FIELDMENU_1_1": "1",
      "AIN_SENSOR_FIELDMENU_1_2": "2",
      "AIN_SENSOR_FIELDMENU_1_3": "3",
      "AIN_SENSOR_FIELDMENU_1_4": "4",
      "AIN_SENSOR_FIELDMENU_1_5": "5",
      "ain_sensor": "Sensor [fieldMenu_1] ",
      "din_RUN": "Botón RUN",
      "PWM_MOTOR_MOTOR_0": "0",
      "PWM_MOTOR_MOTOR_1": "1",
      "pwm_motor": "Motor [motor] DC [duty_cycle] ",
      "DOUT_LED_ON_OFF_0": "encendidio",
      "DOUT_LED_ON_OFF_1": "apagado",
      "dout_led": "Led [on_off] ",
      "DIN_PB_DIG_SLCT_0": "9",
      "DIN_PB_DIG_SLCT_1": "10",
      "DIN_PB_DIG_SLCT_2": "11",
      "DIN_PB_DIG_SLCT_3": "12",
      "DIN_PB_DIG_STATUS_0": "Alto",
      "DIN_PB_DIG_STATUS_1": "Bajo",
      "din_pb": "Digital [dig_slct] [dig_status] ",
      "dout_pb": "Digital [dig_slct]",
      "tbot": "TBot"
    },
    "en": {
      "tbot": "TBot",
      "extensionName": "TBot",
      "pgm_init": "Iniciar Programa",
      "AIN_SENSOR_FIELDMENU_1_0": "0",
      "AIN_SENSOR_FIELDMENU_1_1": "1",
      "AIN_SENSOR_FIELDMENU_1_2": "2",
      "AIN_SENSOR_FIELDMENU_1_3": "3",
      "AIN_SENSOR_FIELDMENU_1_4": "4",
      "AIN_SENSOR_FIELDMENU_1_5": "5",
      "ain_sensor": "Sensor [fieldMenu_1] ",
      "din_RUN": "Botón RUN",
      "PWM_MOTOR_MOTOR_0": "0",
      "PWM_MOTOR_MOTOR_1": "1",
      "pwm_motor": "Motor [motor] DC [duty_cycle] ",
      "DOUT_LED_ON_OFF_0": "encendidio",
      "DOUT_LED_ON_OFF_1": "apagado",
      "dout_led": "Led [on_off] ",
      "DIN_PB_DIG_SLCT_0": "9",
      "DIN_PB_DIG_SLCT_1": "10",
      "DIN_PB_DIG_SLCT_2": "11",
      "DIN_PB_DIG_SLCT_3": "12",
      "DIN_PB_DIG_STATUS_0": "Alto",
      "DIN_PB_DIG_STATUS_1": "Bajo",
      "din_pb": "Digital [dig_slct] [dig_status] ",
      "dout_pb": "Digital [dig_slct]",
      "tbot": "TBot"
    }
  };
  const codeSnippets = {
    arduinoc: {}
  };
  const extGenerators = [{
    lang: 'arduinoc',
    template: `// generated by mBlock5 for <your product>
// codes make you happy

//( include //)
#include <Arduino.h>
//( lib //)

//({
    this.$ALL_VARIABLES.length==0?'':this.$ALL_VARIABLES.map(v=>"float "+v+" = 0;").join('\\n')
}//)

//( declare //)


void _delay(float seconds) {
  long endTime = millis() + seconds * 1000;
  while(millis() < endTime) _loop();
}

//(
void setup() {
  //( setup //)
  //( code //)
}
//)

void _loop() {
  //( _loop //)
}

void loop() {
  _loop();
}`,
    splitor: {
      frame: {
        left: "//(",
        right: "//)"
      },
      expression: {
        left: "/*{",
        right: "}*/"
      }
    },
    reducers: [{
      name: 'include',
      reduce: codes => {
        let codes1 = [];

        for (let code of codes) {
          let codeStr = '';

          if (typeof code === 'string') {
            codeStr = code;
          } else if (typeof code === 'function') {
            codeStr = code();
          }

          if (codes1.indexOf(codeStr) === -1) {
            codes1.push(codeStr);
          }
        }

        if (codes1.length === 0) {
          return undefined;
        }

        return codes1.map(code => {
          return '#include ' + code;
        }).join('\n') + '\n';
      }
    }]
  }];
  const extSources = {
    arduino: []
  };
  const extFacePanels = {};
  const ExtHandler = {
    onLoad: function onLoad(app, target) {
      const that = this;

      if (!that.__workerSetupInstance) {
        that.__workerSetupInstance = that.workerSetup({
          app
        }).then(() => {
          that.worker.remote.runExtension('onLoad', target.id);
        });
      }
    },
    onUnload: function onUnload(app) {
      this.__workerSetupInstance = null;
      this.worker.remote.runExtension('onUnload');
      this.worker.dispose();
    },
    onConnect: function onConnect(app, device) {
      this.worker.remote.runExtension('onConnect', device.id);
    },
    onDisconnect: function onDisconnect(app, device) {
      this.worker.remote.runExtension('onDisconnect', device.id);
    },
    onStopAll: function onStopAll(app, device) {
      this.worker.remote.runExtension('onStopAll', device.id);
    },
    beforeChangeUploadMode: function beforeChangeUploadMode(app, device) {
      return this.worker.remote.runExtension('beforeChangeUploadMode', device.id);
    },
    beforeChangeDebugMode: function beforeChangeDebugMode(app, device) {
      return this.worker.remote.runExtension('beforeChangeDebugMode', device.id);
    },
    afterChangeUploadMode: function afterChangeUploadMode(app, device) {
      this.worker.remote.runExtension('afterChangeUploadMode', device.id);
    },
    afterChangeDebugMode: function afterChangeDebugMode(app, device) {
      this.worker.remote.runExtension('afterChangeDebugMode', device.id);
    },
    onSelect: function onSelect(app, device) {
      if (!this.worker) {
        setTimeout(() => {
          this.onSelect(app, device);
        }, 200);
        return;
      }

      this.worker.remote.runExtension('onSelect', device.id);
    },
    onUnselect: function onUnselect(app, device) {
      this.worker.remote.runExtension('onUnselect', device.id);
    },
    beforeCodeUpload: function beforeCodeUpload(app, device) {
      this.worker.remote.runExtension('beforeCodeUpload', device.id);
    },
    afterCodeUpload: function afterCodeUpload(app, device) {
      this.worker.remote.runExtension('afterCodeUpload', device.id);
    },
    onRead: function onRead(app, device) {
      this.worker.remote.runExtension('onRead', device.id);
    },
    beforeFirmwareUpdate: function beforeFirmwareUpdate(app, device) {
      this.worker.remote.runExtension('beforeFirmwareUpdate', device.id);
    },
    afterFirmwareUpdate: function afterFirmwareUpdate(app, device) {
      this.worker.remote.runExtension('afterFirmwareUpdate', device.id);
    }
  };

  class ExtTbot {
    constructor() {
      this.checkFirmwareInForce = typeof checkFirmwareInForce !== 'undefined' ? checkFirmwareInForce : false;
      const handlerProxyUrl = window.MbApi.getExtResPath('tbot/handlerProxy.js', 'tbot');
      const that = this;

      that.workerSetup = async function (exports) {
        that.worker = await window.__web_worker_rpc.create(handlerProxyUrl, exports).then(worker => {
          worker.CONFIG.TIMEOUT = 42000;
          worker.CONFIG.HEARTBEAT = 4200;

          worker.onFail = () => {
            that.worker = null;
            that.workerSetup(exports);
            const app = exports.app;

            if (app) {
              app.workspace.resetEvents();
            }
          };

          return worker;
        });
      };

      this.funcs = {
        'pgm_init': {
          onRun: (args, app, device, block) => {
            return this.worker.remote.runBlock('pgm_init', 'onRun', device.id, {
              id: block.id,
              opcode: block.opcode,
              arguments: block.arguments
            }, Object.assign({}, args));
          },
          onAdd: (app, device, block) => {
            this.worker.remote.runBlock('pgm_init', 'onAdd', device.id, {
              id: block.id,
              opcode: block.opcode,
              arguments: block.arguments
            });
          },
          onRemove: (app, device, block) => {
            this.worker.remote.runBlock('pgm_init', 'onRemove', device.id, {
              id: block.id,
              opcode: block.opcode,
              arguments: block.arguments
            });
          }
        },
        'ain_sensor': {
          onRun: (args, app, device, block) => {
            return this.worker.remote.runBlock('ain_sensor', 'onRun', device.id, {
              id: block.id,
              opcode: block.opcode,
              arguments: block.arguments
            }, Object.assign({}, args));
          }
        },
        'din_RUN': {
          onRun: (args, app, device, block) => {
            return this.worker.remote.runBlock('din_RUN', 'onRun', device.id, {
              id: block.id,
              opcode: block.opcode,
              arguments: block.arguments
            }, Object.assign({}, args));
          }
        },
        'pwm_motor': {
          onRun: (args, app, device, block) => {
            return this.worker.remote.runBlock('pwm_motor', 'onRun', device.id, {
              id: block.id,
              opcode: block.opcode,
              arguments: block.arguments
            }, Object.assign({}, args));
          }
        },
        'dout_led': {
          onRun: (args, app, device, block) => {
            return this.worker.remote.runBlock('dout_led', 'onRun', device.id, {
              id: block.id,
              opcode: block.opcode,
              arguments: block.arguments
            }, Object.assign({}, args));
          }
        },
        'din_pb': {
          onRun: (args, app, device, block) => {
            return this.worker.remote.runBlock('din_pb', 'onRun', device.id, {
              id: block.id,
              opcode: block.opcode,
              arguments: block.arguments
            }, Object.assign({}, args));
          }
        },
        'dout_pb': {
          onRun: (args, app, device, block) => {
            return this.worker.remote.runBlock('dout_pb', 'onRun', device.id, {
              id: block.id,
              opcode: block.opcode,
              arguments: block.arguments
            }, Object.assign({}, args));
          }
        },
        'dataVariableCodesCode': [`get_variable('{VARIABLE}')`, 0]
      };
    }

    getInfo() {
      return {
        "id": "tbot",
        "targets": {
          "device": true,
          "name": "tbot",
          "icon": window.MbApi.getExtResPath('tbot/imgs/lALPBE1XYi3KSRXNAUDNAUA_320_320.png', 'tbot'),
          "enableCode": true,
          "enableUpload": ["serialport", "ble"],
          "enableOnline": ["serialport", "ble"],
          "shouldConnect": ["serialport", "ble"],
          "defaultOnline": false,
          "options": {
            "connect": {
              "ble": {
                "channel": "1"
              },
              "serialport": {
                "baudRate": "115200",
                "vendorId": "0x7523"
              }
            },
            "upload": {
              "middlewares": [{
                "name": "arduino",
                "params": {
                  "sources": extSources.arduino
                }
              }]
            },
            "firmware": {}
          },
          "settings": [],
          "categoriesOrder": ["tbot", "events", "control", "operators", "data", "myBlocks"]
        },
        "codeTypes": ["arduinoc"],
        "version": "0.0.0",
        "platform": ["mblockpc", "mblockweb"],
        "categories": [{
          "name": "tbot",
          "colors": ["#4A90E2", "#3080DE", "#2171CF"],
          "menuIconURI": "",
          "blockIcon": null,
          "blocks": [{
            "opcode": "pgm_init",
            "blockType": "hat",
            "checkboxInFlyout": false,
            "hidden": false,
            "gap": 12,
            "arguments": {},
            "branchCount": 0,
            "platform": ["mblockpc", "mblockweb"],
            "handler": this.funcs.pgm_init
          }, {
            "opcode": "ain_sensor",
            "blockType": "number",
            "checkboxInFlyout": false,
            "hidden": false,
            "gap": 12,
            "arguments": {
              "fieldMenu_1": {
                "type": "fieldMenu",
                "defaultValue": "0",
                "menu": "AIN_SENSOR_FIELDMENU_1"
              }
            },
            "branchCount": 0,
            "platform": ["mblockpc", "mblockweb"],
            "handler": this.funcs.ain_sensor
          }, {
            "opcode": "din_RUN",
            "blockType": "boolean",
            "checkboxInFlyout": false,
            "hidden": false,
            "gap": 12,
            "arguments": {},
            "branchCount": 0,
            "platform": ["mblockpc", "mblockweb"],
            "handler": this.funcs.din_RUN
          }, {
            "opcode": "pwm_motor",
            "blockType": "command",
            "checkboxInFlyout": false,
            "hidden": false,
            "gap": 12,
            "arguments": {
              "motor": {
                "type": "fieldMenu",
                "defaultValue": "0",
                "menu": "PWM_MOTOR_MOTOR"
              },
              "duty_cycle": {
                "type": "number",
                "defaultValue": 100
              }
            },
            "branchCount": 0,
            "platform": ["mblockpc", "mblockweb"],
            "handler": this.funcs.pwm_motor
          }, {
            "opcode": "dout_led",
            "blockType": "command",
            "checkboxInFlyout": false,
            "hidden": false,
            "gap": 12,
            "arguments": {
              "on_off": {
                "type": "fieldMenu",
                "defaultValue": "apagado",
                "menu": "DOUT_LED_ON_OFF"
              }
            },
            "branchCount": 0,
            "platform": ["mblockpc", "mblockweb"],
            "handler": this.funcs.dout_led
          }, {
            "opcode": "din_pb",
            "blockType": "command",
            "checkboxInFlyout": false,
            "hidden": false,
            "gap": 12,
            "arguments": {
              "dig_slct": {
                "type": "fieldMenu",
                "defaultValue": "9",
                "menu": "DIN_PB_DIG_SLCT"
              },
              "dig_status": {
                "type": "fieldMenu",
                "defaultValue": "Bajo",
                "menu": "DIN_PB_DIG_STATUS"
              }
            },
            "branchCount": 0,
            "platform": ["mblockpc", "mblockweb"],
            "handler": this.funcs.din_pb
          }, {
            "opcode": "dout_pb",
            "blockType": "boolean",
            "checkboxInFlyout": false,
            "hidden": false,
            "gap": 12,
            "arguments": {
              "dig_slct": {
                "type": "fieldMenu",
                "defaultValue": "9",
                "menu": "DIN_PB_DIG_SLCT"
              }
            },
            "branchCount": 0,
            "platform": ["mblockpc", "mblockweb"],
            "handler": this.funcs.dout_pb
          }],
          "menus": {
            "AIN_SENSOR_FIELDMENU_1": [{
              "text": "AIN_SENSOR_FIELDMENU_1_0",
              "value": "0"
            }, {
              "text": "AIN_SENSOR_FIELDMENU_1_1",
              "value": "1"
            }, {
              "text": "AIN_SENSOR_FIELDMENU_1_2",
              "value": "2"
            }, {
              "text": "AIN_SENSOR_FIELDMENU_1_3",
              "value": "3"
            }, {
              "text": "AIN_SENSOR_FIELDMENU_1_4",
              "value": "4"
            }, {
              "text": "AIN_SENSOR_FIELDMENU_1_5",
              "value": "5"
            }],
            "PWM_MOTOR_MOTOR": [{
              "text": "PWM_MOTOR_MOTOR_0",
              "value": "0"
            }, {
              "text": "PWM_MOTOR_MOTOR_1",
              "value": "1"
            }],
            "DOUT_LED_ON_OFF": [{
              "text": "DOUT_LED_ON_OFF_0",
              "value": "encendidio"
            }, {
              "text": "DOUT_LED_ON_OFF_1",
              "value": "apagado"
            }],
            "DIN_PB_DIG_SLCT": [{
              "text": "DIN_PB_DIG_SLCT_0",
              "value": "9"
            }, {
              "text": "DIN_PB_DIG_SLCT_1",
              "value": "10"
            }, {
              "text": "DIN_PB_DIG_SLCT_2",
              "value": "11"
            }, {
              "text": "DIN_PB_DIG_SLCT_3",
              "value": "12"
            }],
            "DIN_PB_DIG_STATUS": [{
              "text": "DIN_PB_DIG_STATUS_0",
              "value": "Alto"
            }, {
              "text": "DIN_PB_DIG_STATUS_1",
              "value": "Bajo"
            }]
          }
        }, {
          "name": "events",
          "colors": ["#FFBF00", "#E6AC00", "#CC9900"],
          "menuIconURI": "",
          "blockIcon": null,
          "blocks": [{
            "opcode": "event_broadcastandwait",
            "blockType": "command",
            "checkboxInFlyout": false,
            "gap": 12,
            "arguments": {
              "BROADCAST_INPUT": {
                "type": "inputVariable"
              }
            },
            "branchCount": 0,
            "codes": {
              "python": {
                "code": `broadcast('{BROADCAST_INPUT}')`
              }
            }
          }, {
            "opcode": "event_whenbroadcastreceived",
            "blockType": "hat",
            "checkboxInFlyout": false,
            "gap": 12,
            "arguments": {
              "BROADCAST_OPTION": {
                "type": "inputVariable"
              }
            },
            "branchCount": 0,
            "codes": {
              "python": {
                "code": `if message == \"{BROADCAST_OPTION}\":\n  {$BRANCH}`
              }
            }
          }, {
            "opcode": "event_broadcast",
            "blockType": "command",
            "checkboxInFlyout": false,
            "gap": 12,
            "arguments": {
              "BROADCAST_INPUT": {
                "type": "inputVariable"
              }
            },
            "branchCount": 0,
            "codes": {
              "python": {
                "code": `broadcast('{BROADCAST_INPUT}')`
              }
            }
          }],
          "menus": {}
        }, {
          "name": "control",
          "colors": ["#FFAB19", "#FCA000", "#E08E00"],
          "menuIconURI": "",
          "blockIcon": null,
          "blocks": [{
            "opcode": "control_stop",
            "blockType": "command",
            "checkboxInFlyout": false,
            "gap": 12,
            "arguments": {
              "TYPE": {
                "type": "fieldMenu",
                "defaultValue": "all",
                "menu": "CONTROL_STOP_TYPE"
              }
            },
            "branchCount": 0
          }],
          "menus": {
            "CONTROL_STOP_TYPE": [{
              "text": "CONTROL_STOP_TYPE_0",
              "value": "all"
            }, {
              "text": "CONTROL_STOP_TYPE_1",
              "value": "this script"
            }, {
              "text": "CONTROL_STOP_TYPE_2",
              "value": "other scripts in sprite"
            }]
          }
        }, {
          "name": "operators",
          "colors": ["#59C059", "#46B746", "#3EA33E"],
          "menuIconURI": "",
          "blockIcon": null,
          "blocks": [],
          "menus": {}
        }, {
          "name": "data",
          "colors": ["#FF8C1A", "#FD7E00", "#E17000"],
          "menuIconURI": "",
          "blockIcon": null,
          "blocks": [{
            "opcode": "data_changevariableby",
            "blockType": "command",
            "checkboxInFlyout": false,
            "gap": 12,
            "arguments": {
              "VARIABLE": {
                "type": "fieldVariable",
                "defaultValue": "",
                "menu": "DATA_CHANGEVARIABLEBY_VARIABLE"
              },
              "VALUE": {
                "type": "number",
                "defaultValue": 1
              }
            },
            "branchCount": 0,
            "codes": {
              "python": {
                "code": `set_variable('{VARIABLE}', get_variable('{VARIABLE}') + {VALUE})`
              }
            }
          }, {
            "opcode": "data_setvariableto",
            "blockType": "command",
            "checkboxInFlyout": false,
            "gap": 12,
            "arguments": {
              "VARIABLE": {
                "type": "fieldVariable",
                "defaultValue": "",
                "menu": "DATA_CHANGEVARIABLEBY_VARIABLE"
              },
              "VALUE": {
                "type": "number",
                "defaultValue": 0
              }
            },
            "branchCount": 0,
            "codes": {
              "python": {
                "code": `set_variable('{VARIABLE}', {VALUE})`
              }
            }
          }, {
            "opcode": "data_variable",
            "blockType": "number",
            "checkboxInFlyout": true,
            "gap": 12,
            "arguments": {
              "VARIABLE": {
                "type": "fieldVariable",
                "defaultValue": "",
                "menu": "DATA_CHANGEVARIABLEBY_VARIABLE"
              }
            },
            "branchCount": 0,
            "codes": {
              "python": {
                "code": this.funcs.dataVariableCodesCode
              }
            }
          }],
          "menus": {
            "DATA_CHANGEVARIABLEBY_VARIABLE": [{
              "text": "DATA_CHANGEVARIABLEBY_VARIABLE_0",
              "value": ""
            }]
          }
        }, {
          "name": "myBlocks",
          "colors": ["#FF6680", "#FF4262", "#FF1F45"],
          "menuIconURI": "",
          "blockIcon": null,
          "blocks": [],
          "menus": {}
        }],
        "generators": extGenerators,
        "translationMap": extTranslationMap,
        "snippets": codeSnippets,
        "excludeBlocks": ["event_whenflagclicked", "event_whenkeypressed", "event_whengreaterthan", "event_whenthisspriteclicked", "event_whenbackdropswitchesto", "control_start_as_clone", "control_create_clone_of", "control_delete_this_clone", "control_stop", "event_whenbroadcastreceived", "event_broadcast", "event_broadcastandwait"],
        "generatorStartBlocks": [],
        "feature": ["worker"],
        "mustLoginBlocks": [],
        "disabledOffline": [],
        "disabledOnline": []
      };
    }

    getHandler() {
      if (typeof ExtHandler === 'object') {
        return ExtHandler;
      } else if (typeof ExtHandler === 'function') {
        return new ExtHandler();
      }
    }

  }

  var _default = ExtTbot;
  _exports.default = _default;
});