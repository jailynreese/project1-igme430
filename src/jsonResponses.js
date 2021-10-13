let week = {
  mon: [[],[],[],[],[],[],[],[],[],[],[],[],[]],
  tue:[[],[],[],[],[],[],[],[],[],[],[],[],[]],
  wed: [[],[],[],[],[],[],[],[],[],[],[],[],[]],
  thur: [[],[],[],[],[],[],[],[],[],[],[],[],[]],
  fri: [[],[],[],[],[],[],[],[],[],[],[],[],[]],
  sat: [[],[],[],[],[],[],[],[],[],[],[],[],[]],
  sun: [[],[],[],[],[],[],[],[],[],[],[],[],[]]
};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getAvailability = (request, response) => {
  // goes thru times and finds names for desired day and time
  // let freePpl;

  // switch (desiredTime.day) {
  //   case 'mon':
  //     freePpl = week.mon.slots[desiredTime.hour];
  //     break;
  //   case 'tue':
  //     freePpl = week.tue.slots[desiredTime.hour];
  //     break;
  //   case 'wed':
  //     freePpl = week.wed.slots[desiredTime.hour];
  //     break;
  //   case 'thur':
  //     freePpl = week.thur.slots[desiredTime.hour];
  //     break;
  //   case 'fri':
  //     freePpl = week.fri.slots[desiredTime.hour];
  //     break;
  //   case 'sat':
  //     freePpl = week.sat.slots[desiredTime.hour];
  //     break;
  //   case 'sun':
  //     freePpl = week.sun.slots[desiredTime.hour];
  //     break;
  //   default:
  //     break;
  // }

  const responseJSON = {
    week,
  };

  return respondJSON(request, response, 200, responseJSON);
  // console.dir(freePpl);

  // return respondJSONMeta(request, response, 200);
};

// gets time slot and adds person to list
const addAvailability = (request, response, person) => {
  const responseJSON = {};
  const responseCode = 201;
  
  const name = person.name;
  const day = person.day;
  const timeSlot = person.hour - 7;

  // adds person to array
  switch (day) {
    case 'mon':
      week.mon[timeSlot].push(name);
      break;
    case 'tue':
      week.tue[timeSlot].push(name);
      break;
    case 'wed':
      week.wed[timeSlot].push(name);
      break;
    case 'thur':
      week.thur[timeSlot].push(name);
      break;
    case 'fri':
      week.fri[timeSlot].push(name);
      break;
    case 'sat':
      week.sat[timeSlot].push(name);
      break;
    case 'sun':
      week.sun[timeSlot].push(name);
      break;
    default:
      break;
  }

  if (responseCode === 201) {
    responseJSON.message = 'Added Successfully!';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

// gets time slot and removes person to list
const removeAvailability = (request, response, person) => {
  const responseJSON = {};
  const responseCode = 201;

  const name = person.name;
  const day = person.day;
  const timeSlot = person.hour - 7;

  // looks thru day and filters out that person's name out of array
  switch (day) {
    case 'mon':
      week.mon[timeSlot] = filterArray(week.mon[timeSlot], name);
      break;
    case 'tue':
      week.tue[timeSlot] = filterArray(week.mon[timeSlot], name);
      break;
    case 'wed':
      week.wed[timeSlot] = filterArray(week.mon[timeSlot], name);
      break;
    case 'thur':
      week.thur[timeSlot] = filterArray(week.mon[timeSlot], name);
      break;
    case 'fri':
      week.fri[timeSlot] = filterArray(week.mon[timeSlot], name);
      break;
    case 'sat':
      week.sat[timeSlot] = filterArray(week.mon[timeSlot], name);
      break;
    case 'sun':
      week.sun[timeSlot] = filterArray(week.mon[timeSlot], name);
      break;
    default:
      break;
  }

  if (responseCode === 201) {
    responseJSON.message = 'Removed Successfully!';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'Missing valid query parameter set to true',
    id: 'missingParams',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter parameter set equal to true';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, respondJSON);
  }

  return respondJSON(request, response, 400, respondJSON);
};

const unauthorized = (request, response) => {
  const responseJSON = {
    message: 'Missing loggedIn query parameter set to yes',
    id: 'unauthorized',
  };

  respondJSON(request, response, 401, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

const filterArray = (list, name) => {
  let newList = [];
  for(let i = 0; i < list.length; i++){
    if(list[i] !== name){
      newList.push(list[i]);
    }
  }
  return newList;
}

module.exports = {
  success,
  badRequest,
  unauthorized,
  notFound,
  getAvailability,
  addAvailability,
  removeAvailability,
};
