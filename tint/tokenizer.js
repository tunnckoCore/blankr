function Tokenizer() {
  this.input = '';
  this.tokens = {};
  this.tokenExpr = null;
  this.tokenNames = [];
}
Tokenizer.prototype.addToken = function(name, expression) {
  this.tokens[name] = expression;
};
Tokenizer.prototype.tokenize = function(input) {
  this.input = input;
  var tokenExpr = [];
  for (var tokenName in this.tokens) {
    this.tokenNames.push(tokenName);
    tokenExpr.push('(' + this.tokens[tokenName] + ')');
  }
  this.tokenExpr = new RegExp(tokenExpr.join('|'), 'g');
};
Tokenizer.prototype.getToken = function() {
  var match = this.tokenExpr.exec(this.input);
  if (!match) return null;
  for (var c = 1; c < match.length; c++) {
    if (!match[c]) continue;
    return {
      name: this.tokenNames[c - 1],
      pos: match.index,
      data: match[c]
    };
  }
};
var tokenizer = new Tokenizer();
tokenizer.addToken('number', '[0-9]+');
tokenizer.addToken('for', 'for\\b');
tokenizer.addToken('identifier', '[a-zA-Z]+');
tokenizer.addToken('dot', '\\.');
tokenizer.addToken('comma', ',');
tokenizer.addToken('semicolon', ';');
tokenizer.addToken('whitespaces', '[\x09\x0A\x0D\x20]+');
tokenizer.tokenize('.for {{name}} 123 this.foo.bar for(var i=0;i<this.length;i++)');
var token;
while (token = tokenizer.getToken()) {
  console.info(token);
}