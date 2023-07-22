function KMP(texto: string, patron: string): number[] {
  let inicial = new Date().getTime();
  const lps = calcularLPS(patron);
  const apariciones: number[] = [];

  let i = 0;
  let j = 0;
  while (i < texto.length) {
    if (texto[i] === patron[j]) {
      i++;
      j++;
    }

    if (j === patron.length) {
      apariciones.push(i - j);
      j = lps[j - 1];
    } else if (i < texto.length && texto[i] !== patron[j]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }
  let final = new Date().getTime();
  let tiempotranscurrido = final - inicial;
  return apariciones;
}

function calcularLPS(patron: string): number[] {
  const lps: number[] = [];
  let len = 0;
  let i = 1;

  lps[0] = 0;
  while (i < patron.length) {
    if (patron[i] === patron[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return lps;
}