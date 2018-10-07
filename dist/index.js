"use strict";
/* IMPORT */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var chalk = require("chalk");
var inquirer = require("inquirer");
var truncate = require("cli-truncate");
var windowSize = require("window-size");
/* INQUIRER HELPERS */
var InquirerHelpers = {
    /* VARIABLES */
    FULLSCREEN: true,
    PAGE_SIZE: 10,
    CLI_WIDTH: 80,
    /* HELPERS */
    _cliWidth: function () {
        var size = windowSize.get();
        return size ? size.width : InquirerHelpers.CLI_WIDTH;
    },
    _cliPageSize: function () {
        var size = windowSize.get(), height = size ? size.height : InquirerHelpers.PAGE_SIZE + 2;
        return Math.min(height - 2, InquirerHelpers.FULLSCREEN ? Infinity : InquirerHelpers.PAGE_SIZE);
    },
    /* API */
    confirm: function (message, fallback) {
        if (fallback === void 0) { fallback = false; }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, inquirer.prompt({
                            type: 'confirm',
                            name: 'result',
                            message: message,
                            default: fallback
                        })];
                    case 1:
                        result = (_a.sent()).result;
                        return [2 /*return*/, !!result];
                }
            });
        });
    },
    noYes: function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, InquirerHelpers.list(message, ['No', 'Yes'])];
                    case 1: return [2 /*return*/, (_a.sent()) === 'Yes'];
                }
            });
        });
    },
    yesNo: function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, InquirerHelpers.list(message, ['Yes', 'No'])];
                    case 1: return [2 /*return*/, (_a.sent()) === 'Yes'];
                }
            });
        });
    },
    input: function (message, fallback) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, inquirer.prompt({
                            type: 'input',
                            name: 'result',
                            message: message,
                            default: fallback,
                            validate: function (x) { return !_.isUndefined(fallback) || (_.isString(x) && !!x.trim()); }
                        })];
                    case 1:
                        result = (_a.sent()).result;
                        return [2 /*return*/, result];
                }
            });
        });
    },
    list: function (message, list, fallback) {
        return __awaiter(this, void 0, void 0, function () {
            var maxWidth, pageSize, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        maxWidth = InquirerHelpers._cliWidth() - 3;
                        list.map(function (entry) {
                            if (_.isString(entry)) {
                                return truncate(entry.trim(), maxWidth);
                            }
                            else if (_.isPlainObject(entry) && entry.name) {
                                entry.name = truncate(entry.name.trim(), maxWidth);
                            }
                            return entry;
                        });
                        pageSize = InquirerHelpers._cliPageSize();
                        if (list.length > pageSize)
                            list.push(new inquirer.Separator('\n'));
                        return [4 /*yield*/, inquirer.prompt({
                                type: 'list',
                                name: 'result',
                                choices: list,
                                pageSize: pageSize,
                                message: message,
                                default: fallback,
                                validate: function (x) { return !_.isUndefined(fallback) || (_.isString(x) && x.trim()); }
                            })];
                    case 1:
                        result = (_a.sent()).result;
                        return [2 /*return*/, result];
                }
            });
        });
    },
    checkbox: function (message, list, fallback) {
        return __awaiter(this, void 0, void 0, function () {
            var maxWidth, pageSize, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        maxWidth = InquirerHelpers._cliWidth() - 3;
                        list.map(function (entry) {
                            if (_.isString(entry)) {
                                return truncate(entry.trim(), maxWidth);
                            }
                            else if (_.isPlainObject(entry) && entry.name) {
                                entry.name = truncate(entry.name.trim(), maxWidth);
                            }
                            return entry;
                        });
                        pageSize = InquirerHelpers._cliPageSize();
                        if (list.length > pageSize)
                            list.push(new inquirer.Separator('\n'));
                        return [4 /*yield*/, inquirer.prompt({
                                type: 'checkbox',
                                name: 'result',
                                choices: list,
                                pageSize: pageSize,
                                message: message,
                                default: fallback,
                                validate: function (x) { return !_.isUndefined(fallback) || !!x.length; }
                            })];
                    case 1:
                        result = (_a.sent()).result;
                        return [2 /*return*/, result];
                }
            });
        });
    },
    table: function (message, table, values, colors, fallback) {
        if (colors === void 0) { colors = []; }
        return __awaiter(this, void 0, void 0, function () {
            var maxWidth, maxLenghts_1, overflowColumn, maxColumn_1, list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        maxWidth = InquirerHelpers._cliWidth() - 7;
                        table.map(function (row) { return [truncate(row[0], maxWidth)].concat(row.slice(1)); });
                        /* FORMATTING */
                        if (table[0].length > 1) {
                            maxLenghts_1 = table[0].map(function (val, index) { return _.max(table.map(function (row) { return String(row[index]).length; })); }), overflowColumn = maxLenghts_1.findIndex(function (length, index) { return (_.sum(maxLenghts_1.slice(0, index + 1)) + (index * 4)) > maxWidth; }), maxColumn_1 = overflowColumn >= 0 ? Math.max(0, overflowColumn - 1) : maxLenghts_1.length - 1;
                            /* FILTERING */
                            table = table.map(function (row) { return row.slice(0, maxColumn_1 + 1); });
                            /* PADDING */
                            table = table.map(function (row) {
                                return row.map(function (val, index) {
                                    var padFN = index > 0 ? 'padStart' : 'padEnd';
                                    return _[padFN](val, maxLenghts_1[index]);
                                });
                            });
                            /* COLORIZE */
                            if (colors.length) {
                                table = table.map(function (row) {
                                    return row.map(function (val, index) {
                                        var color = colors[index];
                                        if (!color)
                                            return val;
                                        return chalk[color](val);
                                    });
                                });
                            }
                        }
                        list = table.map(function (row, index) { return ({
                            name: row.length > 1 ? "| " + row.join(' | ') + " |" : row[0],
                            short: row[0].trim(),
                            value: values[index]
                        }); });
                        return [4 /*yield*/, InquirerHelpers.list(message, list, fallback)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
};
/* EXPORT */
exports.default = InquirerHelpers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLFlBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiwwQkFBNEI7QUFDNUIsNkJBQStCO0FBQy9CLG1DQUFxQztBQUNyQyx1Q0FBeUM7QUFDekMsd0NBQTBDO0FBRTFDLHNCQUFzQjtBQUV0QixJQUFNLGVBQWUsR0FBRztJQUV0QixlQUFlO0lBRWYsVUFBVSxFQUFFLElBQUk7SUFDaEIsU0FBUyxFQUFFLEVBQUU7SUFDYixTQUFTLEVBQUUsRUFBRTtJQUViLGFBQWE7SUFFYixTQUFTO1FBRVAsSUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRyxDQUFDO1FBRS9CLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDO0lBRXZELENBQUM7SUFFRCxZQUFZO1FBRVYsSUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRyxFQUN4QixNQUFNLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFFbEUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUcsTUFBTSxHQUFHLENBQUMsRUFBRSxlQUFlLENBQUMsVUFBVSxHQUFHLFFBQVEsR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFFLENBQUM7SUFFcEcsQ0FBQztJQUVELFNBQVM7SUFFSCxPQUFPLFlBQUcsT0FBZSxFQUFFLFFBQXlCO1FBQXpCLHlCQUFBLEVBQUEsZ0JBQXlCOzs7Ozs0QkFFdkMscUJBQU0sUUFBUSxDQUFDLE1BQU0sQ0FBRTs0QkFDdEMsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsSUFBSSxFQUFFLFFBQVE7NEJBQ2QsT0FBTyxTQUFBOzRCQUNQLE9BQU8sRUFBRSxRQUFRO3lCQUNsQixDQUFD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