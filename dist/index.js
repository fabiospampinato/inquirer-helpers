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
var cliWidth = require("cli-width");
var truncate = require("cli-truncate");
var inquirer = require("inquirer");
/* INQUIRER HELPERS */
var InquirerHelpers = {
    /* VARIABLES */
    PAGE_SIZE: 10,
    CLI_WIDTH: 80,
    /* HELPERS */
    _cliWidth: function (available) {
        if (available === void 0) { available = true; }
        return cliWidth({ defaultWidth: InquirerHelpers.CLI_WIDTH }) + (available ? -6 : 0); // Accounting for inquirer's characters too
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
            var maxWidth, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        maxWidth = InquirerHelpers._cliWidth();
                        list.map(function (entry) {
                            if (_.isString(entry)) {
                                return truncate(entry, maxWidth);
                            }
                            else if (_.isPlainObject(entry) && entry.name) {
                                entry.name = truncate(entry.name, maxWidth);
                            }
                            return entry;
                        });
                        /* END OF LIST */
                        if (list.length > InquirerHelpers.PAGE_SIZE)
                            list.push(new inquirer.Separator('\n'));
                        return [4 /*yield*/, inquirer.prompt({
                                type: 'list',
                                name: 'result',
                                choices: list,
                                pageSize: InquirerHelpers.PAGE_SIZE,
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
    table: function (message, table, values, colors, fallback) {
        if (colors === void 0) { colors = []; }
        return __awaiter(this, void 0, void 0, function () {
            var maxWidth, maxLenghts_1, overflowColumn, maxColumn_1, list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        maxWidth = InquirerHelpers._cliWidth();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLFlBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiwwQkFBNEI7QUFDNUIsNkJBQStCO0FBQy9CLG9DQUFzQztBQUN0Qyx1Q0FBeUM7QUFDekMsbUNBQXFDO0FBRXJDLHNCQUFzQjtBQUV0QixJQUFNLGVBQWUsR0FBRztJQUV0QixlQUFlO0lBRWYsU0FBUyxFQUFFLEVBQUU7SUFDYixTQUFTLEVBQUUsRUFBRTtJQUViLGFBQWE7SUFFYixTQUFTLFlBQUcsU0FBeUI7UUFBekIsMEJBQUEsRUFBQSxnQkFBeUI7UUFFbkMsTUFBTSxDQUFDLFFBQVEsQ0FBRSxFQUFFLFlBQVksRUFBRSxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFFLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFDLDJDQUEyQztJQUVySSxDQUFDO0lBRUQsU0FBUztJQUVILE9BQU8sWUFBRyxPQUFlLEVBQUUsUUFBeUI7UUFBekIseUJBQUEsRUFBQSxnQkFBeUI7Ozs7OzRCQUV2QyxxQkFBTSxRQUFRLENBQUMsTUFBTSxDQUFFOzRCQUN0QyxJQUFJLEVBQUUsU0FBUzs0QkFDZixJQUFJLEVBQUUsUUFBUTs0QkFDZCxPQUFPLFNBQUE7NEJBQ1AsT0FBTyxFQUFFLFFBQVE7eUJBQ2xCLENBQUMsRUFBQTs7d0JBTEssTUFBTSxHQUFJLENBQUEsU0FLZixDQUFBLE9BTFc7d0JBT2Isc0JBQU8sQ0FBQyxDQUFDLE1BQU0sRUFBQzs7OztLQUVqQjtJQUVLLEtBQUssWUFBRyxPQUFlOzs7OzRCQUVwQixxQkFBTSxlQUFlLENBQUMsSUFBSSxDQUFHLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBRSxFQUFBOzRCQUE1RCxzQkFBTyxDQUFBLFNBQXFELE1BQUssS0FB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