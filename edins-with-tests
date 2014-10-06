

  it('should be true if the array ends with the given object.', function () {
    endsWith(['a', 'b', {'c': 'd'}], {'c': 'd'}).should.be.true;
    endsWith(['a', 'b', {'c': 'd'}], {}).should.be.false;
    endsWith(['a', 'b', {'c': 'd'}], 'd').should.be.false;
  });
  
  it('should be true if the array ends with the given array of strings.', function () {
    endsWith(['a', 'b', ['c', 'd', 'e']], ['c', 'd', 'e']).should.be.true;
    endsWith(['a', 'b', ['q', 'w', 'e']], ['c', 'd', 'e']).should.be.false;
    endsWith(['a', 'b', 'c', ['c']).should.be.false;
  });
  
  it('should be true if the array ends with the given array of object(s).', function () {
    endsWith(['a', 'b', [{'c': 'd'}]], [{'c': 'd'}]).should.be.true;
    endsWith(['a', 'b', [{'q': 'w'}, {'e': 'f'}]], [{'q': 'w'}, {'e': 'f'}]).should.be.true;
    endsWith(['a', 'b', [{'q': 'w'}, {'e': 'f'}]], [{'e': 'f'}, {'q': 'w'}]).should.be.true;
    endsWith(['a', 'b', [{'q': 'w'}, {'e': 'f'}]], [{'e': 'f'}]).should.be.false;
  });
