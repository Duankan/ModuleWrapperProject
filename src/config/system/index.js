import { yaml } from '@ktw/ktools';
import { Message } from '@ktw/kcore';

const url = './config/k-config.yml';

let config;

(function loadConfig(url) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.onload = () => {
    try {
      config = yaml.safeLoad(xhr.responseText);
    } catch (e) {
      Message.error(`${e.name}: ${e.message}`);
    }
  };
  xhr.onerror = () => {
    Message.error(`${xhr.status}: ${xhr.statusText}`);
  };
  xhr.ontimeout = () => {
    Message.error(`${xhr.status}: ${xhr.statusText}`);
  };
  xhr.send();
})(url);

export default config;
