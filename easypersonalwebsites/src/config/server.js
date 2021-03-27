// This is going to contain all of the functions that would typically be located on the backend server side of the app
// They will all be exported as named functions

// This will search for a given domain name. If the name is available, it will return its price. If it is not
// available, it will return -1;
const searchDomain = async (url) => {
  if (!url.includes(".")) {
    return -1;
  }
  const result = await fetch(
    "https://www.secureserver.net/api/v1/search/exact?plid=1592&q=" + url
  );
  const json = await result.json();
  const isAvailable =
    json.Products[0].ProductId !== 0 && url === json.ClientRequestIn.DomainName;

  if (isAvailable) {
    return json.Products[0].PriceInfo.CurrentPrice;
  } else {
    return -1;
  }
};

export { searchDomain };
