const hrefUrl = `http://site.com:81/filter?size=M&color=1,2&manufacturer=aaa,eee`;
let href = undefined;
const blockedForSerializeObjects = ['sales'];
const getData = (href) => href.search.slice(1)
  .split('&')
  .map((el) => {
    const values = el.split('=');
    return {key: values[0], values: values[1].split(',')};
  });

const getQueryValue = (value, item) => item ? item.concat(`,${value}`) : value;

function serializeForm() {
  const queryArray = {};
  const elements = document.querySelector('form').elements;
  for (let el of elements) {
    if (!blockedForSerializeObjects.some(blockedElement => blockedElement === el.name)) {
      if (el.options) {
        queryArray[el.name] = [...el.children].filter(child => child.selected).reduce((prev, item) => getQueryValue(item.value, prev), undefined);
      } else {
        if (el.checked) {
          queryArray[el.name] = getQueryValue(el.value, queryArray[el.name])
        } else if (el.type !== 'checkbox' && el.type !== 'radio') {
          queryArray[el.name] = getQueryValue(el.value, queryArray[el.name])
        }
      }
    }
  }
  href.search = Object.keys(queryArray).map(key => `${key}=${queryArray[key]}`).join('&');
  console.log(href);
}

function init() {
  href = getLink(hrefUrl);
  const data = getData(href);
  fillData(data);

  document.querySelector('form').onchange = (e) => !blockedForSerializeObjects.some(el => el === e.target.name) ? serializeForm() : null;
}

const fillData = (data) => {
  data.forEach((el) => {
    document.querySelectorAll(`[name='${el.key}']`).forEach(item => {
      if (item.options) {
        el.values.forEach(value => {
          const optionItem = item.querySelector(`[value='${value}']`);
          if (optionItem) {
            optionItem.selected = true;
          }
        });
      } else {
        if (item.value !== '') {
          el.values.forEach(value => item.value === value ? item.checked = true : false);
        } else {
          item.value = el.values.join(',');
        }
      }
    });
  });
};

const getLink = (href) => {
  const url = document.createElement('a');
  url.href = href;
  return url;
};

init();
