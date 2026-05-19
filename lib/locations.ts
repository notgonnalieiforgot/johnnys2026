export type Location = {
  id: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  /** Custom Google Maps URL. If omitted we build a search URL from `address`. */
  directionsUrl?: string;
};

// 8 active locations. Wesley Chapel closed and is intentionally excluded.
export const LOCATIONS: Location[] = [
  {
    id: "downtown-st-pete",
    name: "Downtown St. Pete",
    area: "St. Petersburg",
    address: "650 Central Ave, St. Petersburg, FL 33701",
    phone: "(727) 555-0182",
    hours: "10am – 12am Daily",
    lat: 27.7708896,
    lng: -82.6425845,
    directionsUrl:
      "https://www.google.com/maps/place/Johnny's+Kratom+Kava+THC+Vapes/@27.7708896,-82.6425845,17z/data=!4m15!1m8!3m7!1s0x88c2e183fb54a905:0xb018081befd83005!2s650+Central+Ave,+St.+Petersburg,+FL+33701!3b1!8m2!3d27.7708896!4d-82.6425845!16s%2Fg%2F11bw442k8k!3m5!1s0x88c2e19d9f9035b1:0xfd656437591fae00!8m2!3d27.770907!4d-82.642617!16s%2Fg%2F11b6cb199j?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    id: "4th-st-st-pete",
    name: "4th Street",
    area: "St. Petersburg",
    address: "2901 4th St N, St. Petersburg, FL 33704",
    phone: "(727) 555-0214",
    hours: "9am – 1am Daily",
    lat: 27.7965,
    lng: -82.6357,
  },
  {
    id: "34th-st-st-pete",
    name: "34th Street",
    area: "St. Petersburg",
    address: "4150 34th St N, St. Petersburg, FL 33714",
    phone: "(727) 555-0307",
    hours: "9am – 12am Daily",
    lat: 27.819,
    lng: -82.6797,
  },
  {
    id: "pinellas-park",
    name: "Pinellas Park",
    area: "Pinellas County",
    address: "6850 49th St N, Pinellas Park, FL 33781",
    phone: "(727) 555-0119",
    hours: "10am – 11pm Daily",
    lat: 27.8428,
    lng: -82.6843,
  },
  {
    id: "gulfport",
    name: "Gulfport",
    area: "Gulfport",
    address: "2908 Beach Blvd S, Gulfport, FL 33707",
    phone: "(727) 555-0455",
    hours: "10am – 11pm Daily",
    lat: 27.7434,
    lng: -82.7044,
  },
  {
    id: "largo",
    name: "Largo",
    area: "Pinellas County",
    address: "1290 W Bay Dr, Largo, FL 33770",
    phone: "(727) 555-0388",
    hours: "10am – 11pm Daily",
    lat: 27.9095,
    lng: -82.7873,
  },
  {
    id: "clearwater",
    name: "Clearwater",
    area: "Clearwater",
    address: "1820 Gulf to Bay Blvd, Clearwater, FL 33755",
    phone: "(727) 555-0271",
    hours: "10am – 12am Daily",
    lat: 27.9637,
    lng: -82.7654,
  },
  {
    id: "brandon",
    name: "Brandon",
    area: "Hillsborough County",
    address: "510 W Brandon Blvd, Brandon, FL 33511",
    phone: "(813) 555-0193",
    hours: "10am – 12am Daily",
    lat: 27.9378,
    lng: -82.2859,
  },
];
