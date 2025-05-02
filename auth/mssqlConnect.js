require("dotenv").config();
const sql = require("mssql");

const config = {
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASS,
  server: process.env.MSSQL_SERVER,
  database: process.env.MSSQL_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const getPatientByUHID = async (uhid) => {
  try {
    await sql.connect(config);
    const result = await sql.query`
      SELECT TOP 1 
        cPat_Name AS name, 
        dDob, 
        cSex AS gender 
      FROM Mast_Patient 
      WHERE iReg_No = ${uhid}
    `;

    const data = result.recordset[0];

    if (!data) return null;

    // ✅ Calculate age from dDob
    if (data.dDob) {
      const dob = new Date(data.dDob);
      const today = new Date();
      let calculatedAge = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        calculatedAge--;
      }
      data.age = calculatedAge;
    } else {
      data.age = null; // or 0 or 'Unknown'
    }

    delete data.dDob; // Optional: remove DOB from final response

    return data;
  } catch (err) {
    console.error("MSSQL Error:", err.message);
    return null;
  }
};

module.exports = { getPatientByUHID };
