export const fetchProduct = async (id) => {
  if (!id) {
    throw new Error('ID não informado');
  } else {
    const final = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const data = await final.json();
    return data;
  }
};

export const fetchProductsList = async (search) => {
  // seu código aqui
  if (!search) {
    throw new Error('Termo de busca não informado');
  } else {
    const chama = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`);
    const response = await chama;
    const data = await response.json();
    return data.results;
  }
};
