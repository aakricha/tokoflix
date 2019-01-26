import axios from 'axios';
import { BASE_API_URL } from '../actions/constants';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
export const parseDate = (date) => {
  let d = new Date(date);
  return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
}
export const parsePrice = (rate) => {
  let price = 0;
  if (rate >= 0 && rate <= 3) {
    price = 3500;
  } else if (rate > 3 && rate <= 6) {
    price = 8250;
  } else if (rate > 6 && rate <= 8) {
    price = 16350;
  } else if (rate > 8 && rate <= 10) {
    price = 21250;
  }

  return price;
}
export const parseMoney = (price) => {
  var rupiah = '';
  var pricerev = price.toString().split('').reverse().join('');
  for (var i = 0; i < pricerev.length; i++) if (i % 3 === 0) rupiah += pricerev.substr(i, 3) + '.';
  return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
}
export const parseSlug = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w-]+/g, '')       // Remove all non-word chars
    .replace(/--+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
export const API = async (opt) => {
  try {
    const OPT = {
      baseURL: BASE_API_URL,
      ...opt,
    };
    const res = await axios.request(OPT);
    return Promise.resolve(res);
  } catch ({ response }) {
    throw new Error(response);
  }
};