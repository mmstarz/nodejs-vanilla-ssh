const request = require("request");
const { mapboxPublicKey } = require("../../config/credentials");

const geocode = (address, cb) => {
  const mapboxBaseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places";
  const url = `${mapboxBaseUrl}/${encodeURIComponent(address)}.json?access_token=${mapboxPublicKey}`;

  request(
    {
      url,
      json: true
    },
    (error, { body: { features } }) => {
      if (error)
        return cb("Unable to connect to geo location service APi.", {});

      if (!features || !features[0]) // !features.length
        return cb(
          "Unable to find this place. Please try with another credentials.",
          {}
        );

      return cb(undefined, {
        loc: features[0].place_name,
        lat: features[0].center[1],
        long: features[0].center[0]
      });
    }
  );
};

module.exports = geocode;
