const expect = require('expect');
// import isRealString
const {isRealString} = require('./validation')

//isRealString
describe('isRealString', () => {
  it('should reject non-string values', () => {
    let numberEntry = 12451225

    expect(isRealString(numberEntry)).toBe(false);
  });

  it('should reject string with only spaces', () => {
    let whiteSpaceString = '                 '

    expect(isRealString(whiteSpaceString)).toBe(false);
  });

  it('should reject and empty string', () => {
    let emptyString = ""

    expect(isRealString(emptyString)).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    let emptyString = "Karen Korlta"

    expect(isRealString(emptyString)).toBe(true);
  });
});
