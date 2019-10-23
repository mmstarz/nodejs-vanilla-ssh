const { forecast } = require("./forecast");
const geocode = require("./geocode");

const weatherEngine = address => {
  return new Promise((resolve, reject) => {
    // console.log(address);
    if (!address) reject({ errorMessage: "Provide the address please." });

    // forecast - прогноз
    geocode(address, (err, { loc = null, lat = null, long = null }) => {
      // console.log(address);
      if (err) reject({ errorMessage: err });
      // console.log(`${loc}. Latitude: ${lat}, Longitude: ${long}`);

      forecast(
        lat,
        long,
        (err, { short = null, long = null, timezone = null }) => {
          if (err) reject({ errorMessage: err });

          // console.log(timezone + " timezone.");
          // console.log(long);
          // console.log(short);

          resolve({ timezone, short, long, loc });
        }
      );
    });
  });
};

module.exports = weatherEngine;
