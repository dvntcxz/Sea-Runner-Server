"use strict";
//const DB = require('../application/modules/DB/DB');
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
const DB_1 = __importDefault(require("../application/modules/DB/DB"));
const config_1 = __importDefault(require("../config"));
const initCb = () => {
};
describe('setUserToken', () => {
    const { DB_CONNECT } = new config_1.default;
    const db = new DB_1.default(Object.assign(Object.assign({}, DB_CONNECT), { initCb }));
    let user;
    test('Пользователь Test существует', () => __awaiter(void 0, void 0, void 0, function* () {
        user = yield db.getUserByLogin('test');
        expect(user.name).toEqual('Test');
    }));
    test('Токен изменяется на md5', () => __awaiter(void 0, void 0, void 0, function* () {
        const md5Token = Math.random().toString();
        yield db.setUserToken(user.id, md5Token);
        user = yield db.getUserByLogin('test');
        expect(user.token).toEqual(md5Token);
    }));
    test('Заменяем токен на null', () => __awaiter(void 0, void 0, void 0, function* () {
        yield db.setUserToken(user.id, null);
        user = yield db.getUserByLogin('test');
        expect(user.token).toEqual(null);
    }));
});
