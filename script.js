import http from 'k6/http';
import { sleep, check } from 'k6';

export default function () {
  // Переход на главную страницу
  let res = http.get('https://www.lrs.lt/');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 2s': (r) => r.timings.duration < 2000, // Проверка времени отклика
  });

  // Переход на страницу https://www.lrs.lt/sip/portal.show?p_r=35401&p_k=1
  res = http.get('https://www.lrs.lt/sip/portal.show?p_r=35401&p_k=1');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 2s': (r) => r.timings.duration < 2000,
  });

  // Переход на страницу https://www.lrs.lt/sip/portal.show?p_r=35525&p_k=1
  res = http.get('https://www.lrs.lt/sip/portal.show?p_r=35525&p_k=1');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 2s': (r) => r.timings.duration < 2000,
  });

  // Проверка времени обработки транзакции
  sleep(1); // Сделайте паузу 1 секунду, чтобы имитировать время обработки транзакции
  check(res, {
    'transaction time < 3s': (r) => r.timings.duration < 3000,
  });
};

export let options = {
  vus: 10000, // Количество виртуальных пользователей (VUs)
  duration: '100s', // Продолжительность теста
};