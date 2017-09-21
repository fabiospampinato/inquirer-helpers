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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLFlBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiwwQkFBNEI7QUFDNUIsNkJBQStCO0FBQy9CLG1DQUFxQztBQUNyQyx1Q0FBeUM7QUFDekMsd0NBQTBDO0FBRTFDLHNCQUFzQjtBQUV0QixJQUFNLGVBQWUsR0FBRztJQUV0QixlQUFlO0lBRWYsVUFBVSxFQUFFLElBQUk7SUFDaEIsU0FBUyxFQUFFLEVBQUU7SUFDYixTQUFTLEVBQUUsRUFBRTtJQUViLGFBQWE7SUFFYixTQUFTO1FBRVAsSUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRyxDQUFDO1FBRS9CLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDO0lBRXZELENBQUM7SUFFRCxZQUFZO1FBRVYsSUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRyxFQUN4QixNQUFNLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFFbEUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUcsTUFBTSxHQUFHLENBQUMsRUFBRSxlQUFlLENBQUMsVUFBVSxHQUFHLFFBQVEsR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFFLENBQUM7SUFFcEcsQ0FBQztJQUVELFNBQVM7SUFFSCxPQUFPLFlBQUcsT0FBZSxFQUFFLFFBQXlCO1FBQXpCLHlCQUFBLEVBQUEsZ0JBQXlCOzs7Ozs0QkFFdkMscUJBQU0sUUFBUSxDQUFDLE1BQU0sQ0FBRTs0QkFDdEMsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsSUFBSSxFQUFFLFFBQVE7NEJBQ2QsT0FBTyxTQUFBOzRCQUNQLE9BQU8sRUFBRSxRQUFRO3lCQUNsQixDQUFDLEVBQUE7O3dCQUxLLE1BQU0sR0FBSSxDQUFBLFNBS2YsQ0FBQSxPQUxXO3dCQU9iLHNCQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUM7Ozs7S0FFakI7SUFFSyxLQUFLLFlBQUcsT0FBZTs7Ozs0QkFFcEIscUJBQU0sZUFBZSxDQUFDLElBQUksQ0FBRyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUUsRUFBQTs0QkFBNUQsc0JBQU8sQ0FBQSxTQUFxRCxNQUFLLEtBQUssRUFBQzs7OztLQUV4RTtJQUVLLEtBQUssWUFBRyxPQUFlOzs7OzRCQUVwQixxQkFBTSxlQUFlLENBQUMsSUFBSSxDQUFHLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBRSxFQUFBOzRCQUE1RCxzQkFBTyxDQUFBLFNBQXFELE1BQUssS0FBSyxFQUFDOzs7O0tBRXhFO0lBRUssS0FBSyxZQUFHLE9BQWUsRUFBRSxRQUFTOzs7Ozs0QkFFckIscUJBQU0sUUFBUSxDQUFDLE1BQU0sQ0FBRTs0QkFDdEMsSUFBSSxFQUFFLE9BQU87NEJBQ2IsSUFBSSxFQUFFLFFBQVE7NEJBQ2QsT0FBTyxTQUFBOzRCQUNQLE9BQU8sRUFBRSxRQUFROzRCQUNqQixRQUFRLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUcsUUFBUSxDQUFFLElBQUksQ0FBRSxDQUFDLENBQUMsUUFBUSxDQUFHLENBQUMsQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFHLENBQUUsRUFBbEUsQ0FBa0U7eUJBQ2xGLENBQUMsRUFBQTs7d0JBTkssTUFBTSxHQUFJLENBQUEsU0FNZixDQUFBLE9BTlc7d0JBUWIsc0JBQU8sTUFBTSxFQUFDOzs7O0tBRWY7SUFFSyxJQUFJLFlBQUcsT0FBZSxFQUFFLElBQVcsRUFBRSxRQUFTOzs7Ozs7d0JBSTVDLFFBQVEsR0FBRyxlQUFlLENBQUMsU0FBUyxFQUFHLEdBQUcsQ0FBQyxDQUFDO3dCQUVsRCxJQUFJLENBQUMsR0FBRyxDQUFHLFVBQUEsS0FBSzs0QkFDZCxFQUFFLENBQUMsQ0FBRSxDQUFDLENBQUMsUUFBUSxDQUFHLEtBQUssQ0FBRyxDQUFDLENBQUMsQ0FBQztnQ0FDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBRyxLQUFLLENBQUMsSUFBSSxFQUFHLEVBQUUsUUFBUSxDQUFFLENBQUM7NEJBQzlDLENBQUM7NEJBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUMsQ0FBQyxhQUFhLENBQUcsS0FBSyxDQUFFLElBQUksS0FBSyxDQUFDLElBQUssQ0FBQyxDQUFDLENBQUM7Z0NBQ3JELEtBQUssQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFHLEVBQUUsUUFBUSxDQUFFLENBQUM7NEJBQ3pELENBQUM7NEJBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQzt3QkFDZixDQUFDLENBQUMsQ0FBQzt3QkFJRyxRQUFRLEdBQUcsZUFBZSxDQUFDLFlBQVksRUFBRyxDQUFDO3dCQUVqRCxFQUFFLENBQUMsQ0FBRSxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVMsQ0FBQzs0QkFBQyxJQUFJLENBQUMsSUFBSSxDQUFHLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBRyxJQUFJLENBQUUsQ0FBRSxDQUFDO3dCQUkzRCxxQkFBTSxRQUFRLENBQUMsTUFBTSxDQUFFO2dDQUN0QyxJQUFJLEVBQUUsTUFBTTtnQ0FDWixJQUFJLEVBQUUsUUFBUTtnQ0FDZCxPQUFPLEVBQUUsSUFBSTtnQ0FDYixRQUFRLFVBQUE7Z0NBQ1IsT0FBTyxTQUFBO2dDQUNQLE9BQU8sRUFBRSxRQUFRO2dDQUNqQixRQUFRLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUcsUUFBUSxDQUFFLElBQUksQ0FBRSxDQUFDLENBQUMsUUFBUSxDQUFHLENBQUMsQ0FBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUcsQ0FBRSxFQUFoRSxDQUFnRTs2QkFDaEYsQ0FBQyxFQUFBOzt3QkFSSyxNQUFNLEdBQUksQ0FBQSxTQVFmLENBQUEsT0FSVzt3QkFVYixzQkFBTyxNQUFNLEVBQUM7Ozs7S0FFZjtJQUVLLEtBQUssWUFBRyxPQUFlLEVBQUUsS0FBaUIsRUFBRSxNQUFhLEVBQUUsTUFBa0IsRUFBRSxRQUFTO1FBQTdCLHVCQUFBLEVBQUEsV0FBa0I7Ozs7Ozt3QkFJM0UsUUFBUSxHQUFHLGVBQWUsQ0FBQyxTQUFTLEVBQUcsR0FBRyxDQUFDLENBQUM7d0JBRWxELEtBQUssQ0FBQyxHQUFHLENBQUcsVUFBQSxHQUFHLElBQUksUUFBQyxRQUFRLENBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBRSxTQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUcsQ0FBQyxDQUFFLEdBQWxELENBQW1ELENBQUUsQ0FBQzt3QkFFekUsZ0JBQWdCO3dCQUVoQixFQUFFLENBQUMsQ0FBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUUsQ0FBQyxDQUFDLENBQUM7NEJBSXBCLGVBQWEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBRyxVQUFFLEdBQUcsRUFBRSxLQUFLLElBQU0sT0FBQSxDQUFDLENBQUMsR0FBRyxDQUFHLEtBQUssQ0FBQyxHQUFHLENBQUcsVUFBQSxHQUFHLElBQUksT0FBQSxNQUFNLENBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFFLENBQUMsTUFBTSxFQUE1QixDQUE0QixDQUFFLENBQUUsRUFBM0QsQ0FBMkQsQ0FBRSxFQUMzRyxjQUFjLEdBQUcsWUFBVSxDQUFDLFNBQVMsQ0FBRyxVQUFFLE1BQU0sRUFBRSxLQUFLLElBQU0sT0FBQSxDQUFFLENBQUMsQ0FBQyxHQUFHLENBQUcsWUFBVSxDQUFDLEtBQUssQ0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBRSxDQUFFLEdBQUcsQ0FBRSxLQUFLLEdBQUcsQ0FBQyxDQUFFLENBQUUsR0FBRyxRQUFRLEVBQTFFLENBQTBFLENBQUUsRUFDekksY0FBWSxjQUFjLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUcsQ0FBQyxFQUFFLGNBQWMsR0FBRyxDQUFDLENBQUUsR0FBRyxZQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs0QkFFbkcsZUFBZTs0QkFFZixLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBRyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxLQUFLLENBQUcsQ0FBQyxFQUFFLFdBQVMsR0FBRyxDQUFDLENBQUMsRUFBN0IsQ0FBNkIsQ0FBRSxDQUFDOzRCQUUzRCxhQUFhOzRCQUViLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFHLFVBQUEsR0FBRztnQ0FDckIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUcsVUFBRSxHQUFHLEVBQUUsS0FBSztvQ0FDM0IsSUFBTSxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyxVQUFVLEdBQUcsUUFBUSxDQUFDO29DQUNoRCxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFFLEdBQUcsRUFBRSxZQUFVLENBQUMsS0FBSyxDQUFDLENBQUUsQ0FBQztnQ0FDNUMsQ0FBQyxDQUFDLENBQUM7NEJBQ0wsQ0FBQyxDQUFDLENBQUM7NEJBRUgsY0FBYzs0QkFFZCxFQUFFLENBQUMsQ0FBRSxNQUFNLENBQUMsTUFBTyxDQUFDLENBQUMsQ0FBQztnQ0FFcEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUcsVUFBQSxHQUFHO29DQUNyQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBRyxVQUFFLEdBQUcsRUFBRSxLQUFLO3dDQUMzQixJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7d0NBQzVCLEVBQUUsQ0FBQyxDQUFFLENBQUMsS0FBTSxDQUFDOzRDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7d0NBQ3pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUUsR0FBRyxDQUFFLENBQUM7b0NBQzdCLENBQUMsQ0FBQyxDQUFDO2dDQUNMLENBQUMsQ0FBQyxDQUFDOzRCQUVMLENBQUM7d0JBRUgsQ0FBQzt3QkFJSyxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBRyxVQUFFLEdBQUcsRUFBRSxLQUFLLElBQU0sT0FBQSxDQUFDOzRCQUMxQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsT0FBSyxHQUFHLENBQUMsSUFBSSxDQUFHLEtBQUssQ0FBRSxPQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDM0QsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUc7NEJBQ3JCLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDO3lCQUNyQixDQUFDLEVBSnlDLENBSXpDLENBQUMsQ0FBQzt3QkFFRyxxQkFBTSxlQUFlLENBQUMsSUFBSSxDQUFHLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFFLEVBQUE7NEJBQTdELHNCQUFPLFNBQXNELEVBQUM7Ozs7S0FFL0Q7Q0FFRixDQUFDO0FBRUYsWUFBWTtBQUVaLGtCQUFlLGVBQWUsQ0FBQyJ9