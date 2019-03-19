'use strict';

const cobol = require('cobol');
const stream = require('stream');
const util = require('util');
const path = require('path');

class ReceiverStream {
  write (data) {
    console.log(data.toString().trim());
  }
  end () {}
}
util.inherits(ReceiverStream, stream.Stream);

const receiverStream = new ReceiverStream();

const abc001bCBL = path.resolve(__dirname, 'abc_001_b.cbl');

cobol(abc001bCBL, {
  args: [200],
  compileargs: { free: true },
  remove: false
}, initErr => {
  if (initErr) throw new Error(initErr);

  cobol(abc001bCBL, {
    args: [75000],
    stdout: receiverStream,
    compileargs: { free: true },
    remove: false,
    precompiled: true
  }, err => { if (err) console.log(err); });
});
