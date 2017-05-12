const expect = require('expect');
// import isRealString
const {isRealString} = require('./validation')

//isRealString
describe('isRealString', () => {
  it('should reject non-string values', () => {
    let numberEntry = isRealString(12451225);
    expect(numberEntry).toBe(false);
  });

  it('should reject string with only spaces', () => {
    let whiteSpaceString = isRealString('                 ')
    expect(whiteSpaceString).toBe(false);
  });

  it('should reject and empty string', () => {
    let emptyString = isRealString("");
    expect(emptyString).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    let validString = isRealString("Karen Korlta");
    expect(validString).toBe(true);
  });
});
