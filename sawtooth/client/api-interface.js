const { version } = require("joi");

// api1: fetchDataOfAccountOnBlockchain: (input: publicKeyHex, output: obj - schema1)
const schema1 = {
  publicKeyHex: "luaCBTxqFuIiwicmVnaXNubyI6IjEyNDMxIiwi", // m chen publicKeyHex cho t luon nha,
  certificate: {
    address: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
    versions: [
      {
        txid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
        timestamp: 1234234,
        active: true,
        cipher: "ImhlYWRtYXN0ZXIiOiJIb8OgbmcgTWluaCBTxqFuIiwicmVnaXNubyI6IjEyNDMxIiwiZ2xvYmFscmVnaXNubyI6IjEyMzQxMj....",
      },
    ],
  },
  subjects: [
    {
      address: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
      versions: [
        {
          txid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
          timestamp: 123434,
          active: true,
          cipher: "ImhlYWRtYXN0ZXIiOiJIb8OgbmcgTWluaCBTxqFuIiwicmVnaXNubyI6IjEyNDMxIiwiZ2xvYmFscmVnaXNubyI6IjEyMzQxMj....",
        },
      ],
    },
  ],
};

// api2: getTxInfo: (input: txid + address, ouput: schema2)
const schema2 = {
  ok: true, // true: blockchain has that tx, false: blockchain does not have that tx
  cipher: "ImhlYWRtYXN0ZXIiOiJIb8OgbmcgTWluaCBTxqFuIiwicmVnaXNubyI6IjEyNDMxIiwiZ2xvYmFs",
  timestamp: "12341234234",
};
