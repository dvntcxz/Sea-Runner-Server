"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = __importDefault(require("../../../application/modules/DB/DB"));
const config_1 = __importDefault(require("../../../config"));
const User_1 = __importDefault(require("../../../application/modules/UserManager/User"));
function randomString(i) {
    var rnd = '';
    while (rnd.length < i)
        rnd += Math.random().toString(36).substring(2);
    return rnd.substring(0, i);
}
;
const initCb = () => { };
describe('User.registration', () => {
    const { DB_CONNECT } = new config_1.default;
    const db = new DB_1.default(Object.assign(Object.assign({}, DB_CONNECT), { initCb }));
    const user = new User_1.default('123', db);
    const newLogin = randomString(8);
    const password = randomString(8);
    const name = randomString(10);
    test('Регистрируем рандомного пользователя', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.registration(newLogin, password, name);
        expect(result).toEqual(true);
    }));
    test('Повторная регистрация', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.registration(newLogin, password, name);
        expect(result).toEqual(false);
    }));
    test('Попытка входа', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.auth(newLogin, password);
        expect(user.getClientData().token).not.toBeNull();
    }));
});
