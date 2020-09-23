import crypto from "crypto";
export namespace hashGenerator {
  /**
   *
   * @function getSignedUrl
   * @param {string} _path
   * @returns
   */
  export function injectHash(_body: any) {
    try {

      // only hexadecimal digits
      _body.id = crypto.createHash("RSA-SHA1").update(Math.random().toString(36).substr(2, 5)).digest("hex").toString();
      _body.dateCreated = new Date();
      return _body;

    } catch (_error) {
      return "error";
    }
  }
  export function getUniqueHash(length?: number) {
    try {

      // only hexadecimal digits
      return crypto.createHash("RSA-SHA1").update(Math.random().toString(length || 36).substr(2, 5)).digest("hex").toString();

    } catch (_error) {
      return "error";
    }
  }
}
