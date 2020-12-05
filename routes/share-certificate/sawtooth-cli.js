// const ecies = require("ecies-geth");

// TODO: talk to sawtooth api, then reformat to the schema front-end require
async function fetchEncryptDataOfAccount(publicKeyHex) {
  // const mockupCertificateData = {
  //   name: "Nguyễn Văn An",
  //   birthday: "01/01/1998",
  //   gender: "Nam",
  //   university: "Đại học Bách Khoa Hà Nội",
  //   faculty: "Công nghệ thông tin",
  //   degree: "Kỹ sư",
  //   gradyear: "2019",
  //   level: "Giỏi",
  //   eduform: "Chính quy",
  //   issuelocation: "Hà Nội",
  //   issuedate: "20/08/2019",
  //   headmaster: "Hoàng Minh Sơn",
  //   regisno: "12431",
  //   globalregisno: "12341231431",
  // };
  // const mockupSubjectList = new Array(50).map(() => ({
  //   semester: "20161",
  //   codename: "MI1100",
  //   name: "Giải Tích 1",
  //   halfSemesterPoint: "8",
  //   finalSemesterPoint: "9",
  //   rank: "A",
  //   txid: "0x12a243c9879cd78a68a6fa",
  // }));
  // const publicKeyBuffer = Buffer.from(publicKeyHex, "hex");
  // const certificateBuffer = Buffer.from(JSON.stringify(mockupCertificateData));
  // const encryptedCert = (await ecies.encrypt(publicKeyBuffer, certificateBuffer)).toString("hex");

  // const subjectBufferList = mockupSubjectList.map((subject) => Buffer.from(JSON.stringify(subject)));
  // const listEncryptedSubjectBuffer = await Promise.all(subjectBufferList.map((subjectBuffer) => ecies.encrypt(publicKeyBuffer, subjectBuffer)));
  // const listEncryptedSubjectHex = listEncryptedSubjectBuffer.map((encryptedSubjectBuffer) => encryptedSubjectBuffer.toString("hex"));
  const certificate = {
    address: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
    versions: [
      {
        txid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
        timestamp: 18979427394,
        active: true,
        cipher:
          "GciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZXJ0aWZpY2F0ZSI6eyJuYW1lIjoiTmd1eeG7hW4gVsSDbiBBbiIsImJpcnRoZGF5IjoiMDEvMDEvMTk5OCIsImdlbmRlciI6Ik5hbSIsInVuaXZlcnNpdHkiOiLEkOG6oWkgaOG7jWMgQsOhY2ggS2hvYSBIw6AgTuG7mWkiLCJmYWN1bHR5IjoiQ8O0bmcgbmdo4buHIHRow7RuZyB0aW4iLCJkZWdyZWUiOiJL4bu5IHPGsCIsImdyYWR5ZWFyIjoiMjAxOSIsImxldmVsIjoiR2nhu49pIiwiZWR1Zm9ybSI6IkNow61uaCBxdXkiLCJpc3N1ZWxvY2F0aW9uIjoiSMOgIE7hu5lpIiwiaXNzdWVkYXRlIjoiMjAvMDgvMjAxOSIsImhlYWRtYXN0ZXIiOiJIb8OgbmcgTWluaCBTxqFuIiwicmVnaXNubyI6IjEyNDMxIiwiZ2xvYmFscmVnaXNubyI6IjEyMzQxMjMxNDMxIn0sInN1YmplY3RQb2ludExpc3QiOlt7InNlbWVzdGVyIjoiMjAxNjEiLCJjb2RlbmFtZSI6Ik1JMTEwMCIsIm5hbWUiOiJHaeG6o2kgVMOtY2ggMSIsImhhbGZTZW1lc3RlclBvaW50IjoiOCIsImZpbmFsU2VtZXN0ZXJQb2ludCI6IjkiLCJyYW5rIjoiQSIsInR4aWQiOiIweDEyYTI0M2M5ODc5Y2Q3OGE2OGE2ZmEifSx7InNlbWVzdGVyIjoiMjAxNjEiLCJjb2RlbmFtZSI6Ik1JMTEwMCIsIm5hbWUiOiJHaeG6o2kgVMOtY2ggMSIsImhhbGZTZW1lc3RlclBvaW50IjoiOCIsImZpbmFsU2VtZXN0ZXJQb2ludCI6IjkiLCJyYW5rIjoiQSIsInR4aWQiOiIweDEyYTI0M2M5ODc5Y2Q3OGE2OGE2ZmEifSx7InNlbWVzdGVyIjoiMjAxNjEiLCJjb2RlbmFtZSI6Ik1JMTEwMCIsIm5hbWUiOiJHaeG6o2kgVMOtY2ggMSIsImhhbGZTZW1lc3RlclBvaW50IjoiOCIsImZpbmFsU2VtZXN0ZXJQb2ludCI6IjkiLCJyYW5rIjoiQSIsInR4aWQiOiIweDEyYTI0M2M5ODc5Y2Q3OGE2OGE2ZmEifSx7InNlbWVzdGVyIjoiMjAxNjEiLCJjb2RlbmFtZSI6Ik1JMTEwMCIsIm5hbWUiOiJHaeG6o2kgVMOtY2ggMSIsImhhbGZTZW1lc3RlclBvaW50IjoiOCIsImZpbmFsU2VtZXN0ZXJQb2ludCI6IjkiLCJyYW5rIjoiQSIsInR4aWQiOiIweDEyYTI0M2M5ODc5Y2Q3OGE2OGE2ZmEifV0sImlhdCI6MTYwNzA1NTQyOX0.GRngDCCE4di-u6TWB3d5SeLljznCj9EVpHe9J6uYZkg",
      },
      {
        txid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0189",
        timestamp: 18979427395,
        active: false,
        cipher:
          "GciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZXJ0aWZpY2F0ZSI6eyJuYW1lIjoiTmd1eeG7hW4gVsSDbiBBbiIsImJpcnRoZGF5IjoiMDEvMDEvMTk5OCIsImdlbmRlciI6Ik5hbSIsInVuaXZlcnNpdHkiOiLEkOG6oWkgaOG7jWMgQsOhY2ggS2hvYSBIw6AgTuG7mWkiLCJmYWN1bHR5IjoiQ8O0bmcgbmdo4buHIHRow7RuZyB0aW4iLCJkZWdyZWUiOiJL4bu5IHPGsCIsImdyYWR5ZWFyIjoiMjAxOSIsImxldmVsIjoiR2nhu49pIiwiZWR1Zm9ybSI6IkNow61uaCBxdXkiLCJpc3N1ZWxvY2F0aW9uIjoiSMOgIE7hu5lpIiwiaXNzdWVkYXRlIjoiMjAvMDgvMjAxOSIsImhlYWRtYXN0ZXIiOiJIb8OgbmcgTWluaCBTxqFuIiwicmVnaXNubyI6IjEyNDMxIiwiZ2xvYmFscmVnaXNubyI6IjEyMzQxMjMxNDMxIn0sInN1YmplY3RQb2ludExpc3QiOlt7InNlbWVzdGVyIjoiMjAxNjEiLCJjb2RlbmFtZSI6Ik1JMTEwMCIsIm5hbWUiOiJHaeG6o2kgVMOtY2ggMSIsImhhbGZTZW1lc3RlclBvaW50IjoiOCIsImZpbmFsU2VtZXN0ZXJQb2ludCI6IjkiLCJyYW5rIjoiQSIsInR4aWQiOiIweDEyYTI0M2M5ODc5Y2Q3OGE2OGE2ZmEifSx7InNlbWVzdGVyIjoiMjAxNjEiLCJjb2RlbmFtZSI6Ik1JMTEwMCIsIm5hbWUiOiJHaeG6o2kgVMOtY2ggMSIsImhhbGZTZW1lc3RlclBvaW50IjoiOCIsImZpbmFsU2VtZXN0ZXJQb2ludCI6IjkiLCJyYW5rIjoiQSIsInR4aWQiOiIweDEyYTI0M2M5ODc5Y2Q3OGE2OGE2ZmEifSx7InNlbWVzdGVyIjoiMjAxNjEiLCJjb2RlbmFtZSI6Ik1JMTEwMCIsIm5hbWUiOiJHaeG6o2kgVMOtY2ggMSIsImhhbGZTZW1lc3RlclBvaW50IjoiOCIsImZpbmFsU2VtZXN0ZXJQb2ludCI6IjkiLCJyYW5rIjoiQSIsInR4aWQiOiIweDEyYTI0M2M5ODc5Y2Q3OGE2OGE2ZmEifSx7InNlbWVzdGVyIjoiMjAxNjEiLCJjb2RlbmFtZSI6Ik1JMTEwMCIsIm5hbWUiOiJHaeG6o2kgVMOtY2ggMSIsImhhbGZTZW1lc3RlclBvaW50IjoiOCIsImZpbmFsU2VtZXN0ZXJQb2ludCI6IjkiLCJyYW5rIjoiQSIsInR4aWQiOiIweDEyYTI0M2M5ODc5Y2Q3OGE2OGE2ZmEifV0sImlhdCI6MTYwNzA1NTQyOX0.GRngDCCE4di-u6TWB3d5SeLljznCj9EVpHe9J6uYZkg",
      },
    ],
  };

  // make sure sort the versions
  certificate.versions.sort((a, b) => b.timestamp - a.timestamp);

  const text =
    "Sed at eleifend mi. Cras fermentum dolor ac quam tincidunt suscipit. Mauris venenatis, turpis at placerat tristique, quam nibh egestas sem, a finibus tortor arcu vel lectus. Phasellus ullamcorper, ex vitae porta pellentesque, est massa pulvinar sem, sit amet molestie urna libero et massa. Quisque sollicitudin auctor nibh, non tincidunt ex ultrices quis. Morbi vestibulum vestibulum sapien. Nullam id egestas velit. Aenean et nibh vehicula, dapibus nisl nec, accumsan est. In imperdiet quam vitae velit accumsan rhoncus. Cras sagittis magna ligula, vitae malesuada enim aliquet vel.In in nisl eu ante efficitur pharetra. Quisque ultricies dolor et odio egestas, sit amet ultrices eros posuere. Donec a pulvinar mauris, a pellentesque ligula. Integer malesuada ornare velit. Donec in fringilla lorem. Aliquam blandit velit vitae sem fringilla rhoncus. Sed vulputate lorem et iaculis mattis. Aenean id fermentum tellus. Proin dignissim vehicula est vitae mollis. Proin fermentum, felis ac gravida placerat, justo mauris vehicula lorem, et fermentum lectus urna quis orci. Aliquam lacinia massa sit amet quam ultricies suscipit.Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce ligula mauris, fringilla eget placerat nec, iaculis ac massa. Duis pellentesque et elit non accumsan. Proin maximus nibh sed lacinia dictum. Nulla volutpat nunc ac leo iaculis, a pharetra ante malesuada. Vivamus placerat nisi rhoncus erat tempor hendrerit. Vivamus auctor fermentum felis vitae vestibulum. Nam sit amet odio eu arcu fermentum dapibus vel sed massa. Nulla condimentum justo magna, at tristique enim ultrices eget. Nullam non tellus augue. Morbi eget felis sapien.Maecenas dapibus ultricies massa eget ullamcorper. Duis mi nibh, iaculis at volutpat ac, ullamcorper sed quam. Duis vestibulum elit quis eros volutpat volutpat. Duis tincidunt pretium ligula eu convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium, nisl ac luctus fermentum, urna risus luctus eros, eget mattis risus lectus eget est. Phasellus a condimentum risus, nec finibus diam. Cras condimentum nunc non metus ullamcorper pretium. Suspendisse justo neque, egestas in lacus ut, hendrerit aliquam leo. Phasellus feugiat ultricies turpis a tincidunt. Mauris quis aliquam libero. Nam pellentesque sed mauris vitae dictum. Nunc nibh tellus, bibendum id molestie at, dignissim vel dolor.";

  const subjects = text.split(".").map((sentence, index) => ({
    address: "55aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a" + index,
    versions: [
      {
        txid: "0xb27677b99155aeb1813e924c89b456f52ba36d2f443a0188" + index,
        timestamp: 127928686234,
        active: true,
        cipher: sentence,
      },
    ],
  }));

  return Promise.resolve({ publicKeyHex, certificate, subjects });
}

module.exports = { fetchEncryptDataOfAccount };

// fetchDataOfAccountOnBlockchain: (input: publicKeyHex, output: obj - schema1)
// const schema1 = {
//   publicKeyHex: "luaCBTxqFuIiwicmVnaXNubyI6IjEyNDMxIiwi",
//   certificate: {
//     cipher: "ImhlYWRtYXN0ZXIiOiJIb8OgbmcgTWluaCBTxqFuIiwicmVnaXNubyI6IjEyNDMxIiwiZ2xvYmFscmVnaXNubyI6IjEyMzQxMj....",
//     blockid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//     txid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//     address: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//   },
//   subjects: [
//     {
//       cipher: "ImhlYWRtYXN0ZXIiOiJIb8OgbmcgTWluaCBTxqFuIiwicmVnaXNubyI6IjEyNDMxIiwiZ2xvYmFscmVnaXNubyI6IjEyMzQxMj....",
//       blockid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//       txid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//       address: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//     },
//     {
//       cipher: "ImhlYWRtYXN0ZXIiOiJIb8OgbmcgTWluaCBTxqFuIiwicmVnaXNubyI6IjEyNDMxIiwiZ2xvYmFscmVnaXNubyI6IjEyMzQxMj....",
//       blockid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//       txid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//       address: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//     },
//   ],
// };

// decryptData (input: obj - schema1 +, output: obj - schema2)
// const schema2 = {
//   publicKeyHex: "luaCBTxqFuIiwicmVnaXNubyI6IjEyNDMxIiwi",
//   certificate: {
//     plain: {
//       name: "Nguyễn Văn An",
//       birthday: "01/01/1998",
//       gender: "Nam",
//       university: "Đại học Bách Khoa Hà Nội",
//       faculty: "Công nghệ thông tin",
//       degree: "Kỹ sư",
//       gradyear: "2019",
//       level: "Giỏi",
//       eduform: "Chính quy",
//       issuelocation: "Hà Nội",
//       issuedate: "20/08/2019",
//       headmaster: "Hoàng Minh Sơn",
//       regisno: "12431",
//       globalregisno: "12341231431",
//     },
//     blockid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//     txid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//     address: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//   },
//   subjects: [
//     {
//       plain: {
//         semester: "20161",
//         codename: "MI1100",
//         name: "Giải Tích 1",
//         halfSemesterPoint: "8",
//         finalSemesterPoint: "9",
//         rank: "A",
//         txid: "0x12a243c9879cd78a68a6fa",
//       },
//       blockid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//       txid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//       address: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//     },
//     {
//       plain: {
//         semester: "20161",
//         codename: "MI1100",
//         name: "Giải Tích 1",
//         halfSemesterPoint: "8",
//         finalSemesterPoint: "9",
//         rank: "A",
//         txid: "0x12a243c9879cd78a68a6fa",
//       },
//       blockid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//       txid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//       address: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//     },
//   ],
// };

// getToken: (input: obj - schema2, output: token - jwt.sign(input, secret))

// getCipherDataOfTx: (input: txid - string, output: cipher, timestampe - string)

// write point of subject to blockchain
// Frontend: privateKey, classId, excelFile
// Backend: forward to sawtooth-cli api
// Sawtooth Cli api: parse excel -> for each record -> encrypt with student's public key -> make payload: {classId: classId, subjectPoint: [cipher1, cipher2,... ]} -> sign with teacher private key -> send to processor handler -> check if teacher has priviledge to write on that classId -> if ok, caculate address for that classId, setState(address, subjectPoint)
//
