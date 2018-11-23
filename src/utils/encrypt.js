/**
 * @author jay
 * @Date: 2017-11-13
 * @description encrypt util
 */

import CryptoJS from "crypto-js";
import NodeRSA from "node-rsa";

export const md5 = str => CryptoJS.MD5(str).toString();

/**
 * 加密方法
 * @param {待加密} s
 */
function ency(s) {
  // object to string
  if (typeof s === "object") {
    s = JSON.stringify(s);
  }

  // 生成3des密钥
  const letter = "abcdefghijkllmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let key = "";
  for (var i = 0; i < 24; i++) {
    key += letter.charAt(parseInt(Math.random() * letter.length, 10));
  }
  // 使用3des加密 通过base64加密  key是密钥字符串
  let base64 = CryptoJS.enc.Utf8.parse(key);
  let encrypted = CryptoJS.TripleDES.encrypt(s, base64, {
    iv: CryptoJS.enc.Utf8.parse("01234567"),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  let public_key = `-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDUH1uKEWWXNwa7waAISVNjwm2k
  I1KNNhJun0TgD7fgcozMCui27IoAZOIrvVb77nwSOIZZyznVA82aHGyAxKWziKCl
  mQMSNU0hxJQR0Kho/UsWdbCiUIUYBSzy77rBHlVzoOE/QOngjeJP3xauu2/wJ1Di
  uFZiERfoS7Htb10zdwIDAQAB
  -----END PUBLIC KEY-----`;

  let clientKey = new NodeRSA(public_key);
  clientKey.setOptions({ encryptionScheme: "pkcs1" });
  let rsaKey = clientKey.encrypt(key, "base64");

  return {
    key: rsaKey,
    str: encrypted.toString()
  };
}

export default ency;

export function dency(key, s) {
  let private_key = `-----BEGIN RSA PRIVATE KEY-----
    MIICXQIBAAKBgQDUH1uKEWWXNwa7waAISVNjwm2kI1KNNhJun0TgD7fgcozMCui2
    7IoAZOIrvVb77nwSOIZZyznVA82aHGyAxKWziKClmQMSNU0hxJQR0Kho/UsWdbCi
    UIUYBSzy77rBHlVzoOE/QOngjeJP3xauu2/wJ1DiuFZiERfoS7Htb10zdwIDAQAB
    AoGBAMLQDcUO1yt6eO+lEzGpDjH3lbSCUEWqXGFGWv4g0XIMIi0e871UHiXggStE
    mAeGbmJZkWIUWAe/l2srIaddcwN0UymR4nexbgaVVbI7eO+gmUigGkntUZMqa22r
    3JQdlqXM/gto2dBeWyQ2JTbMLBvmxOzC0al/lAb4zQr5OENRAkEA8xmLP9eHXjK1
    TvqGv1C01Q8dLGtsr6EX9r57kCcg+d/tmFxhwNFLPqBEO0QqqYLCHXpjetGK7vRy
    1D7VlDemeQJBAN9g/nwmGIADtPeylG7HFoHqMfn0rHiCCXBpWn4PDAjNE1DN0MrD
    9ZK3h/Y16Sj6xvgwA2lm/4I0ca6SZweO7W8CQQC7lPhYOO0hiKtS2Anl0lbXGKSA
    RBxHoVymbvFVmHvflCT4LkDX0ifnmS9NNBpfVqCGsovUl6BHJqT8lcekaRSxAkAu
    +1+LDRgqFJ2DW3QMuKLrQC6yu9tqnS8PDZmS2edWEov1etRnUT/dU+ysxDn9/IDM
    wox1JsymvhEK/o/c7xrRAkBeMw2Ci/gRX9KfH5eeVEkq+IHMSMtnOwSv3uK1kuW3
    P63umg5ssnMWJYq6RxqyNJwNA66czQf7U9sPSjVTQDaW
    -----END RSA PRIVATE KEY-----`;

  let clientKey = new NodeRSA(private_key);
  clientKey.setOptions({ encryptionScheme: "pkcs1" });
  console.log(clientKey.isPrivate());
  let rsaKey = clientKey.decrypt(key, "utf8");

  rsaKey = CryptoJS.enc.Utf8.parse(rsaKey);
  var Dencrypted = CryptoJS.TripleDES.decrypt(s, rsaKey, {
    iv: CryptoJS.enc.Utf8.parse("01234567"),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  console.log("解密：", Dencrypted.toString(CryptoJS.enc.Utf8));
  let v = Dencrypted.toString(CryptoJS.enc.Utf8);

  try {
    v = JSON.parse(v);
  } catch (error) {
    console.log("oop error");
  }

  return v;
}
