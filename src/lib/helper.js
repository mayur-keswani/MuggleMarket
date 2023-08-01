function Deg2Rad(deg) {
  return (deg * Math.PI) / 180;
}

function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
  lat1 = Deg2Rad(lat1);
  lat2 = Deg2Rad(lat2);
  lon1 = Deg2Rad(lon1);
  lon2 = Deg2Rad(lon2);
  var R = 3958.756; // miles
  var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  var y = lat2 - lat1;
  var d = Math.sqrt(x * x + y * y) * R;
  return d;
}

/**
 * @function isNearLocation
 * @description to check lattitude and longitude are nearest to 200 milles
 * @param sourceLat
 * @param sourceLon
 * @param destLat
 * @param destLon
 * @returns TRUE OR FALSE
 */

export const isNearLocation = (sourceLat, sourceLon, destLat, destLon) => {
  if (sourceLat && sourceLon && destLat && destLon) {
    var dif = PythagorasEquirectangular(sourceLat, sourceLon, destLat, destLon);
    return dif < 200;
  } else return false;
};
