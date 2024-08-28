const ORDER_VALUES = ['asc', 'desc', 'ASC', 'DESC'];

function orderByConstructor(orders, model) {
    // pega a coluna e a ordem enviada, respectivamente.
    const orderValues = orders.split('|');
    // pega as propriedades do model enviado. Ex de user: name, id, email, password...
    const modelProperties = Object.keys(model);

    // verifica se a ordem enviada (2 posição do array) faz parte do ORDER_VALUES, que são as ordens permitidas
    const isValidOrder = ORDER_VALUES.includes(orderValues[1]);
    // verifica se a propriedade enviada (1° posição do array) faz parte das propriedades do model
    const areValidPropries = modelProperties.includes(orderValues[0]);

    // se a ordem não for valida e a propriedade também não, retorna undefined;
    if (!isValidOrder || !areValidPropries) {
        return;
    }

    // caso seja valida, retorna um array com coluna(propriedade) e ordem. Ex: ['name', 'desc'].
    return orderValues;
}

export default orderByConstructor;