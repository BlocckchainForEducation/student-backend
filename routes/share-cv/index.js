const express = require("express");
const router = express.Router();
const { authen } = require("../acc/protect-middleware");
const connection = require("../../db");
const axios = require("axios").default;
const { decryptCert, decryptSubjects } = require("../utils");
const { decrypt } = require("eciesjs");

router.get("/account-profiles", authen, async (req, res) => {
  try {
    const accColl = (await connection).db().collection("SawtoothAccounts");
    const accs = await accColl.find({ uid: req.user.uid }).toArray();
    try {
      const profilePromises = accs.map(async (acc) => {
        // const response = await axios.get("/" + acc.publicKeyHex);
        const response = await getMockupResponse(acc.publicKeyHex);
        return { account: acc, ...response.data };
      });
      const profiles = await Promise.all(profilePromises);
      return res.json(profiles);
    } catch (error) {
      console.error(error);
      if (error.response) return res.status(502).send(error.response.data);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.toString());
  }
});

router.post("/decrypt-account-profile", async (req, res) => {
  try {
    const privateKeyHex = req.body.privateKeyHex;
    const encryptedAccountProfile = req.body.encryptedAccountProfile;
    const jobs = decryptJobs(privateKeyHex, encryptedAccountProfile.jobs);
    const eduPrograms = decryptedEduprograms(privateKeyHex, encryptedAccountProfile.eduPrograms);
    return { account: encryptedAccountProfile.account, jobs, eduPrograms };
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

function decryptJobs(privateKeyHex, jobs) {
  return jobs.map((job) => {
    const cipherHex = job.start.cipher;
    const cipherBuff = Buffer.from(cipherHex, "hex");
    const plainBuff = decrypt(privateKeyHex, cipherBuff);
    const plainJsonString = plainBuff.toString();
    const plainObject = JSON.parse(plainJsonString);
    const cloneJob = { ...job };
    cloneJob.start.plain = plainObject;
    return cloneJob;
  });
}
function decryptedEduprograms(privateKeyHex, eduPrograms) {
  return eduPrograms.map((eduProgram) => {
    let certificate;
    if (eduProgram.certificate?.versions) {
      certificate = decryptCert(privateKeyHex, eduProgram.certificate);
    }
    const subjects = decryptSubjects(privateKeyHex, eduProgram.subjects);
    return { ...eduProgram, certificate, subjects };
  });
}

async function getMockupResponse(publicKeyHex) {
  return {
    data: {
      jobs: [
        {
          companyPublicKeyHex: "192ef42eddc0b374bef9d3e6aabc6bf8eb4902af13a7b92606e52ab3acb",
          jobId: "1",
          start: {
            timestamp: 1607750930,
            cipher: "mfmsamfkasflksdjaf",
            hash: "asdfasdfasd",
            txid: "9f7cdd294d1ca9421f3b4b985d4fbedd39359c4daa01c6f3d3c5b6f648cf017b14206ed62980cebec8cc641c8800f4b751988f32a6313f121b5f",
          },
          end: {
            timestamp: 1607759999,
            txid:
              "dd294d1ca9421f3b4b985d4fbedd39359c4daa01c6f3d3c5b6f648cf017b14206ed62980cebec8cc641c8800f4b7519883dfc743230b4f32a6313f12",
          },
        },
      ],
      eduPrograms: [
        {
          eduProgram: {
            eduProgramId: "KTMT-1125",
            name: "Kỹ thuật máy tính - K64",
            totalCredit: 2,
            minYear: 0,
            maxYear: 10,
          },
          certificate: {
            address: "02b6bd1192ef42eddc0b374bef9d3e6aabc6bf8eb4902af13a7b92606e52ab3acbcedd",
            versions: [
              {
                cipher: "mfmsamfkasflksdjaf",
                hash: "asdfasdfasd",
                type: "revoke",
                timestamp: 1607750930,
                txid:
                  "9f7cdd294d1ca9421f3b4b985d4fbedd39359c4daa01c6f3d3c5b6f648cf017b14206ed62980cebec8cc641c8800f4b7519883dfc743230b4f32a6313f121b5f",
              },
              {
                cipher: "mfmsamfkasflksdjaf",
                hash: "asdfasdfasd",
                type: "create",
                timestamp: 1607750930,
                txid:
                  "9f7cdd294d1ca9421f3b4b985d4fbedd39359c4daa01c6f3d3c5b6f648cf017b14206ed62980cebec8cc641c8800f4b7519883dfc743230b4f32a6313f121b5f",
              },
            ],
          },
          subjects: [
            {
              address: "02b6bd1192ef42eddc0b37433275a8aa48ea918bd53a9181aa975f15ab0d0645398f59",
              versions: [
                {
                  txid:
                    "9f7cdd294d1ca9421f3b4b985d4fbedd39359c4daa01c6f3d3c5b6f648cf017b14206ed62980cebec8cc641c8800f4b7519883dfc743230b4f32a6313f121b5f",
                  timestamp: 1607750930,
                  cipher: "something fsalkfa;lfjawlkerfasf",
                  hash: "asdfasdfasd",
                },
                {
                  txid:
                    "5d9e7b10daf2aa1da4a4e4a07d3b2a859c9190b0dbae46efbcc8c04e486b756e2f65177c601cd3b3475a9e16ba09258c0a86ec5a0a857ac4fb97a96915d850dc",
                  timestamp: 1607751297,
                  cipher: "private_data update",
                  hash: "asdfasdfasd",
                },
              ],
            },
            {
              address: "02b6bd1192ef42eddc0b37433275a8aa48ea918bd53a9181aa975f15ab0d0645398f59",
              versions: [
                {
                  txid:
                    "9f7cdd294d1ca9421f3b4b985d4fbedd39359c4daa01c6f3d3c5b6f648cf017b14206ed62980cebec8cc641c8800f4b7519883dfc743230b4f32a6313f121b5f",
                  timestamp: 1607750930,
                  cipher: "something fsalkfa;lfjawlkerfasf",
                  hash: "asdfasdfasd",
                },
                {
                  txid:
                    "5d9e7b10daf2aa1da4a4e4a07d3b2a859c9190b0dbae46efbcc8c04e486b756e2f65177c601cd3b3475a9e16ba09258c0a86ec5a0a857ac4fb97a96915d850dc",
                  timestamp: 1607751297,
                  cipher: "private_data update",
                  hash: "asdfasdfasd",
                },
              ],
            },
          ],
        },
      ],
    },
  };
}

module.exports = router;
