const request = require("request");
const { darkskySecretKey, units, language } = require("../../config/credentials");

exports.forecast = (lat, long, cb) => {
  const darkskyBaseUrl = "https://api.darksky.net/forecast";
  const url = `${darkskyBaseUrl}/${darkskySecretKey}/${lat},${long}?units=${units}&lang=${language}`;

  request(
    {
      url,
      json: true
    },
    (error, { body }) => {
      if (error)
        return cb("Unable to connect to weather service APi.", {});
      if (body.error)
        return cb(`Unable to find location: ${body.error}`, {});

      const {
        timezone,
        currently: { temperature, precipProbability },
        daily: { data }
      } = body;

      // console.log(data);

      const result = {
        long: `It is: ${temperature} degrees out. And there is a ${precipProbability}% chance of rain.`,
        short: `${data[0].summary}.`,
        timezone: `Timezone: ${timezone}`,
        tempH: `Temperature high today is: ${data[0].temperatureHigh} celsius deg.`,
        tempL: `And low is: ${data[0].temperatureLow} celsius deg.`
      };

      return cb(undefined, result);
    }
  );
};
